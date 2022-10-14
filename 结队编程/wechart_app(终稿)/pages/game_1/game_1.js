const app = getApp()
class GameBackEnd {
    constructor(matrix1, matrix2, flag) {
        this.matrix1 = [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]];
        this.matrix2 = [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]];
        this.flag = 0;
    }

    matrix1_is_full() {
        let flag1 = 1;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.matrix1[i][j] == 0) {
                    flag1 = 0;
                }
            }
        }
        return flag1;
    }

    matrix2_is_full() {
        let flag1 = 1;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.matrix2[i][j] == 0) {
                    flag1 = 0;
                }
            }
        }
        return flag1;
    }

    count_matrix1_points() {
        let sum = 0;
        for (let i = 0; i < 3; i++) {
            let l = [0, 0, 0, 0, 0, 0, 0];
            for (let j = 0; j < 3; j++) {
                l[this.matrix1[i][j]]++;
            }
            for (let k = 1; k < 7; k++) {
                sum += l[k] * k * l[k];
            }
        }
        return sum;
    }

    count_matrix2_points() {
        let sum = 0;
        for (let i = 0; i < 3; i++) {
            let l = [0, 0, 0, 0, 0, 0, 0];
            for (let j = 0; j < 3; j++) {
                l[this.matrix2[i][j]]++;
            }
            for (let k = 1; k < 7; k++) {
                sum += l[k] * k * l[k];
            }
        }
        return sum;
    }

    run(player_num, dice_num, add_chess_x, add_chess_y) {
        this.flag = 0;
        if (player_num == 1) {
            if (this.matrix1[add_chess_x][add_chess_y] == 0) {
                this.matrix1[add_chess_x][add_chess_y] = dice_num;
                for (let i = 0; i < 3; i++) {
                    if (this.matrix2[add_chess_x][i] == dice_num) {
                        this.matrix2[add_chess_x][i] = 0;
                    }
                }
                if (this.matrix1_is_full()) {
                    if (this.count_matrix1_points() > this.count_matrix2_points()) {
                        this.flag = 1;
                    } else if (this.count_matrix1_points() == this.count_matrix2_points()) {
                        this.flag = 3;
                    } else {
                        this.flag = 2;
                    }
                }
            }
        } else if (player_num == 2) {
            if (this.matrix2[add_chess_x][add_chess_y] == 0) {
                this.matrix2[add_chess_x][add_chess_y] = dice_num;
                for (let i = 0; i < 3; i++) {
                    if (this.matrix1[add_chess_x][i] == dice_num) {
                        this.matrix1[add_chess_x][i] = 0;
                    }
                }
                if (this.matrix2_is_full()) {
                    if (this.count_matrix1_points() > this.count_matrix2_points()) {
                        this.flag = 1;
                    } else if (this.count_matrix1_points() == this.count_matrix2_points()) {
                        this.flag = 3;
                    } else {
                        this.flag = 2;
                    }
                }
            }
        }
        // flag == 0  继续比赛
        // flag == 1  player1获胜
        // flag == 2  player2获胜
        // flag == 3  平局
        return;
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

var GBE = new GameBackEnd();
var dice = 0;
var playerTurnNum = 1;
var gameflag = 0;
var pm1 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
var pm2 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

function setPmatrix() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            pm1[i][j] = png[GBE.matrix1[i][j]];
            pm2[i][j] = png[GBE.matrix2[i][j]];
        }
    }
}

