/**
 * 包裹setTimeout的工具函式
 * @param {Number} delayMs delay的毫秒數
 * @returns {Promise} API回傳結果
 */
function delay(delayMs: number) {
  return new Promise((resolve) => { 
    setTimeout(resolve, delayMs);
  });
}

export default delay;