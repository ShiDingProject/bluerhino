//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [
      {
        text: '推荐',
        page_type: 'recommend',//页面类型
      },
      {
        text: '资讯',
        page_type: 'information',//页面类型
      },
      {
        text: '观点',
        page_type: 'view',//页面类型
      },
      {
        text: '著作',
        page_type: 'book',//页面类型
      },
      {
        text: '解决方案',
        page_type: 'solution',//页面类型
      },
    ],
    currentTab: 0,
    navScrollLeft: 0,
    pageLimit: 10,// 文章列表 每页 显示 条数
    recommendList: [],// 推荐 文章列表
    recommendTopNum:0,
    recommendPage:1,
    informationList: [],// 资讯 文章列表
    informationTopNum: 0,
    informationPage: 1,
    viewList: [],// 观点 文章列表
    viewTopNum: 0,
    viewPage: 1,
    bookList: [],// 著作 文章列表
    bookTopNum: 0,
    bookPage: 1,
    solutionList: [],// 解决方案 文章列表
    solutionTopNum: 0,
    solutionPage: 1,
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    });

    this.getRecommendList();// 【推荐】 文章列表 获取
    this.getInformationList();// 【资讯】 文章列表 获取
    this.getViewList();// 【观点】 文章列表 获取
    this.getBookList();// 【著作】 文章列表 获取
    this.getSolutionList();// 【解决方案】 文章列表 获取
  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    console.log('下拉刷新');
    wx.showToast({title: '正在刷新',icon: 'loading'});
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function () {
      if (that.data.currentTab == 0){
        that.setData({ recommendTopNum: that.data.recommendTopNum = 0, recommendPage: that.data.recommendPage = 1 });// 下拉刷新时 【推荐】 文章列表 滚动轴回到初始位置
        that.getRecommendList();// 获取 【推荐】 文章列表
      } else if (that.data.currentTab == 1){
        that.setData({ informationTopNum: that.data.informationTopNum = 0, informationPage: that.data.informationPage = 1 });// 下拉刷新时 【资讯】 文章列表 滚动轴回到初始位置
        that.getInformationList();// 获取 【资讯】 文章列表
      } else if (that.data.currentTab == 2) {
        that.setData({ viewTopNum: that.data.viewTopNum = 0, viewPage: that.data.viewPage = 1 });// 下拉刷新时 【观点】 文章列表 滚动轴回到初始位置
        that.getViewList();// 获取 【观点】 文章列表
      } else if (that.data.currentTab == 3) {
        that.setData({ bookTopNum: that.data.bookTopNum = 0, bookPage: that.data.bookPage = 1 });// 下拉刷新时 【著作】 文章列表 滚动轴回到初始位置
        that.getBookList();// 获取 【著作】 文章列表
      } else if (that.data.currentTab == 4) {
        that.setData({ solutionTopNum: that.data.solutionTopNum = 0, solutionPage: that.data.solutionPage = 1 });// 下拉刷新时 【解决方案】 文章列表 滚动轴回到初始位置
        that.getSolutionList();// 获取 【解决方案】 文章列表
      }
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh({ complete: function (res) { wx.hideToast() } });//停止下拉刷新
    }, 1000);
  },
  // 【推荐】 文章列表 获取
  getRecommendList: function () {
    var that = this;
    wx.request({
      url: app.globalData.https + '/public/mp/synchronize/synchronizeArtile',
      data: {
        page: that.data.recommendPage,
        limit: that.data.pageLimit,
        systemcategory:0,
      },
      method: "POST",
      success: function (res) {
        // console.log(res.data);
        var data = res.data;
        that.setData({ recommendList: data });
      }
    })
  },
  // 【推荐】 文章列表 上拉加载
  recommend_Pull_Up_Loading: function () { 
    var that = this;
    if (that.data.recommendList.data.length < that.data.recommendList.total) {
      // console.log('推荐 文章列表 加载更多');
      var page = that.data.recommendPage + 1;
      that.setData({ recommendPage: page });
      wx.request({
        url: app.globalData.https + '/public/mp/synchronize/synchronizeArtile',
        data: {
          page: that.data.recommendPage,
          limit: that.data.pageLimit,
          systemcategory: 2,
        },
        method: "POST",
        success: function (res) {
          var data0 = res.data;
          var data1 = that.data.recommendList;
          for (var i = 0; i < data0.data.length; i++) {
            data1.data.push(data0.data[i]);
          }
          data1.current_page = data0.current_page;
          that.setData({ recommendList: data1 });
          // console.log(that.data.recommendList);
        }
      })
    }
  },
  // 【资讯】 文章列表 获取
  getInformationList: function () { 
    var that = this;
    wx.request({
      url: app.globalData.https + '/public/mp/synchronize/synchronizeArtile',
      data: {
        page: that.data.informationPage,
        limit: that.data.pageLimit,
        systemcategory: 1,
      },
      method: "POST",
      success: function (res) {
        console.log(res.data);
        var data = res.data;
        that.setData({ informationList: data });
      }
    })
  },
  // 【资讯】 文章列表 上拉加载
  information_Pull_Up_Loading: function () {
    var that = this;
    if (that.data.informationList.data.length < that.data.informationList.total) {
      // console.log('资讯 文章列表 加载更多');
      var page = that.data.informationPage + 1;
      that.setData({ informationPage: page});
      wx.request({
        url: app.globalData.https + '/public/mp/synchronize/synchronizeArtile',
        data: {
          page: that.data.informationPage,
          limit: that.data.pageLimit,
          systemcategory: 1,
        },
        method: "POST",
        success: function (res) {
          var data0 = res.data;
          var data1 = that.data.informationList;
          for (var i = 0; i < data0.data.length; i++) {
            data1.data.push(data0.data[i]);
          }
          data1.current_page = data0.current_page;
          that.setData({ informationList: data1 });
          // console.log(that.data.informationList);
        }
      })
    }
  },
  // 【观点】 文章列表 获取
  getViewList: function () {
    var that = this;
    wx.request({
      url: app.globalData.https + '/public/mp/synchronize/synchronizeArtile',
      data: {
        page: that.data.viewPage,
        limit: that.data.pageLimit,
        systemcategory: 2,
      },
      method: "POST",
      success: function (res) {
        console.log(res.data);
        var data = res.data;
        that.setData({ viewList: data });
      }
    })
  },
  // 【观点】 文章列表 上拉加载
  view_Pull_Up_Loading: function () {
    var that = this;
    // console.log(that.data.viewList);
    if (that.data.viewList.data.length < that.data.viewList.total) {
      console.log('观点 文章列表 加载更多');
      var page = that.data.viewPage + 1;
      that.setData({ viewPage: page });
      console.log(that.data.viewPage);
      console.log(that.data.pageLimit);
      wx.request({
        url: app.globalData.https + '/public/mp/synchronize/synchronizeArtile',
        data: {
          page: that.data.viewPage,
          limit: that.data.pageLimit,
          systemcategory: 2,
        },
        method: "POST",
        success: function (res) {
          console.log(res);
          var data0 = res.data;
          var data1 = that.data.viewList;
          for (var i = 0; i < data0.data.length; i++) {
            data1.data.push(data0.data[i]);
          }
          data1.current_page = data0.current_page;
          that.setData({ viewList: data1 });
        }
      })
    }
  },
  // 【著作】 文章列表 获取
  getBookList: function () {
    var that = this;
    wx.request({
      url: app.globalData.https + '/public/mp/synchronize/synchronizeArtile',
      data: {
        page: that.data.bookPage,
        limit: that.data.pageLimit,
        systemcategory: 3,
      },
      method: "POST",
      success: function (res) {
        // console.log(res.data);
        var data = res.data;
        that.setData({ bookList: data });
      }
    })
  },
  // 【著作】 文章列表 上拉加载
  book_Pull_Up_Loading: function () {
    var that = this;
    if (that.data.bookList.data.length < that.data.bookList.total) {
      console.log('著作 文章列表 加载更多');
      var page = that.data.bookPage + 1;
      that.setData({ bookPage: page });
      wx.request({
        url: app.globalData.https + '/public/mp/synchronize/synchronizeArtile',
        data: {
          page: that.data.bookPage,
          limit: that.data.pageLimit,
          systemcategory: 1,
        },
        method: "POST",
        success: function (res) {
          var data0 = res.data;
          var data1 = that.data.bookList;
          for (var i = 0; i < data0.data.length; i++) {
            data1.data.push(data0.data[i]);
          }
          data1.current_page = data0.current_page;
          that.setData({ bookList: data1 });
          // console.log(that.data.bookList);
        }
      })
    }
  },
  // 【解决方案】 文章列表 获取
  getSolutionList: function () {
    var that = this;
    wx.request({
      url: app.globalData.https + '/public/mp/synchronize/synchronizeArtile',
      data: {
        page: that.data.solutionPage,
        limit: that.data.pageLimit,
        systemcategory: 4,
      },
      method: "POST",
      success: function (res) {
        // console.log(res.data);
        var data = res.data;
        that.setData({ solutionList: data });
      }
    })
  },
  // 【解决方案】 文章列表 上拉加载
  solution_Pull_Up_Loading: function () {
    var that = this;
    if (that.data.solutionList.data.length < that.data.solutionList.total) {
      // console.log('解决方案 文章列表 加载更多');
      var page = that.data.solutionPage + 1;
      that.setData({ solutionPage: page });
      wx.request({
        url: app.globalData.https + '/public/mp/synchronize/synchronizeArtile',
        data: {
          page: that.data.solutionPage,
          limit: that.data.pageLimit,
          systemcategory: 1,
        },
        method: "POST",
        success: function (res) {
          var data0 = res.data;
          var data1 = that.data.solutionList;
          for (var i = 0; i < data0.data.length; i++) {
            data1.data.push(data0.data[i]);
          }
          data1.current_page = data0.current_page;
          that.setData({ solutionList: data1 });
          // console.log(that.data.solutionList);
        }
      })
    }
  },
  // 文章详情 页面跳转
  bookTap: function (e) {
    var href_url = '../detail/detail?id=' + e.currentTarget.dataset.aid + '&systemcategory=' + e.currentTarget.dataset.systemcategory;
    console.log(href_url);
    wx.navigateTo({ url: href_url });
  },
  // 搜索 页面跳转
  go_SearchPage: function (e) {
    var href_url = '../search/search';
    wx.navigateTo({ url: href_url });
  }
})
