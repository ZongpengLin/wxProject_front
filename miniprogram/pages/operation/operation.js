// pages/operation/operation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemId: undefined,
    itemName: '',
    priority: '',
    addUrl: "http://127.0.0.1:8083/demo/superadmin/additem",
    modifyUrl: "http://127.0.0.1:8083/demo/superadmin/modifyitem"
  },

  /**
   * 生命周期函数--监听页面加载  重新加载
   */
  onLoad: function (options) {
    var that = this;
      // 页面初始化 options为页面跳转所带来的参数
      this.setData({
        itemId: options.itemId
      });
      // if (options.itemId == undefined) {
      //   return;
      // }
      wx.request({
        url: "http://127.0.0.1:8083/demo/superadmin/getitembyid",
        data: { "itemName": options.itemName },
        method: 'GET',
        success: function (res) {
          var item = res.data.item;
          if (item != undefined) {
            var toastText = '获取数据失败' + res.data.errMsg;
            wx.showToast({
              title: toastText,
              icon: '',
              duration: 5000
            });
          } else {
            that.setData({
              itemName: item.itemName,
              priority: item.priority
            });
          }
        }
      })
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    var url = that.data.addUrl;
    if (that.data.itemId != undefined) {
      formData.itemId = that.data.itemId;
      url = that.data.modifyUrl;
    }
    wx.request({
      url: url,
      data: JSON.stringify(formData),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var result = res.data.success
        var toastText = "操作成功！";
        if (!result) {
          toastText = "操作失败" + res.data.errMsg;
        }
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 5000
        });
        if (that.data.areaId == undefined) {
          wx.redirectTo({
            url: '../list/list',
          })
        }
      }
    })
  }
})