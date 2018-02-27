<template>
	<div class="activity-search-top">
		<header ref="top" class="activity-search-header">
			<div class="back-icon" @click="goBack()">
				<img src="./back_icon.png" ref="homeIcon">
			</div>
			<div ref="searchArea" class="search-area" @click="openSearch()">
				<div class="left-part">
					在此输入搜索内容
				</div>
				<div class="right-part">
					<img src="./search_icon.png" ref="searchIcon">
				</div>
			</div>
			<div class="search_top_message">
				<!-- 消息数 -->
	<!-- 			<span v-if="messageList.length" class="dot">{{messageList.length}}</span> -->
				<span class="dot">2</span>
				<img ref="messageIcon" src="./message_icon.png">
			</div>
		</header>
		<section class="search-tab">
			<div v-for="(type, index) in typeDatas" class="tab-item" @click="changeType(index)">
				<div class="box">
					<span class="text">{{ type }}</span>
					<span class="arrow" :class="{ up: !fold && typeIndex === index }"></span> 
				</div>
			</div>
		</section>
		<!-- 下拉分类 -->
		<section class="select-box">
			<transition-group enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp" class="box-shade">
				<!-- 活动种类 -->
				<section :key="'type0'" v-show="typeIndex === 0 && !fold" class="select-area">
					<ul class="select-row">
						<li v-for="(item, index) in actTypeList" class="select-col" @click="selectItem(item, index, 'act')">
							<span class="select-item">{{ item.name }}</span>
							<span><img src="./col_icon.png"></span>
						</li>
					</ul>
				</section>
				<!-- 地区列表 -->
				<section :key="'type1'" v-show="typeIndex === 1 && !fold" class="select-area">
					<ul class="select-row">
						<li v-for="(item, index) in actCityList" class="select-col" @click="selectItem(item, index, 'city')">
							<span class="select-item">{{ item.name }}</span>
							<span><img src="./col_icon.png"></span>
						</li>
					</ul>
				</section>
				<!-- 年龄段 -->
				<section :key="'type2'" v-show="typeIndex === 2 && !fold" class="select-area">
					<ul class="select-row">
						<li class="select-col" v-for="(item, index) in itemAgeList" @click="selectItem(item, index, 'age')">
							<span class="select-item">{{ item.name }}</span>
							<span><img src="./col_icon.png"></span>
						</li>
					</ul>
				</section>
				<!-- 分类排序 -->
				<section :key="'type3'" v-show="typeIndex === 3 && !fold" class="select-area">
					<ul class="select-row">
						<li class="select-col" v-for="(item, index) in itemSortList" @click="selectItem(item, index, 'sort')">
							<span class="select-item">{{ item.name }}</span>
							<span><img src="./col_icon.png"></span>
						</li>
					</ul>
				</section>
			</transition-group>
		</section>

		<!-- 遮罩 -->
		<transition enter-avtive-class="animated fadeIn" leave-active-class="animated fadeOut">
			<section v-show="!fold" @click="hideSelector()" class="mask"></section>
		</transition>
	</div>
</template>

