// pages/guessres/guessres.js
function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue;
    }
}
var png = {
    0: "https://s1.ax1x.com/2022/10/12/xUu30f.png",
    1: "https://s1.ax1x.com/2022/10/12/xUu878.png",
    2: "https://s1.ax1x.com/2022/10/12/xUu1nP.png",
    3: "https://s1.ax1x.com/2022/10/12/xUnqO0.png",
    4: "https://s1.ax1x.com/2022/10/12/xUnbyq.png",
    5: "https://s1.ax1x.com/2022/10/12/xUnOmV.png",
    6: "https://s1.ax1x.com/2022/10/12/xUnHln.png",
    'rand': "https://s2.loli.net/2022/10/12/LUAIjqx32TedFrC.gif"
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        diceNum: "https://s2.loli.net/2022/10/12/LUAIjqx32TedFrC.gif",
        t1: "https://s1.ax1x.com/2022/10/12/xUu30f.png",
        t2: "https://s1.ax1x.com/2022/10/12/xUu30f.png",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        sleep(1500);
        this.setData({ diceNum: png[options.dice] });
        this.setData({ t1: "https://s1.ax1x.com/2022/10/12/xUMlo8.png" });
        this.setData({ t2: "https://s1.ax1x.com/2022/10/12/xUnxkF.png" });
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

    jmp: function () {
        wx.redirectTo({
            url: '/pages/game_2/BFPL/BFPL',
        })
    }

})