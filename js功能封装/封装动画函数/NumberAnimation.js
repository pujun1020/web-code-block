function NumberAnimation(start, end, duration, stepCallback) {
    let total = end - start;
    let startTime = Date.now();
    let timer = null;
    function animate() {
        const time = Date.now();
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);//确保在 0 到 1 的范围内。
        const value = total * progress;// 计算当前值，当前值由0-1的进度决定变化。

        stepCallback(Math.floor(value));

        if (elapsed <= duration) {
            timer = requestAnimationFrame(animate);

        } else {
            console.log(typeof timer);
            cancelAnimationFrame(timer);
            console.log('动画结束');

        }
    }

    timer = requestAnimationFrame(animate);
    return {
        cancel() {
            cancelAnimationFrame(timer);
        },
        start() {
            timer = requestAnimationFrame(animate);
        }
    }


}