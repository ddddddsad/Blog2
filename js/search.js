document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.querySelector('.search form');
    const searchInput = document.querySelector('.search input');
    const resultList = document.querySelector('.article-list ul');

    const articles = [
        { title: "Astronomy Basics", url: "articles/astronomy-basics.html" },
        { title: "Physics for Beginners", url: "articles/physics-for-beginners.html" },
        { title: "Advanced Quantum Mechanics", url: "articles/quantum-mechanics.html" },
        { title: "The Study of Stars", url: "articles/study-of-stars.html" },
        { title: "Space and Time", url: "articles/space-and-time.html" }
        // 更多文章数据
    ];

    // 搜索处理函数
    function handleSearch(event) {
        event.preventDefault(); // 防止表单提交

        const query = searchInput.value.toLowerCase().trim(); // 获取搜索关键词

        if (!query) {
            return; // 如果没有输入内容，则不进行任何操作
        }

        // 过滤匹配的文章
        const results = articles.filter(article => article.title.toLowerCase().includes(query));

        // 清空搜索结果列表
        resultList.innerHTML = '';

        // 如果有搜索结果
        if (results.length > 0) {
            results.forEach(article => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = article.url;
                link.textContent = article.title;
                listItem.appendChild(link);
                resultList.appendChild(listItem);
            });
        } else {
            resultList.innerHTML = '<li>No results found</li>';
        }
    }

    // 监听表单提交
    searchForm.addEventListener('submit', handleSearch);
});
