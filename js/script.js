// UI 对象包含初始化所有功能模块的方法
const UI = {
    // 初始化粘性头部，调用 debounceScroll 以提高滚动性能
    initStickyHeader() {
        window.onscroll = () => UI.debounceScroll(UI.stickyHeader); // 修改为 UI.debounceScroll
    },

    // 处理粘性头部的逻辑，当页面滚动到一定位置时，添加 'sticky' 类
    stickyHeader() {
        const header = document.querySelector("header");
        const sticky = header.offsetTop;
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky"); // 滚动超过头部时，添加类使其粘性
        } else {
            header.classList.remove("sticky"); // 否则移除粘性类
        }
    },

    // 初始化下拉菜单的显示/隐藏逻辑
    initDropdown() {
        const dropdownContent = document.querySelector('.dropdown-content');
        document.querySelector('.dropbtn').onclick = (event) => {
            event.preventDefault(); // 阻止默认跳转
            dropdownContent.classList.toggle('show'); // 切换显示下拉内容
        };
        window.onclick = (event) => {
            // 如果点击了下拉菜单以外的区域，隐藏下拉内容
            if (!event.target.matches('.dropbtn') && dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        };
    },

    // 减少 scroll 事件的频繁触发，防止性能问题
    debounceScroll(func, delay = 100) {
        let debounceTimer;
        return () => {
            clearTimeout(debounceTimer); // 清除前一个计时器
            debounceTimer = setTimeout(func, delay); // 延迟执行
        };
    },

    // 初始化导航到 Astronomy 文章页面的逻辑
    initAstronomyNavigation() {
        const astronomyLink = document.querySelector('.load-astronomy');
        if (astronomyLink) {
            astronomyLink.onclick = (event) => {
                event.preventDefault(); // 阻止默认跳转行为
                window.location.href = './Articles/Astronomy/_AstronomyMenu.html'; // 跳转到天文学文章目录
            };
        }
    },

    // 初始化导航到 Physics 文章页面的逻辑
    initPhysicsNavigation() {
        const physicsLink = document.querySelector('.load-physics');
        if (physicsLink) {
            physicsLink.onclick = (event) => {
                event.preventDefault(); // 阻止默认跳转行为
                window.location.href = './Articles/Physics/_PhysicsMenu.html'; // 跳转到物理文章目录
            };
        }
    },

    // 初始化导航到 Essays 文章页面的逻辑
    initEssayNavigation() {
        const essayLink = document.querySelector('.load-essays');
        if (essayLink) {
            essayLink.onclick = (event) => {
                event.preventDefault(); // 阻止默认跳转行为
                window.location.href = './Articles/Essays/EssaysMenu.html'; // 跳转到随笔文章目录
            };
        }
    }
};

// 等待 DOM 完全加载后再初始化功能模块
document.addEventListener('DOMContentLoaded', () => {
    UI.initStickyHeader(); // 初始化粘性头部功能
    UI.initDropdown(); // 初始化下拉菜单功能
    UI.initAstronomyNavigation(); // 初始化天文学导航
    UI.initPhysicsNavigation(); // 初始化物理导航
    UI.initEssayNavigation(); // 初始化随笔导航
});
