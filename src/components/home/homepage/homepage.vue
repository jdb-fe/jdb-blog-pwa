<template>
  <div class="homepage">
    <scroll class="homepage-roll-container" :data="home">
      <div class="homepage-container">
        <div class="hot-recommend">
          <div class="hot-recommend-head">
            <div class="left">
              <i class="iconfont">&#xe67c;</i>热门推荐</div>
            <div class="right">
              <i class="iconfont refresh">&#xe6d3;</i>
              <i class="iconfont">&#xe6bf;</i>
            </div>
          </div>
        </div>
        <div class="newslist-container">
          <div @click="selectlist(item,index)" :key="index" class="newslist" v-for="(item,index) in articleList">
            <div class="recommend-infor">
              <p class="multilinie-text-overflow">{{item.title}}</p>
              <span>{{item.like || 100}}人喜欢·{{item.author|| 'jdbfe'}}·{{item.time || 'JustNow'}}前</span>
              <img v-lazy="item.image" v-if="item.image">
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <!-- <listdetail :list="selectedlist" ref="listdetail"></listdetail> -->
  </div>

</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {
    ERR_OK
  } from 'api/config'
  import newslist from 'base/newslist/newslist'
  import listdetail from 'base/listdetail/listdetail'

  export default {
    data() {
      return {
        find: {
          type: Object
        },
        home: {
          type: Object
        },
        selectedlist: {},
        articleList: [],
      };
    },
    props: {

    },
    created() {
      // find
      // this.$http.get('/jdb-blog-pwa/static/data.json').then((response) => {
      //   response = response.body;
      //   if (response.find) {
      //     this.find = response.find;
      //   }
      // });

      // home
      // this.$http.get('/jdb-blog-pwa/static/data.json').then((response) => {
      //   response = response.body;
      //   if (response && response.home) {
      //     this.home = response.home;
      //   }
      // });

      this.$fetch('articleListApi', {}, true, 'get').then((res) => {
        this.articleList = res.data.list;
        this.setArticleToLocal(this.articleList);
      });
      if (!navigator.onLine) {
        this.articleList = this.getArticleFromLocal();
      }
    },
    methods: {
      selectlist(item, index) {
        this.$router.push({
          path: '/detail',
          query: {
            index: index,
          }
        })
        // this.selectedlist = item;
        // this.$refs.listdetail.show();
      },
      setArticleToLocal(list) {
        localStorage && localStorage.setItem('articleList', JSON.stringify(list));
      },
      getArticleFromLocal() {
        let list = [];
        let str = '';
        str = localStorage.getItem('articleList');
        try {
          list = JSON.parse(str) || [];
        } catch (e) {
          console.log(e);
        }
        return list;
      }
    },
    components: {
      newslist,
      // listdetail,
      Scroll
    }
  }

</script>

<style>
  .homepage {
    height: auto;
    margin-top: 50px;
    overflow: hidden;
  }

  .homepage-roll-container {
    position: absolute;
    width: 100%;
    top: 40px;
    bottom: 10px;
  }

  .hot-recommend {
    width: 100%;
    height: auto;
    background: #fff;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .hot-recommend .hot-recommend-head {
    width: 100%;
    height: 37px;
    line-height: 37px;
    box-shadow: inset 0px -1px 1px -1px #A7A7AB;
  }

  .hot-recommend-head .left {
    float: left;
    color: #007AFF;
    font-size: 15px;
    padding-left: 10px;
  }

  .hot-recommend-head .left i {
    padding-right: 5px;
    font-size: 15px;
  }

  .hot-recommend-head .right {
    float: right;
    padding-right: 10px;
  }

  .hot-recommend-head .right i {
    padding: 8px 5px 8px 10px;
    font-size: 20px;
    font-weight: 600;
    color: #E0E0E0;
  }

  .hot-recommend .hot-recommend-list {
    position: relative;
    height: 100px;
    box-shadow: inset 0px -1px 1px -1px #A7A7AB;

  }

  .hot-recommend-list .recommend-infor {
    float: left;
    width: 70%;
    padding-top: 20px;
    padding-left: 12px;
  }

  .recommend-infor-ic {
    padding-top: 5px;
  }

  .recommend-infor-ic span {
    display: inline-block;
    height: 14px;
    line-height: 14px;
    padding-right: 5px;
    font-size: 10px;
    color: #E0E0E0;
  }

  .recommend-infor-ic span i {
    font-size: 14px;
  }

  .recommend-infor p {
    color: #000;
    line-height: 20px;
  }

  .hot-recommend-list .recommend-img {
    position: absolute;
    width: 60px;
    height: 60px;
    right: 12px;
    top: 20px;
  }

  .hot-recommend-list .recommend-img img {
    width: 60px;
    height: 60px;
  }

  .hot-recommend-list-2 {
    margin-top: 10px;
  }

  .newslist-container {
    height: auto;
    padding-bottom: 48px;
  }

  .newslist {
    position: relative;
    height: 80px;
    padding-top: 20px;
    background: #fff;
    box-shadow: inset 0px -1px 1px -1px #A7A7AB;
  }

  .newslist .recommend-infor {
    padding-left: 12px;
  }

  .newslist .recommend-infor p {
    width: 70%;
    color: #000;
    line-height: 20px;
    padding-top: 2px;
    padding-bottom: 4px;
  }

  .newslist .recommend-infor span {
    font-size: 14px;
  }

  .newslist .recommend-infor img {
    position: absolute;
    height: 60px;
    width: 60px;
    right: 12px;
    top: 50%;
    margin-top: -30px;
  }

  .multilinie-text-overflow {
    height: 37px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding-bottom: 20px;
  }

</style>
