// pages/search/search.js
//获取应用实例
const app = getApp()

Page({

  /* 页面的初始数据 */
  data: {
    search_value:'',// 搜索框 值
    searchHistoryList: [],// 搜索历史记录
    searchHotwordList: [],// 热门搜索词
    page:0,//当前 显示页面[0搜索首页 1即将搜索 2搜索列表]
    pageLimit:10,
    detailList: [],//获取 文章列表
    detailPage:1
  },
  onLoad: function () {
    var that = this;
    that.get_searchHistoryList();// 获取 搜索 历史记录
    that.get_SearchHotwordList();// 获取 热门搜索词
  }, 
  // 获取 搜索 历史记录
  get_searchHistoryList: function () {
    var that = this;
    that.setData({
      searchHistoryList: wx.getStorageSync('searchHistoryList') || [],//若无储存则为空
    });
    console.log(that.data.searchHistoryList);
  },
  // 保存 本地搜索 历史记录
  save_searchHistoryList: function(){
    var that = this;
    var data0 = that.data.searchHistoryList;
    // 新增记录 并去除重复
    for (var i = 0; i < data0.length;i++){
      if (that.data.search_value==data0[i]){
        data0.splice(i, 1);
      }
    }
    data0.unshift(that.data.search_value);
    // 限制最多 拥有10条历史记录
    var history = [];
    if (data0.length>10){
      for(var i =0;i<10;i++){history.push(data0[i]);}
    }else{
      history=data0;
    }
    // 保存数组 到 历史记录
    that.setData({ searchHistoryList: history });
    wx.setStorageSync('searchHistoryList', that.data.searchHistoryList)
  },
  removeSearchHistory:function(e){
    var that = this;
    console.log(e);
    var tag = e.currentTarget.dataset.index;
    if (tag!='all'){
      var history = that.data.searchHistoryList;
      history.splice(tag, 1);
      // 保存数组 到 历史记录
      that.setData({ searchHistoryList: history });
      wx.setStorageSync('searchHistoryList', that.data.searchHistoryList)
    }else{
      var history = [];
      // 保存数组 到 历史记录
      that.setData({ searchHistoryList: history });
      wx.setStorageSync('searchHistoryList', that.data.searchHistoryList)
    }
  },
  // 获取 热门搜索词
  get_SearchHotwordList: function(){
    var that = this;
    wx.request({
      url: app.globalData.https + '/mp/synchronize/searchHotword',
      data: {},
      method: "POST",
      success: function (res) {
        // console.log(res.data);
        var data = res.data;
        that.setData({ searchHotwordList: data.word});
      }
    })
  },
  // 搜索框 鼠标抬起事件
  bindKeyInput: function (e) {
    var that = this;
    that.setData({search_value: e.detail.value});
    if (that.data.search_value == ""){
      that.setData({ page: 0, detailList: []});
    }else{
      that.setData({ page: 1, detailList: []});
    };
  },
  // 执行 搜索 事件
  go_SearchList: function(){
    var that = this;
    if (that.data.search_value!=""){
      that.setData({ page: 2 });
      wx.showLoading({ title: '正在加载' });
      that.get_DetailList();// 获取 文章列表
      that.save_searchHistoryList();// 保存 本地搜索 历史记录
    }
  },
  // 点击标签 执行搜索事件
  btn_SearchList:function(e){
    var that = this;
    that.setData({ search_value: e.currentTarget.dataset.name });
    that.setData({ page: 2 });
    wx.showLoading({ title: '正在加载' });
    that.get_DetailList();// 获取 文章列表
    that.save_searchHistoryList();// 保存 本地搜索 历史记录
  },
  // 获取 文章列表
  get_DetailList: function(){
    var that = this;
    // console.log(that.data.detailPage);
    // console.log(that.data.pageLimit);
    // console.log(that.data.search_value);
    wx.request({
      url: app.globalData.https + '/mp/synchronize/synchronizeArtile',
      data: {
        page: that.data.detailPage,
        limit: that.data.pageLimit,
        systemcategory: 9,
        title: that.data.search_value
      },
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        var data = res.data;
        for (var i = 0; i < data.data.length;i++){
          if (data.data[i].systemcategory == 1) { data.data[i].list_typeName='资讯'}
          else if (data.data[i].systemcategory == 2) { data.data[i].list_typeName = '观点' }
          else if (data.data[i].systemcategory == 3) { data.data[i].list_typeName = '著作' }
          else if (data.data[i].systemcategory == 4) { data.data[i].list_typeName = '解决方案' }
        }
        console.log(data);
        that.setData({ detailList: data });
      }
    })
  },
  // 文章详情 页面跳转
  bookTap: function (e) {
    var href_url = '../detail/detail?id=' + e.currentTarget.dataset.aid + '&systemcategory=' + e.currentTarget.dataset.systemcategory;
    console.log(href_url);
    wx.navigateTo({
      url: href_url
    })
  },
  // 点击 取消 返回首页
  go_Index: function () {
    var href_url = '../index/index';
    wx.navigateBack({
      url: href_url
    })
  }
})