const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    //手柄滚动条拇指拖动
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        console.log("startX:", startX);
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;//相当于最大的可滚动距离

        //鼠标移动时更新拇指位置
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            //确保滚动条拇指保持在界限内
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

       //鼠标上移时删除事件侦听器
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        //添加用于拖动交互的事件侦听器
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });
    //根据单击幻灯片按钮滑动图像
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });//这里获取的 imageList.scrollLeft会被其影响
            
        });
    });

    //根据滚动位置显示或隐藏滑动按钮
    const handleSlideButtons = () => {
        // 检查滚动值是否接近最大滚动距离,定义一个误差范围
        const shouldHideButton = Math.abs(maxScrollLeft - imageList.scrollLeft) >= 0 && Math.abs(maxScrollLeft - imageList.scrollLeft) <= 2;
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        // 根据条件设置按钮显示或隐藏
        slideButtons[1].style.display = shouldHideButton ? "none" : "flex";
        //console.log("scrollLeft:", imageList.scrollLeft, shouldHideButton);
    }

    //基于图像滚动更新滚动条拇指位置
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        //console.log("更新滚动条拇指位置", thumbPosition);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    //当图像列表滚动时调用这两个函数
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);