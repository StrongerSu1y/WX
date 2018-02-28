<template>
  <div class="page-indexlist">
    <header class="activity-header">
      <div class="back-icon" @click="goBack()">
        <img ref="homeIcon" src="./back_icon.png">
      </div>
      <div ref="searchArea" class="search-area">
        <input class="left-part" placeholder=" 搜索您所在地区">
        <div class="right-part">
          <img src="./search_icon_black.png">
        </div> 
      </div>
      <div class="clear-button" @click="goBack()">
        <span>取消</span>
      </div>
    </header>
    <div class="page-indexlist-wrapper" style="margin-top: 1.1rem">
      <mt-index-list>
        <mt-index-section v-for="item in alphabet" :index="item.initial">
          <mt-cell v-for="cell in item.cells" :title="cell"></mt-cell>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>

<script type="text/babel">
  import area from '../../../../static/data/area.json' 
  const pinyin = require('pinyin')

  export default {
    name: 'areaList',
    data() {
      return {
        alphabet: [], // 字母表
        data: [], // 地区数据
      };
    },

    created() {
      
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(initial => {
        let cells = this.data.filter(name => name[0] === initial)
        this.alphabet.push({
          initial,
          cells
        });
      });

      this.loadData()
    },
    methods:{
      loadData() {
        area.result.forEach((item) => {
          item.citylist.forEach((el) => {
            this.data.push(el.cityname)
          })
        })
        let tit = pinyin(this.data[0],{
          style: pinyin.STYLE_INITIALS, // 设置拼音风格
          heteronym: true
        })
        tit.forEach((item, index) => {
          console.log(item[index])
        })
      },
      goBack () {
        this.$router.goBack()
      },
    }
  };
</script>

<style lang="stylus" rel="stylusheet/stylus">
  // @component-namespace page {
  //   @component indexlist {
  //     @descendent desc {
  //       text-align: center;
  //       color: #666;
  //       padding-bottom: 5px;
  //     }

  //     @descendent wrapper {
  //       width: 100%;
  //       border-top: solid 1px #ddd;
  //     }
  //   }
  // }
  @import './areaList.styl'
</style>