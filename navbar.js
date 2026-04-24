document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const isInPostsDir = currentPath.includes('/posts/');
    const imgPath = isInPostsDir ? '../' : '';
    const linkPath = isInPostsDir ? '../' : '';

    const navbarHtml = `
    <nav>
        <div class="nav-container">
            <a href="${linkPath}index.html" class="mobile-logo">mhc</a>
            <div class="mobile-nav-button">
                <span></span>
                <span></span>
            </div>
            <ul class="navbar">
                <li class="nav-brand"><a href="${linkPath}index.html" class="nav-logo">mehmet hamit &ccedil;ukur</a></li>
                <li class="nav-center">
                    <ul>
                        <li><a href="${linkPath}about.html">about</a></li>
                        <li><a href="${linkPath}notes.html">notes</a></li>
                        <li><a href="${linkPath}work.html">work</a></li>
                        <li><a href="${linkPath}toru.html">t&ouml;r&uuml;</a></li>
                        <li><a href="${linkPath}contact.html">contact</a></li>
                    </ul>
                </li>
                <li class="social-nav">
                    <a href="https://www.instagram.com/hamitcukur/" target="_blank" rel="noreferrer"><img src="${imgPath}instagram.png" alt="Instagram"></a>
                    <a href="https://www.youtube.com/@hamitcukur" target="_blank" rel="noreferrer"><img src="${imgPath}youtube.png" alt="YouTube"></a>
                    <a href="https://x.com/HamitCukur" target="_blank" rel="noreferrer"><img src="${imgPath}x_logo.png" alt="X (Twitter)"></a>
                    <a href="https://www.linkedin.com/in/mehmet-hamit-cukur/" target="_blank" rel="noreferrer"><img src="${imgPath}linkedin.png" alt="LinkedIn"></a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="mobile-nav-overlay">
        <nav class="mobile-nav">
            <ul>
                <li><a href="${linkPath}index.html">home</a></li>
                <li><a href="${linkPath}about.html">about</a></li>
                <li><a href="${linkPath}notes.html">notes</a></li>
                <li><a href="${linkPath}work.html">work</a></li>
                <li><a href="${linkPath}toru.html">t&ouml;r&uuml;</a></li>
                <li><a href="${linkPath}contact.html">contact</a></li>
            </ul>
            <div class="mobile-social-links">
                <a href="https://www.instagram.com/hamitcukur/" target="_blank" rel="noreferrer"><img src="${imgPath}instagram.png" alt="Instagram"></a>
                <a href="https://www.youtube.com/@hamitcukur" target="_blank" rel="noreferrer"><img src="${imgPath}youtube.png" alt="YouTube"></a>
                <a href="https://x.com/HamitCukur" target="_blank" rel="noreferrer"><img src="${imgPath}x_logo.png" alt="X (Twitter)"></a>
                <a href="https://www.linkedin.com/in/mehmet-hamit-cukur/" target="_blank" rel="noreferrer"><img src="${imgPath}linkedin.png" alt="LinkedIn"></a>
            </div>
        </nav>
    </div>`;

    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = navbarHtml;
    }
});