function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue;
    }
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        pmatrix1: [
            [png[0], png[0], png[0]],
            [png[0], png[0], png[0]],
            [png[0], png[0], png[0]],
        ],
        pmatrix2: [
            [png[0], png[0], png[0]],
            [png[0], png[0], png[0]],
            [png[0], png[0], png[0]],
        ],
        point1: 0,
        point2: 0,
        matrix1: GBE.matrix1,
        matrix2: GBE.matrix2,
        diceNum: png[0],
        bg1: "background1",
        bg2: "background1",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.startGame();
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
    clickPosition: function (a) {
        if (gameflag) {
            let x = a.currentTarget.dataset.column - 1;
            let y = a.currentTarget.dataset.row - 1;
            let num = a.currentTarget.dataset.num;
            let avai = 0;
            if (num == 1) {
                if (GBE.matrix1[x][y] == 0) {
                    avai = 1;
                }
            } else {
                if (GBE.matrix2[x][y] == 0) {
                    avai = 1;
                }
            }
            if (avai) {
                if (GBE.flag == 0 && playerTurnNum == num) {
                    if (playerTurnNum == 2) {
                        let obj1 = {
                            matrix1: GBE.matrix1,
                        }
                        let obj2 = JSON.parse(JSON.stringify(obj1));
                        let m1 = obj2.matrix1;
                        GBE.run(num, dice, x, y);
                        this.setData({ matrix1: GBE.matrix1 });
                        this.setData({ matrix2: GBE.matrix2 });
                        setPmatrix();
                        this.setData({ pmatrix2: pm2 });
                        let f = 0;
                        for (let i = 0; i < 3; i++) {
                            if (m1[x][i] != GBE.matrix1[x][i]) {

                                pm1[x][i] = "https://s2.loli.net/2022/10/12/mKyhTY8Npq3ZnFs.gif";
                                this.setData({ pmatrix1: pm1 });
                                f = 1;
                            }
                        }
                        if (f == 1) {
                            app.addDisappearAudio()
                            sleep(1000);
                        }
                        setPmatrix();
                        this.setData({ pmatrix1: pm1 });
                        this.setData({ point1: GBE.count_matrix1_points() });
                        this.setData({ point2: GBE.count_matrix2_points() });
                    } else {
                        let obj1 = {
                            matrix2: GBE.matrix2,
                        }
                        let obj2 = JSON.parse(JSON.stringify(obj1));
                        let m2 = obj2.matrix2;
                        GBE.run(num, dice, x, y);
                        this.setData({ matrix1: GBE.matrix1 });
                        this.setData({ matrix2: GBE.matrix2 });
                        setPmatrix();
                        this.setData({ pmatrix1: pm1 });
                        let f = 0;
                        for (let i = 0; i < 3; i++) {
                            if (m2[x][i] != GBE.matrix2[x][i]) {

                                pm2[x][i] = "https://s2.loli.net/2022/10/12/mKyhTY8Npq3ZnFs.gif";
                                this.setData({ pmatrix2: pm2 });
                                f = 1;
                            }
                        }
                        if (f == 1) {
                            app.addDisappearAudio()
                            sleep(1000);
                        }
                        setPmatrix();
                        this.setData({ pmatrix2: pm2 });
                        this.setData({ point1: GBE.count_matrix1_points() });
                        this.setData({ point2: GBE.count_matrix2_points() });
                    }


                    if (playerTurnNum == 1) {
                        playerTurnNum = 2;
                    } else {
                        playerTurnNum = 1;
                    }

                    if (playerTurnNum == 1) {
                        this.setData({ bg1: "background2" });
                        this.setData({ bg2: "background1" });
                    } else {
                        this.setData({ bg1: "background1" });
                        this.setData({ bg2: "background2" });
                    }

                    if (GBE.flag == 1) {
                        console.log("player1 win");
                        console.log(GBE.count_matrix1_points());
                        wx.redirectTo({
                            url: '../game_1/over/over?bot=' + GBE.count_matrix1_points() + '&person=' + GBE.count_matrix2_points() + '&p=' + 1,
                        })
                        gameflag = 0;
                    } else if (GBE.flag == 2) {
                        console.log("player2 win");
                        console.log(GBE.count_matrix2_points());
                        wx.redirectTo({
                            url: '../game_1/over/over?bot=' + GBE.count_matrix1_points() + '&person=' + GBE.count_matrix2_points() + '&p=' + 2,
                        })
                        gameflag = 0;
                    } else if (GBE.flag == 0) {
                        dice = Math.floor(Math.random() * 6 + 1);
                        this.setData({ diceNum: png['rand'] });
                        sleep(500);
                        this.setData({ diceNum: png[dice] });
                    }
                }
            }
        }
    },



    robots_play() {
        let max = -999999;
        let x = 0;
        let y = 0;
        let Game1 = new GameBackEnd();
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                let obj1 = {
                    matrix1: GBE.matrix1,
                    matrix2: GBE.matrix2,
                }
                let obj2 = JSON.parse(JSON.stringify(obj1));
                Game1.matrix1 = obj2.matrix1;
                Game1.matrix2 = obj2.matrix2;
                if (Game1.matrix1[i][j] == 0) {
                    Game1.run(1, dice, i, j);
                }
                if (Game1.count_matrix1_points() - Game1.count_matrix2_points() > max) {
                    max = Game1.count_matrix1_points() - Game1.count_matrix2_points();
                    x = i;
                    y = j;
                }
            }
        }
        let obj1 = {
            matrix2: GBE.matrix2,
        }
        let obj2 = JSON.parse(JSON.stringify(obj1));
        let m2 = obj2.matrix2;
        GBE.run(1, dice, x, y);
        sleep(1000);
        this.setData({ matrix1: GBE.matrix1 });
        this.setData({ matrix2: GBE.matrix2 });
        setPmatrix();
        this.setData({ pmatrix1: pm1 });
        let f = 0;
        for (let i = 0; i < 3; i++) {
            if (m2[x][i] != GBE.matrix2[x][i]) {
                pm2[x][i] = "/pages/static/xc.gif";
                this.setData({ pmatrix2: pm2 });
                f = 1;
            }
        }
        if (f == 1) {
            sleep(1000);
        }
        setPmatrix();
        this.setData({ pmatrix2: pm2 });
        this.setData({ point1: GBE.count_matrix1_points() });
        this.setData({ point2: GBE.count_matrix2_points() });

        if (playerTurnNum == 1) {
            playerTurnNum = 2;
        } else {
            playerTurnNum = 1;
        }
        if (playerTurnNum == 1) {
            this.setData({ bg1: "background2" });
            this.setData({ bg2: "background1" });
        } else {
            this.setData({ bg1: "background1" });
            this.setData({ bg2: "background2" });
        }
        if (GBE.flag == 1) {
            console.log("player1 win");
            console.log(GBE.count_matrix1_points());
            wx.redirectTo({
                url: '../lose/lose?bot=' + GBE.count_matrix1_points() + '&person=' + GBE.count_matrix2_points(),
            })
            gameflag = 0;
        } else if (GBE.flag == 2) {
            console.log("player2 win");
            console.log(GBE.count_matrix2_points());
            wx.redirectTo({
                url: '../win/win?bot=' + GBE.count_matrix1_points() + '&person=' + GBE.count_matrix2_points(),
            })
            gameflag = 0;
        }
        dice = Math.floor(Math.random() * 6 + 1);
        this.setData({ diceNum: png['rand'] });
        sleep(500);
        this.setData({ diceNum: png[dice] });
        sleep(1000);
    },

    startGame: function () {
        gameflag = 1;
        playerTurnNum = 2;
        dice = Math.floor(Math.random() * 6 + 1);
        GBE = new GameBackEnd();
        this.setData({ diceNum: png['rand'] });
        sleep(500);
        this.setData({ diceNum: png[dice] });
        sleep(500);
        this.setData({ matrix1: GBE.matrix1 });
        this.setData({ matrix2: GBE.matrix2 });
        setPmatrix();
        this.setData({ pmatrix1: pm1 });
        this.setData({ pmatrix2: pm2 });
        this.setData({ point1: GBE.count_matrix1_points() });
        this.setData({ point2: GBE.count_matrix2_points() });
        if (playerTurnNum == 1) {
            this.setData({ bg1: "background2" });
            this.setData({ bg2: "background1" });
        } else {
            this.setData({ bg1: "background1" });
            this.setData({ bg2: "background2" });
        }
    },
})