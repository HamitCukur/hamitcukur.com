async function loadPosts() {
  try {
    const response = await fetch('/posts.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const postContainers = document.querySelectorAll('.posts');

    if (!postContainers.length) {
      return;
    }

    const canonicalPosts = Array.from(
      data.posts.reduce((postMap, post) => {
        const baseId = post.id.replace(/v2$/, '');
        const existingPost = postMap.get(baseId);

        if (!existingPost || /v2$/.test(post.id)) {
          postMap.set(baseId, post);
        }

        return postMap;
      }, new Map()).values()
    );

    canonicalPosts.sort((a, b) => {
      const dateA = new Date(a.date.split('-').reverse().join('-'));
      const dateB = new Date(b.date.split('-').reverse().join('-'));
      return dateB - dateA;
    });

    postContainers.forEach(container => {
      const limit = Number(container.dataset.postLimit || canonicalPosts.length);
      const postsToRender = canonicalPosts.slice(0, limit);

      if (!postsToRender.length) {
        container.innerHTML = '<li class="no-posts">No posts yet.</li>';
        return;
      }

      container.innerHTML = postsToRender.map(post => `
        <li>
          <a href="/posts/${post.id}">${post.title}</a>
          <span class="date">${post.date}</span>
        </li>
      `).join('');
    });
  } catch (error) {
    const postContainers = document.querySelectorAll('.posts');
    postContainers.forEach(container => {
      container.innerHTML = '<li class="no-posts">Error loading posts. Please try again later.</li>';
    });
    console.error('Error loading posts:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadPosts);
