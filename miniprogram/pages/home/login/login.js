// pages/home/home.js
var Bmob = require('../../../dist/Bmob-1.6.0.min.js');
var md5=require('../../../dist/md5.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: '登录',
    current_scroll: '登录',
    hidden: true
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
    console.log("current发生变换：", this.data.current)
    if (this.data.current == "登录") {
      this.setData({
        hidden: true
      })
    } else {
      this.setData({
        hidden: false
      })
    }
  },

  handleChangeScroll({
    detail
  }) {
    this.setData({
      current_scroll: detail.key
    });
    console.log("current_scroll发生变换：", this.data.current)
  },

  //登录
  formSubmit: function(e) {
    var value = e.detail.value
    if (this.data.current == '登录') {
      console.log('form发生了submit事件，携带数据为：', value)

      try {
        app.globalData.db.collection('qyzx_users').where({
            _id: value["userId"],
            password: md5.hexMD5(value["userPw"])
          })
          .get({
            success: function(res) {

              console.log(res.data[0])
              if (res.data[0] == null) {
                console.log("用户名或密码输入错误")
                wx.showToast({
                  title: '用户名或密码输入错误',
                  icon: 'none',
                  duration: 2000
                })
              } else {
                app.globalData.userInfo = res.data[0]
                wx.navigateTo({
                  url: '/pages/first/first',
                })
              }
            },
          })
      } catch (e) {
        console.error(e)
      }

      // Bmob.User.login(value["userId"], value["userPw"]).then(res => {
      //   console.log(res)
      //   app.globalData.userInfo = res
      //   console.log('跳到index')
      //   wx.navigateTo({
      //     url: '/pages/first/first',
      //   })
      // }).catch(err => {
      //   console.log(err)
      //   wx.showToast({
      //     title: '用户名或密码输入错误',
      //     icon: 'none',
      //     duration: 2000
      //   })
      // })
    } else {
      if (value['userId'] == "" || value['userPw'] == "" || value['userEm'] == "")
      {
        wx.showToast({
          title: '请完整填写信息',
          icon: 'none',
          duration: 2000
        })
        return
      }

      app.globalData.db.collection('qyzx_users').where({
          // gt 方法用于指定一个 "大于" 条件，此处 _.gt(30) 是一个 "大于 30" 的条件
          _id : value['userId']
        })
        .get({
          success: function(res) {
            console.log(res.data)
            if (res.data[0] == null) {

              //写入数据库users
              app.globalData.db.collection('qyzx_users').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                  _id: value["userId"],
                  password: new String(md5.hexMD5( value["userPw"])),
                  email: new String(value["userEm"]),
                  due: new Date(),
                },
                success: function(res) {
                  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                  console.log('注册成功', res)
                  wx.showModal({
                    title: '提示',
                    content: '注册成功，请登录'
                  })
                }
              })

            } else {

              wx.showToast({
                title: '用户名已存在',
                icon: 'none',
                duration: 2000
              })

            }
          }
        })


      // Bmob.User.register(params).then(res => {
      //   console.log('注册成功', res)
      //   wx.showModal({
      //     title: '提示',
      //     content: '注册成功，请登录'
      //   })
      // }).catch(err => {
      //   console.log(err)
      // });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})