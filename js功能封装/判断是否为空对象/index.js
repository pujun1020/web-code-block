/**
 * 判断空对象
 * @param {Object} obj 原始对象
 * @returns {Boolean} 返回true/false
 * @example isEmptyObject({}) // true
 */
/* const isEmptyObject = function (obj) {
    return JSON.stringify(obj) === '{}';
}
console.log(isEmptyObject({'name':123})) */



/* function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }
  
  // 示例用法
  const obj1 = {};
  console.log(isEmptyObject(obj1)); // true
  
  const obj2 = { name: 'Alice', age: 30 };
  console.log(isEmptyObject(obj2)); // false */
  


 /*  function isEmptyObject(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
  
  // 示例用法
  const obj1 = {};
  console.log(isEmptyObject(obj1)); // true
  
  const obj2 = { name: 'Alice', age: 30 };
  console.log(isEmptyObject(obj2)); // false */


  function isEmptyObject(obj) {
    return Object.entries(obj).length === 0;
  }
  
  // 示例用法
  //返回一个给定对象自身可枚举属性的键值对数组，数组中每个元素都是一个形如 [key, value] 的数组，其中 key 是属性名，value 是属性值。
  const obj1 = {};
  console.log(isEmptyObject(obj1)); // true
  let arr="[1,2,3]"
  console.log(isEmptyObject(arr))
  const obj2 = { name: 'Alice', age: 30 };
  console.log(isEmptyObject(obj2)); // false
  
  