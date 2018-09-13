var Bmob = require('dist/Bmob-1.6.0.min.js');
Bmob.initialize("87ae61ecb9cab8424997d11f3646497c", "4ad8c1c20fb212e84e8c4f5d0031b055");

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


    // let current = Bmob.User.current()

    // this.globalData.userInfo = current

    // if (that.globalData.userInfo) {
    //   console.log('有用户且已登录', that.globalData.userInfo)
    // } else {
    //   console.log('无用户，或用户已退出登录')
    // }  

    this.globalData.db = wx.cloud.database()


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
    windowWidth: 200,
    windowHeight: 300,
    db: null
  }
})
