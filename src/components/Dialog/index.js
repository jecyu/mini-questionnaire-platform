/**
 * modal
 * @param modalId {string} modal元素id
 */
function modal(modalId) {
  this.id = modalId;
  this.element = document.querySelector("#" + modalId);
}

modal.prototype = {
  constructor: modal,
  /**
   * 显示Modal
   * @param modal {object} modal元素
   */
  show: function(modal) {
    if (modal.style.display === "none") {
      console.log("display");
    }
    modal.style.display = "block";
  },
  /**
   * 隐藏Modal
   * @param modal {object} modal元素
   */
  hide: function(modal) {
    if (modal.style.display === "block") {
    }
    modal.style.display = "none";
  }
};
