const UPLOADS_PLAYLIST_ID = 'UUwm3WZNeVTgspx4jwnRZcVg';
const FALLBACK_VIDEO = {
  videoId: 'FVKVXI9AgGQ',
  title: 'KENDI IMPARATORLUGUNU KUR',
  url: 'https://www.youtube.com/watch?v=FVKVXI9AgGQ',
  isShort: false,
};

function readTag(source, tagName) {
  const match = source.match(new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`));
  return match ? decodeXml(match[1].trim()) : '';
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function parseUploadsFeed(xml) {
  const entries = [];
  const entryPattern = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryPattern.exec(xml))) {
    const entry = match[1];
    const videoId = readTag(entry, 'yt:videoId');
    const title = readTag(entry, 'title');
    const published = readTag(entry, 'published');
    const linkMatch = entry.match(/<link[^>]+rel="alternate"[^>]+href="([^"]+)"/);
    const url = linkMatch ? decodeXml(linkMatch[1]) : `https://www.youtube.com/watch?v=${videoId}`;

    if (videoId) {
      entries.push({
        videoId,
        title,
        published,
        url,
        isShort: url.includes('/shorts/'),
      });
    }
  }

  return entries;
}

function embedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
}

async function isEmbeddable(videoId) {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`, {
      cf: {
        cacheEverything: true,
        cacheTtl: 600,
      },
    });

    return response.ok;
  } catch (error) {
    return false;
  }
}

async function selectLatestEmbeddable(entries) {
  const recentEntries = entries.slice(0, 8);

  for (const entry of recentEntries) {
    if (await isEmbeddable(entry.videoId)) {
      return entry;
    }
  }

  return entries.find((entry) => !entry.isShort) || entries[0];
}

function jsonResponse(payload, status = 200) {
  return Response.json(payload, {
    status,
    headers: {
      'Cache-Control': 'public, max-age=600, s-maxage=600',
    },
  });
}

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const includeShorts = url.searchParams.get('includeShorts') === '1' || url.searchParams.get('regularOnly') === '0';
  const skipEmbedCheck = url.searchParams.get('skipEmbedCheck') === '1';
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${UPLOADS_PLAYLIST_ID}`;

  try {
    const response = await fetch(feedUrl, {
      cf: {
        cacheEverything: true,
        cacheTtl: 600,
      },
    });

    if (!response.ok) {
      throw new Error(`YouTube feed returned ${response.status}`);
    }

    const xml = await response.text();
    const entries = parseUploadsFeed(xml);
    const candidates = includeShorts
      ? entries
      : entries.filter((entry) => !entry.isShort);
    const selected = skipEmbedCheck
      ? candidates[0]
      : await selectLatestEmbeddable(candidates);

    if (!selected) {
      throw new Error('YouTube feed did not include any videos');
    }

    return jsonResponse({
      ...selected,
      embedUrl: embedUrl(selected.videoId),
      source: skipEmbedCheck
        ? 'latest-upload'
        : (includeShorts ? 'latest-embeddable-upload' : 'latest-embeddable-video'),
    });
  } catch (error) {
    return jsonResponse({
      ...FALLBACK_VIDEO,
      embedUrl: embedUrl(FALLBACK_VIDEO.videoId),
      source: 'fallback',
    });
  }
}
