// pages/mode_3/mode_3.js
const app = getApp()
var str = [
    "一、初始盘面",
    "二、轮流掷骰",
    "三、消除规则",
    "四、结算规则",
];
var a;
var p = [
    "/pages/static/gz1.png",
    "/pages/static/gz2.png",
    "/pages/static/gz3.png",
    "/pages/static/gz4.png",
];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text1: str[a],
        tp: p[a],
        text2: "下一页",
        text3: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        a = 0;
        this.setData({ text1: str[a] });
        this.setData({ tp: p[a] });
        this.setData({ text2: "下一页" });
        this.setData({ text3: "" });
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
        wx.redirectTo({
            url: '/pages/index/index',
        })
    },

    jmp1: function () {
        app.addClickAudio()
        if (a != 0) {
            a = a - 1;
            this.setData({ text1: str[a] });
            this.setData({ tp: p[a] });
            if (a == 0) {
                this.setData({ text3: "" });
            }
            this.setData({ text2: "下一页" });
        }
    },

    jmp2: function () {
        app.addClickAudio()
        if (a != 3) {
            a = a + 1;
            this.setData({ text1: str[a] });
            this.setData({ tp: p[a] });
            this.setData({ text3: "上一页" });
            if (a == 3) {
                this.setData({ text2: "返回主页" });
            }
        } else {
            wx.navigateTo({
                url: '/pages/index/index',
            })
        }
    }
})