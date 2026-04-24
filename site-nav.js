document.addEventListener('DOMContentLoaded', function() {
    const navbarHtml = `
    <nav>
        <div class="nav-container">
            <a href="/" class="mobile-logo">HC</a>
            <div class="mobile-nav-button">
                <span></span>
                <span></span>
            </div>
            <ul class="navbar">
                <li class="nav-brand"><a href="/" class="nav-logo">mehmet hamit &ccedil;ukur</a></li>
                <li class="nav-center">
                    <ul>
                        <li><a href="/about">about</a></li>
                        <li><a href="/notes">notes</a></li>
                        <li><a href="/work">work</a></li>
                        <li><a href="/toru">t&ouml;r&uuml;</a></li>
                        <li><a href="/contact">contact</a></li>
                    </ul>
                </li>
                <li class="social-nav">
                    <a href="https://www.instagram.com/hamitcukur/" target="_blank" rel="noreferrer"><img src="/instagram.png" alt="Instagram"></a>
                    <a href="https://www.youtube.com/@hamitcukur" target="_blank" rel="noreferrer"><img src="/youtube.png" alt="YouTube"></a>
                    <a href="https://x.com/HamitCukur" target="_blank" rel="noreferrer"><img src="/x_logo.png" alt="X (Twitter)"></a>
                    <a href="https://www.linkedin.com/in/mehmet-hamit-cukur/" target="_blank" rel="noreferrer"><img src="/linkedin.png" alt="LinkedIn"></a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="mobile-nav-overlay">
        <nav class="mobile-nav">
            <ul>
                <li><a href="/">home</a></li>
                <li><a href="/about">about</a></li>
                <li><a href="/notes">notes</a></li>
                <li><a href="/work">work</a></li>
                <li><a href="/toru">t&ouml;r&uuml;</a></li>
                <li><a href="/contact">contact</a></li>
            </ul>
            <div class="mobile-social-links">
                <a href="https://www.instagram.com/hamitcukur/" target="_blank" rel="noreferrer"><img src="/instagram.png" alt="Instagram"></a>
                <a href="https://www.youtube.com/@hamitcukur" target="_blank" rel="noreferrer"><img src="/youtube.png" alt="YouTube"></a>
                <a href="https://x.com/HamitCukur" target="_blank" rel="noreferrer"><img src="/x_logo.png" alt="X (Twitter)"></a>
                <a href="https://www.linkedin.com/in/mehmet-hamit-cukur/" target="_blank" rel="noreferrer"><img src="/linkedin.png" alt="LinkedIn"></a>
            </div>
        </nav>
    </div>`;

    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = navbarHtml;
    }
});
