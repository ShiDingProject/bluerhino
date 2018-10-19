// pages/search/search.js
//获取应用实例
const app = getApp()

Page({

  /* 页面的初始数据 */
  data: {
    systemcategory:'',
    tags:'',
    pageLimit: 10,// 文章列表 每页 显示 条数
    detailList: [],//获取 文章列表
    detailPage: 1,
  },
  onLoad: function (options) {
    var that = this;
    that.setData({ tags: options.id, systemcategory: options.systemcategory });//获取 跳转页面 的 传参（文章id systemcategory）
    that.get_DetailList(); // 获取 文章列表
    //修改小程序标题
    wx.setNavigationBarTitle({
      title: that.data.tags
    })
  },
  // 获取 文章列表
  get_DetailList: function(){
    var that = this;
    console.log(that.data.detailPage);
    console.log(that.data.pageLimit);
    console.log(that.data.systemcategory);
    console.log(that.data.tags);
    wx.request({
      url: app.globalData.https + '/public/mp/synchronize/synchronizeArtile',
      data: {
        page: that.data.detailPage,
        limit: that.data.pageLimit,
        systemcategory: that.data.systemcategory,
        tags: that.data.tags
      },
      method: "POST",
      success: function (res) {
        console.log(res.data);
        var data = res.data;
        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].systemcategory == 1) { data.data[i].list_typeName = '资讯' }
          else if (data.data[i].systemcategory == 2) { data.data[i].list_typeName = '观点' }
          else if (data.data[i].systemcategory == 3) { data.data[i].list_typeName = '著作' }
          else if (data.data[i].systemcategory == 4) { data.data[i].list_typeName = '解决方案' }
        }
        that.setData({ detailList: data });
      }
    })
  },
  // 评论列表 上拉加载
  detail_Pull_Up_Loading: function () {
    var that = this;
    if (that.data.detailList.data.length < that.data.detailList.total) {
      // console.log('评论列表 加载更多');
      var page = that.data.detailPage + 1;
      that.setData({ detailPage: page });
      wx.request({
        url: app.globalData.https + '/public/mp/synchronize/synchronizeArtile',
        data: {
          page: that.data.detailPage,
          limit: that.data.pageLimit,
          systemcategory: 9,
          tags: that.data.tags
        },
        method: "POST",
        success: function (res) {
          var data0 = res.data;
          var data1 = that.data.detailList;
          for (var i = 0; i < data0.data.length; i++) {
            data1.data.push(data0.data[i]);
          }
          data1.current_page = data0.current_page;
          for (var i = 0; i < data1.data.length; i++) {
            if (data1.data[i].systemcategory == 1) { data1.data[i].list_typeName = '资讯' }
            else if (data1.data[i].systemcategory == 2) { data1.data[i].list_typeName = '观点' }
            else if (data1.data[i].systemcategory == 3) { data1.data[i].list_typeName = '著作' }
            else if (data1.data[i].systemcategory == 4) { data1.data[i].list_typeName = '解决方案' }
          }
          that.setData({ detailList: data1 });
          console.log(that.data.detailList);
        }
      })
    }
  },
  // 文章详情 页面跳转
  bookTap: function (e) {
    var that = this;
    var href_url = '../detail/detail?id=' + e.currentTarget.dataset.aid + '&systemcategory=' + e.currentTarget.dataset.systemcategory + '&title=' + that.data.tags;
    console.log(href_url);
    wx.navigateTo({
      url: href_url
    })
  }
})