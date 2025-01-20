document.addEventListener("DOMContentLoaded", function () {
    const toc = document.getElementById('toc');
    const headings = document.querySelectorAll('.article-content h2, .article-content h3');
    const tocLinks = [];
    const toggleArea = document.querySelector('.toggleArea');
    const articleNav = document.querySelector('.article-navigation');

    // 创建导航链接
    if (toc) {
        const fragment = document.createDocumentFragment();  // 使用文档片段
        headings.forEach((heading, index) => {
            const navHeading = document.createElement(heading.tagName.toLowerCase());
            const a = document.createElement('a');
            a.textContent = heading.textContent;
            a.href = `#section-${index}`;
            a.style.textDecoration = "none";
            heading.id = `section-${index}`;
            navHeading.appendChild(a);
            fragment.appendChild(navHeading);
        });
        toc.appendChild(fragment);  // 一次性添加所有导航项

        tocLinks.push(...toc.querySelectorAll('a'));  // 获取所有链接
        tocLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                document.getElementById(targetId).scrollIntoView({
                    behavior: 'smooth'  // 平滑滚动
                });
            });
        });

        // 处理滚动时高亮当前的导航链接
        const sections = headings.length ? Array.from(headings).map((heading, index) => {
            const nextHeading = headings[index + 1];
            const sectionEnd = nextHeading ? nextHeading.offsetTop : document.body.scrollHeight;
            return {
                heading,
                sectionStart: heading.offsetTop,
                sectionEnd: sectionEnd
            };
        }) : [];

        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = requestAnimationFrame(() => {
                const scrollPosition = window.scrollY + 150;
                let currentSectionIndex = -1;
                sections.forEach((section, index) => {
                    if (scrollPosition >= section.sectionStart && scrollPosition < section.sectionEnd) {
                        currentSectionIndex = index;
                    }
                });
                tocLinks.forEach((link, index) => {
                    if (index === currentSectionIndex) {
                        link.style.color = 'blue';
                    } else {
                        link.style.color = '#333';
                    }
                });
            });
        });
    }

    // Toggle功能：折叠和展开导航栏
    toggleArea.addEventListener('click', function () {
        articleNav.classList.toggle('collapsed');
    });
});
