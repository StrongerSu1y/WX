<template>
  <div>
    <header class="activity-header">
      <div class="back-icon" @click="goBack()">
        <img ref="homeIcon" src="./back_icon.png">
      </div>
      <div class="search-city">
        <input class="left-part" placeholder=" 搜索您所在地区" v-model="citySearch">
        <div class="right-part">
          <img src="./search_icon_black.png">
        </div> 
      </div>
      <div class="clear-button" @click="goBack()">
        <span>取消</span>
      </div>
    </header>
<!--     <div class="page-indexlist-wrapper" style="margin-top: 1.1rem">
      <mt-index-list>
        <mt-index-section v-for="item in alphabet" :index="item.initial">
          <mt-cell v-for="cell in item.cells" :title="cell"></mt-cell>
        </mt-index-section>
      </mt-index-list>
    </div> -->
    <div>
      <div v-for="item in showCity" class="letter-item">
        <div class="letter"><a :id="item.letter">{{item.letter}}</a></div>
        <div class="tit" v-for="i in item.citylist">{{i}} </div>
      </div>
    </div>
    <aside class="letter-aside">
      <ul>
        <li v-for="item in showCity" @click="naver(item.letter)">{{item.letter}} </li>
      </ul>
    </aside>
    <div id="tip">
      {{tipString}}
    </div>
  </div>
</template>

<script type="text/babel">
  import area from '../../../../static/data/area.json'
  import pinyin from '../../../common/js/web-pinyin/bundle.js'
  // const pinyin = require('pinyin')

  var cityLists = []
  var cityNames = []
  var cityNamesFilter = []
  var letter = []
  var countPage = 0
  var tipLetter = ''
  var citySearch = ''
  var showCity = []
  var showCityList = []
  var showCityTemp

  export default {
    name: 'areaList',
    data() {
      return {
        // alphabet: [], // 字母表
        data: [], // 地区数据
        cityNames: cityNamesFilter,
        showCity: showCity,
        letter: letter,
        tipString: tipLetter,
        citySearch: citySearch
      };
    },

    created () {
      // 加载数据
      this.loadData()

      // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((initial, index) => {
      //   let cells = this.data.filter(name => name[0] === initial)
      //   // let cells = this.data.filter(function (item) {
      //   //   let aaa = pinyin(item, {
      //   //     style: pinyin.STYLE_FIRST_LETTER,
      //   //   })
      //   // })
      //   // console.log(cells)
      //   this.alphabet.push({
      //     initial,
      //     cells 
      //   });
      // });

      this.buildItem()
    },
    mounted () {
      window.scrollTo(0, 500)
    },
    methods:{
      // 获取城市列表
      loadData() {
        area.result.forEach((item) => {
          item.citylist.forEach((el) => {
            this.data.push(el.cityname)
          })
        })
        cityNamesFilter = this.data
        console.log(cityNamesFilter)


        // let pin = []
        // let letter = []
        // this.data.forEach((item, index) => {
        //   pin.push(pinyin(item[0],{
        //     style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格
        //   }))
        // })
        // pin.forEach((item,index) => {
        //   letter = item[0][0].toString().toUpperCase()
        // })
        // console.log(letter)
      }, 
      // 构建字母项
      buildLetter () {  
        let letter = []
        for (let i = 0; i < 26; i++) {
          let obj = {}
          obj.letter = String.fromCharCode((65 + i))
          obj.citylist = []
          letter.push(obj)
        }
      },
      // 得到城市第一个字首字母
      getFirstLetter (str) {
        // return pinyin(str[0][0], {
        //   style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格
        // })
        return pinyin.pinyin(str)[0][0].charAt(0).toUpperCase()
      },
      // 构建城市
      buildItem (cityNamesFilter) {
        this.buildLetter()
        let _this = this
        for (let i = 0; i < 26; i++) {
          letter[i].citylist = []
        }
        for (let i = 0; i < cityNamesFilter.length; i++) {
          let _index = Number(_this.getFirstLetter(cityNamesFilter[i]).charCodeAt() - 65)
          if (_index >= 0 && _index <26) {
            letter[_index].citylist.push(cityNamesFilter[i])
          }
        }
        // 如果letter中citylist没有值则过滤
        showCity = showCityTemp = letter.filter(function (value) {
          let len = value.citylist.length
          return len > 0
        })
        console.log(showCity)
      },
      // 点击右边字母滚动
      naver (id) {
        this.tipString = id
        let obj = document.getElementById(id)
        let tip = document.getElementById('tip')
        tip.setAttribute('class', 'tipAppear')
        setTimeout(function () {
          tip.removeAttribute('class')
        }, 500)
        let oPos = obj.offsetTop
        return window.scrollTo(0, oPos - 36)
      },
      // 搜索
      cityFilter (city) {  // 城市搜索筛选
        let showCityListTemp
        this.buildItem(cityNamesFilter)
        showCity = showCityTemp
        showCity = showCity.filter(function (value) {
          showCityList = value.citylist
          showCityListTemp = showCityList.filter(function (val) {
            return (val.indexOf(city) > -1)
          })
          value.citylist = showCityListTemp
          return value.citylist.length > 0
        })
        this.showCity = showCity
        if (showCity.length === 0) {
          let _showCityContent = document.getElementById('showCityContent')
          _showCityContent.innerText = '查询不到结果'
          _showCityContent.setAttribute('class', 'tipShow')
        } else {
          document.getElementById('showCityContent').innerText = ''
        }
      },
      goBack () {
        this.$router.goBack()
      },
    },
    watch: {
      citySearch (newCitySearch) {
        this.cityFilter(newCitySearch)
      }
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