<script>
	import { getWithCommaString } from '@/common/js/common.js'
	
	export default {
		name: 'activity-search-top',
		props: {
			scrollTop: {
				type: Number
			},
			params: {
				type: Object
			},
			actTypeIds: {
				type: String
			}
		},
		data () {
			return {
				flag: true,
				arrowUp: false,
				keyword: '',
				typeIndex: -1,
				// 选项类别
				// typeDatas: [
				// 		{
				// 			name : "活动分类"
				// 		},
				// 		{
				// 			name : "地区"
				// 		},
				// 		{
				// 			name : "年龄"
				// 		},
				// 		{
				// 			name : "排序"
				// 		},
				// ],
				// 活动类别数据
				actTypeList: [
					{
						id: '',
						active: false,
						name: "全部"
					},
					{
						id: 1,
						active: false,
						name: "亲子活动"
					},
					{
						id: 2,
						active: false,
						name : "校园活动"
					},
					{
						id: 3,
						active: false,
						name : "节目剧场"
					},
					{
						id: 4,
						active: false,
						name : "游玩乐园"
					},
					{
						id: '',
						active: false,
						name : "其他"
					}
				],
				// 地区数据
				actCityList: [
					{
						active: false,
						name : "上城区"
					},{
						active: false,
						name : "下城区"
					},{
						active: false,
						name : "拱墅区"
					}
				],
				// 年龄数据
				itemAgeList: [
					{
						id: 1,
						active: false,
						name : "0~3岁"
					},{
						id: 2,
						active: false,
						name : "3~6岁"
					},{
						id: 3,
						active: false,
						name : "6~12岁"
					},{
						id: 0,
						active: false,
						name : "全年龄段"
					}
				],
				// 排序方式
				itemSortList: [
					{
						active: false,
						name : "距离"
					},{
						active: false,
						name : "热度"
					},{
						active: false,
						name : "发布时间"
					},{
						active: false,
						name : "价格"
					}
				],
				// 收起菜单
				fold: true,
				// 消息
				messageList: [],
			}
		},
		computed: {
			// tab栏数据
			typeDatas () {
				let list = []
			 	list.push(this.selectedActType() || '活动类别')
			 	list.push(this.selectedActCity() || '地区')
			 	list.push(this.selectedAge() || '年龄')
			 	list.push(this.selectedSort() || '排序')
			 	return list
			}
		},
		created () {
			this.loadData()
			// 获取消息信息
			// this.getMessage()
		},
		mounted () {
			// 获取被选中的种类
			this.getSelectedType()
		},
		methods: {
			loadData () {
				// this.actTypeList.forEach((item) => {
				// 	item.active = false
				// })
				// this.getSelectedType()
			},

			// 选中的活动种类
			selectedActType () {
				if (!this.actTypeList) {
					return []
				}
				let sel = ''
				this.actTypeList.forEach((item) => {
					if (item.active) {
						sel = item.name
						// sel.push(item.name)
						// console.log(sel)
					}
			 	})
			 	return sel
			},
			// 选中的活动地区
			selectedActCity () {
				if (!this.actCityList) {
					return []
				}
				let sel = ''
				this.actCityList.forEach((item) => {
					if (item.active) {
						sel = item.name
						// item.active = !item.active
					}
			 	})
			 	return sel
			},
			// 选中的年龄段
			selectedAge () {
				if (!this.itemAgeList) {
					return []
				}
				let sel = ''
				this.itemAgeList.forEach((item) => {
					if (item.active) {
						sel = item.name
						item.active = !item.active
						console.log(item)
					}
			 	})
			 	return sel
			},
			// 选中的排序方式
			selectedSort () {
				if (!this.itemSortList) {
					return []
				}
				let sel = ''
				this.itemSortList.forEach((item) => {
					if (item.active) {
						sel = item.name
					}
			 	})
			 	return sel
			},

			// 处理选择的字段
			// getSelectedStr (sel) {
			// 	console.log(sel)
			// 	let str = ''
			// 	if (!sel.length) {
			// 		return ''
			// 	}
			// 	sel.forEach(item => {
			// 		if (item.active) {
			// 			str += item.name + ','
			// 		}
			// 	})
			// 	let str1 = str ? str.substr(0, str.length - 1) : ''
			// 	console.log(str1)
			// 	return str1
			// },

			// 控制菜单
			changeType (index) {
				if (this.typeIndex === index && this.fold === false) {
					this.fold = true
					return
				}
				this.fold = false
				this.typeIndex = index
			},
			// 隐藏选择器
			hideSelector () {
				this.fold = true
			},
			// 选中当前项
			selectItem (item, index, type) {	
				if (type === 'act') {
					this.actTypeList[index].active = true
					// this.actTypeList.forEach((el) => {
						// el.active = false
						// console.log(el)
					// })

					this.params.actTypeIds = item.id
				} else if (type === 'age') {
					this.itemAgeList[index].active = !this.itemAgeList[index].active
					// this.params.itemAgeIds = item.id
				} else if (type === 'city') {
					this.actCityList[index].active = !this.actCityList[index].active
					// this.params.itemCityIds = item.id
				} else if (type === 'sort') {
					this.itemSortList[index].active = !this.itemSortList[index].active
					// this.params.itemSortIds = item.id
				}
				// 刷新
				this.$emit('refreshData', this.params)
				// 隐藏选择器
				this.hideSelector()
				// console.log(this.params)
			},
			// 跳转搜索页面
			openSearch () {
				this.$router.push({
					path: '/search'
				})
			},

			// 跳转消息页面
			// goMessage() {
			// 	this.$router.push({
			// 		path: '../../../../mine/message'
			// 	})
			// },

			goBack () {
				this.$router.goBack()
			},
			// 获得选中的种类
			getSelectedType () {
				if (!this.actTypeList.length) {
					return false
				}
				// console.log(this.actTypeList)
				this.actTypeList.forEach((item, index) => {
					if (item.id === this.actTypeIds) {
						this.actTypeList[index].active = true
						this.selectItem(item, index, 'act')
					}
				})
			}
		}
	}

</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './top.styl'
</style>