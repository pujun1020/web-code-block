/* 修改后的代码中，我们现在在 `owl.on("wheel", ...)` 正在使用的事件处理函数中阻止默认行为和事件冒泡，
然后调用 `debouncedAction` 函数，并传入 `e.originalEvent.wheelDelta` 作为参数。这样我们就可以立即停止默认行为，
同时在 `debouncedAction` 函数中控制轮播的切换。
这种方法确保在用户滚动鼠标滚轮时，页面不会跟随滚动，同时仍然通过防抖来控制 Owl Carousel 的切换动作。 */
$(document).ready(function () {
    let owl = $(".frontpage .owl-carousel");
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
    // 将要执行的操作定义在一个函数中
    let debouncedAction = debounce(function (direction) {
        if (direction > 0) {
            owl.trigger("prev.owl", [1000]);
        } else {
            owl.trigger("next.owl", [1000]);
        }
    }, 200);
    // 监听 wheel 事件
    owl.on("wheel", function (e) {
        // 阻止默认的页面滚动行为
        e.preventDefault();
        e.stopPropagation();
        // 通过 debounce 函数来控制事件的触发频率
        debouncedAction(e.originalEvent.wheelDelta);
    });
});


/* 
ts版本的
function debounce(func: (...args: any[]) => void, wait: number, immediate?: boolean) {
  let timeout: number | undefined;
  const context = ref<any>(null);
  return function (this: any, ...args: any[]) {
    context.value = this;
    const later = function () {
      timeout = undefined;
      if (!immediate) func.apply(context.value, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait) as any;
    if (callNow) func.apply(context.value, args);
  };
}; 



。。:

import { ref } from 'vue';

function debounce(func: (...args: any[]) => void, wait: number, immediate: boolean) {
  let timeout: number | undefined;
  const context = ref<any>(null);

  return function (this: any, ...args: any[]) {
    context.value = this;
    const later = function () {
      timeout = undefined;
      if (!immediate) func.apply(context.value, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait) as any;
    if (callNow) func.apply(context.value, args);
  };
};

节流函数

function throttle(func: (...args: any[]) => void, wait: number) {
  let timeout: number | undefined;
  let previous = 0;

  return function (this: any, ...args: any[]) {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = undefined;
        func.apply(this, args);
      }, remaining);
    }
  };
};


*/
/* 滚轮滚动引发页面滚动的代码

**代码示例中使用 `debounce()` 函数导致 `e.preventDefault()` 和 `e.stopPropagation()`
 在事件最早的阶段没有被立即调用，因为执行这些操作的 `bfunc` 被防抖处理了。为了解决这个问题，
我们需要立即在事件处理函数中阻止默认行为，并且还要在 Debounce 函数中进行我们想要的 `owl.trigger()` 调用。


let owl = $(".frontpage .owl-carousel");
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
        let bfunc=debounce(function (e) {
            if (e.originalEvent.wheelDelta > 0) {
                console.log(887768)
                owl.trigger("prev.owl", [1000]);
            } else {
                console.log(e)
                owl.trigger("next.owl", [1000]);
            }
            e.preventDefault();
            e.stopPropagation();
        },200);
        owl.on("wheel",bfunc);
*/