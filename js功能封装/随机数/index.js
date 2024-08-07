function getRandomInt(min, max) {
    min = Math.ceil(min);   // 向上取整，确保最小值是整数
    max = Math.floor(max);  // 向下取整，确保最大值是整数
    return Math.floor(Math.random() * (max - min + 1)) + min; // 生成[min, max]范围内的随机整数
}