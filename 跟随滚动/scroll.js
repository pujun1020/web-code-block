let scrollFun = (element) => {
    element.style.setProperty('--scroll', '0%'); // 初始设置滚动位置为0%
    
    let scrollPercentage = 0; // 初始滚动百分比为0
    let isScrolling = false; // 是否正在滚动的标志

    // 定义滚动事件处理函数
    let scrollHandler = function () {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(function () {
                let scrollTop = window.scrollY || document.documentElement.scrollTop;
                let sectionTop = element.offsetTop;
                let sectionHeight = element.scrollHeight;

                // 计算滚动百分比
                scrollPercentage = ((scrollTop - sectionTop) / sectionHeight) * 100;
                scrollPercentage = Math.max(0, Math.min(100, scrollPercentage)); // 确保在0到100%之间

                // 更新滚动状态
                element.style.setProperty('--scroll', `${scrollPercentage.toFixed(2)}%`);

                // 如果滚动超过95%，将状态设置为100%
                if (scrollPercentage > 95) {
                    element.style.setProperty('--scroll', '100%');
                }

                isScrolling = false;
            });
        }
    };

    // 添加滚动事件监听器
    window.addEventListener('scroll', scrollHandler);

    // 在适当的时候移除滚动事件监听器，避免不必要的资源消耗
    // 如果页面切换或元素不再需要滚动效果时可以手动移除监听器
    // element.removeEventListener('scroll', scrollHandler); // 根据具体情况调用
};


