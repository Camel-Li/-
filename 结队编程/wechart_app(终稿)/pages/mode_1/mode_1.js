// pages/mode_1/mode_1.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
    onBackTap: function () {
        app.addClickAudio()
        wx.navigateTo({
            url: '/pages/index/index',
        })
    },

    clickMe1: function () {
        app.addClickAudio()
        wx.navigateTo({
            url: '/pages/game_1/game_1',
        })
    },

    clickMe2: function () {
        app.addClickAudio()
        wx.navigateTo({
            url: '/pages/game_2/guess/guess',
        })
    },
    clickMe3: function () {
        app.addClickAudio(),
            wx.showToast({
                title: "敬请期待", // 提示的内容
                icon: "none", // 图标，默认success
                image: "", // 自定义图标的本地路径，image 的优先级高于 icon
                duration: 1500, // 提示的延迟时间，默认1500
                mask: false, // 是否显示透明蒙层，防止触摸穿透
                success: function () {

                },
                fail: function () {

                },
                complete: function () {

                }
            })
    }
})
