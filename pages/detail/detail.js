// pages/detail/detail.js
//获取应用实例
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');//转译 富文本插件
Page({

  /* 页面的初始数据 */
  data: {
    detail_id:'',
    detail_systemcategory:'',
    commentPage:1,
    pageLimit:10,
    detail_info:[],
    detail_comment:[]
  },
  onLoad: function (options) {
    var that = this;
    that.setData({ detail_id: options.id, detail_systemcategory: options.systemcategory });//获取 跳转页面 的 传参（文章id systemcategory）
    // console.log(that.data.detail_id);
    that.getDetail_Info();// 获取 文章 详情
    // that.getDetail_CommentList();// 评论列表 获取
    if (options.title){
      //修改小程序标题
      wx.setNavigationBarTitle({
        title: options.title
      })
    }
  },
  // 获取 文章 详情
  getDetail_Info:function(){
    var that = this;
    wx.request({
      url: app.globalData.https + '/public/mp/synchronize/get_comment', 
      data: {
        page: that.data.commentPage,
        limit: that.data.pageLimit,
        postid: that.data.detail_id,
      },
      method: "POST",
      success: function (res) {
        if(res.data.status==1){
          console.log(res.data);
          var data0 = res.data;
          // 获取 文章 信息
          data0.articleinfo.post.create_time = data0.articleinfo.post.create_time.split(' ')[0];
          that.setData({ detail_info: data0.articleinfo });
            // 转译 富文本插件 开始
            var art = that.data.detail_info.post.post_content;
            var article = art.replace(/="\/public/g, '="' + app.globalData.https+'\/public');
            WxParse.wxParse('article', 'html', article, that, 0);
          // 获取 文章 评论列表
          that.setData({ detail_comment: data0.comment});
          // console.log(that.data.detail_comment);
        }
      }
    })
  },
  // 评论列表 上拉加载
  detail_Comment_Pull_Up_Loading: function () {
    var that = this;
    if (that.data.detail_comment.data.length < that.data.detail_comment.total) {
      // console.log('评论列表 加载更多');
      var page = that.data.commentPage + 1;
      that.setData({ commentPage: page });
      wx.request({
        url: app.globalData.https + '/public/mp/synchronize/get_comment',
        data: {
          page: that.data.commentPage,
          limit: that.data.pageLimit,
          postid: that.data.detail_id,
        },
        method: "POST",
        success: function (res) {
          if (res.data.status == 1) {
            // console.log(res.data);
            // 获取 文章 评论列表
            var data0 = res.data.comment;
            var data1 = that.data.detail_comment;
            for (var i = 0; i < data0.data.length; i++) {
              data1.data.push(data0.data[i]);
            }
            data1.current_page = data0.current_page;
            that.setData({ detail_comment: data1 });
          }
        }
      })
    }
  },
  // 标签搜索 文章列表页面跳转
  go_tagpage: function (e) {
    var href_url = '../tagpage/tagpage?id=' + e.currentTarget.dataset.id + '&systemcategory=' + e.currentTarget.dataset.systemcategory;
    console.log(href_url);
    wx.navigateTo({ url: href_url });
  }
})