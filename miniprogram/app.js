
App({

  onLaunch: function () {


    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }


    var that = this
    this.globalData.db = wx.cloud.database()

<<<<<<< HEAD
=======
    this.globalData.db = wx.cloud.database()


>>>>>>> bdacacc22625c62f0b210e6a7b921b0f7935f876
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        that.globalData.windowWidth = res.windowWidth
        that.globalData.windowHeight = res.windowHeight
      }
    })

  },

  globalData: {
    userInfo: null,
    openid: null,
    windowWidth: 200,
    windowHeight: 300,
    db: null,
    province:'',
    nickName:'',
    avatarUrl:'',
  }
})
