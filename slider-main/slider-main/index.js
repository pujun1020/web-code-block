
// 获取元素
const slider = document.querySelector('.pujun-slider');
const items = slider.querySelectorAll('.pujun-list .myitem');
const nextBtn = slider.querySelector('#mynext');
const prevBtn = slider.querySelector('#myprev');
const thumbs = document.querySelectorAll('.mythumbnail .myitem');

const thumbsbox = document.querySelector('.mythumbnail');
// 定义 debounce 函数
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
const thisscollwidth = thumbsbox.scrollWidth;
const thisclientwidth2 = thumbsbox.clientWidth;
const thumbscount = thumbs.length;


//绑定可水平滚动事件wheel
thumbsbox.addEventListener('wheel', function (event) {
  event.preventDefault();
  event.stopPropagation();
  const delta = event.deltaY;
  thumbsbox.scrollLeft += delta;
});

// 设置参数
const itemCount = items.length;
let activeIndex = 0;
let intervalId = null;
// 显示当前轮播项
function showSlider() {
  // 移除旧的active类
  const oldActiveItem = slider.querySelector('.myitem.active');
  const oldActiveThumb = document.querySelector('.mythumbnail .myitem.active');
  oldActiveItem.classList.remove('active');
  oldActiveThumb.classList.remove('active');

  // 添加新的active类
  items[activeIndex].classList.add('active');
  thumbs[activeIndex].classList.add('active');
}

// 切换到下一个轮播项
function nextSlide() {
  activeIndex = (activeIndex + 1) % itemCount; // 循环切换// 确保循环到第一个元素
  /* activeIndex++;
  if (activeIndex >= itemCount) {
    activeIndex = 0;
  } */
  console.log("stop", (activeIndex + 1) % itemCount)
  showSlider();
}

// 切换到上一个轮播项
function prevSlide() {
  activeIndex = (activeIndex - 1 + itemCount) % itemCount; // 循环切换,// 确保循环回到最后一个元素
  console.log((activeIndex - 1 + itemCount) % itemCount)
  /* activeIndex--;
  if (activeIndex < 0) {
    activeIndex = itemCount - 1;
  } */
  showSlider();
}

// 点击下一张按钮
nextBtn.addEventListener('click', nextSlide);

// 点击上一张按钮
prevBtn.addEventListener('click', prevSlide);

// 自动轮播
function startAutoSlide() {
  intervalId = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
  clearInterval(intervalId);
}

// 鼠标悬停时停止自动轮播，离开时重新开始
thumbs.forEach(thumb => {
  thumb.addEventListener('mouseenter', stopAutoSlide);
  thumb.addEventListener('mouseleave', startAutoSlide);
}
)
prevBtn.addEventListener('mouseenter', stopAutoSlide);
prevBtn.addEventListener('mouseleave', startAutoSlide);

nextBtn.addEventListener('mouseenter', stopAutoSlide);
nextBtn.addEventListener('mouseleave', startAutoSlide);
// 点击缩略图切换轮播项
thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    activeIndex = index;
    showSlider();
  });
});

// 初始化
showSlider();
startAutoSlide();//自动轮播
