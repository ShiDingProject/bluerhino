// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail_title: '为什么每次和Siri聊天，我都一肚子火？',
    detail_text:'测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
    detail_sign:'计算机视觉',
    detail_comment:{
      list:[
        {
          id:'qwer123456',
          photo:'../../img/photo1.jpg',
          name:'七彩大蜗牛',
          content:'这个世界太神奇了，托尼斯塔克 既然没有消失，为什么不去杀了黑寡妇 ！！！',
          agree:3145,
          date:'2018-08-24 12:24',
          user_agree:0,
        },{
          id: 'qwer456789',
          photo: '../../img/photo1.jpg',
          name: '太阳公公烤熟的鸡蛋黄~ biu biu biu~',
          content: '赞同楼上哈哈哈哈',
          agree: 125,
          date: '2018-08-26 15:04',
          user_agree: 1,
        }
      ],
      total:222//评论总数
    },
    detail_comment_listAll: {
      list: [
        {
          id: 'qwer123456',
          photo: '../../img/photo1.jpg',
          name: '七彩大蜗牛',
          content: '这个世界太神奇了，托尼斯塔克 既然没有消失，为什么不去杀了黑寡妇 ！！！',
          agree: 3145,
          date: '2018-08-24 12:24',
          user_agree: 0,
        }, {
          id: 'qwer456789',
          photo: '../../img/photo1.jpg',
          name: '太阳公公烤熟的鸡蛋黄~ biu biu biu~',
          content: '赞同楼上哈哈哈哈',
          agree: 125,
          date: '2018-08-26 15:04',
          user_agree: 1,
        },
        {
          id: 'qwer85246',
          photo: '../../img/photo1.jpg',
          name: '延禧攻略',
          content: '我们一起学尔晴叫，一起“ 富察傅恒 你疯啦，魏璎珞 你疯啦，我 就是个疯子”',
          agree: 9999,
          date: '2018-08-24 05:24',
          user_agree: 0,
        }, {
          id: 'qwer965463',
          photo: '../../img/photo1.jpg',
          name: '如懿传的小圈粉',
          content: '被如懿的颜值暴击了',
          agree: 8564,
          date: '2018-08-26 16:04',
          user_agree: 1,
        },
        {
          id: 'qwer2846',
          photo: '../../img/photo1.jpg',
          name: '疯狂的石头',
          content: '钻石 钻石 大钻石！！！',
          agree: 25,
          date: '2018-08-24 12:24',
          user_agree: 0,
        }, {
          id: 'qwer854213',
          photo: '../../img/photo1.jpg',
          name: '高贵妃',
          content: '皇后娘娘~~ 嫔妾不知，这...后宫的风气，什么时候？竟如此之乱~',
          agree: 125,
          date: '2018-08-26 15:04',
          user_agree: 1,
        },
        {
          id: 'qwer284645',
          photo: '../../img/photo1.jpg',
          name: '富察皇后',
          content: '高贵妃，这是长春宫，不是储秀宫，什么时候轮到你...',
          agree: 3145,
          date: '2018-08-24 12:24',
          user_agree: 0,
        }, {
          id: 'qwer753241',
          photo: '../../img/photo1.jpg',
          name: '富察傅恒',
          content: '这...魏璎珞，不成体统...',
          agree: 125,
          date: '2018-08-26 15:04',
          user_agree: 1,
        }
      ],
      total: 222//评论总数
    },
    detail_agree:2699,//文章点赞数
    user_agree: 0,//用户是否点赞；是1；否0；
    detail_comment_listStatus:0,//全部评论列表 显示（1）隐藏（0） 的 状态
    detail_comment_listBgStatus: 0,//全部评论列表背景 显示（1）隐藏（0） 的 状态
    animationData: {},//动画需要
  },
  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {},
  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {},
  /*生命周期函数--监听页面显示*/
  onShow: function () {},
  /*生命周期函数--监听页面隐藏*/
  onHide: function () {},
  /*生命周期函数--监听页面卸载*/
  onUnload: function () {},
  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {},
  /*页面上拉触底事件的处理函数*/
  onReachBottom: function () {},
  /*用户点击右上角分享*/
  onShareAppMessage: function () {},

  // 文章的点赞
  detail_agree: function(e){
    var that = this;
    if (that.data.user_agree === 0){
      that.setData({ user_agree: 1 });
    }else{
      that.setData({ user_agree: 0 });
    }
  },
  // 部分 评论中 的 点赞
  detail_comment_agree: function(e){
    var that = this;
    var str = "detail_comment.list[" + e.currentTarget.id + "].user_agree";
    if (that.data.detail_comment.list[e.currentTarget.id].user_agree === 0){
      that.setData({ [str]: 1 });
    }else{
      that.setData({ [str]: 0 });
    }
  },
  // 全部 评论中 的 点赞
  detail_comment_listAll_agree: function(e){
    var that = this;
    var str = "detail_comment_listAll.list[" + e.currentTarget.id + "].user_agree";
    if (that.data.detail_comment_listAll.list[e.currentTarget.id].user_agree === 0) {
      that.setData({ [str]: 1 });
    } else {
      that.setData({ [str]: 0 });
    }
  },
  // 全部评论 列表 显示
  show_detail_comment_listAll:function(){
    var that = this;
    that.setData({ detail_comment_listBgStatus: 1 });
    setTimeout(function () {
      var animation = wx.createAnimation({ // 创建一个动画实例
        duration: 400,// 动画持续时间
        timingFunction: 'linear',// 定义动画效果，当前是匀速
      });
      that.animation = animation;// 将该变量赋值给当前动画
      animation.translateY('100%').step(); // 先在y轴偏移，然后用step()完成一个动画 1
      that.setData({// 用setData改变当前动画
        animationData: animation.export(),// 通过export()方法导出数据
        detail_comment_listStatus: 1,// 改变view里面的Wx：if
      });
      setTimeout(function () {// 设置setTimeout来改变y轴偏移量，实现有感觉的滑动 2
        animation.translateY(0).step();
        that.setData({
          animationData: animation.export()
        });
      }, 200);
    },300);
    
  },
  // 全部评论 列表 隐藏
  hide_detail_comment_listAll: function () {
    var that = this;
    setTimeout(function () {
      that.setData({ detail_comment_listBgStatus: 0 });
    }, 300);
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    });
    that.animation = animation;
    animation.translateY(500).step();
    that.setData({
      animationData: animation.export()
    });
    setTimeout(function () {
      animation.translateY(0).step();
      that.setData({
        animationData: animation.export(),
        detail_comment_listStatus: 0,
      });
    }, 200);
  },
})