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
			<!-- <div v-for="(type, index) in typeDatas" class="tab-item" @click="changeType(index)">
				<div class="box">
					<span class="text">{{ type }}</span>
					<span class="arrow" :class="{ up: !fold && typeIndex === index }"></span> 
				</div>
			</div> -->
			<div class="tab-item" @click="changeType(index)">
				<div class="box">
					<span class="text">活动分类</span>
					<span class="arrow" :class="{ up: !fold && typeIndex === index }"></span> 
				</div>
			</div>
			<div class="tab-item" @click="changeType(index)">
				<div class="box">
					<span class="text">地区</span>
					<span class="arrow" :class="{ up: !fold && typeIndex === index }"></span> 
				</div>
			</div>
			<div class="tab-item" @click="changeType(index)">
				<div class="box">
					<span class="text">全年龄段</span>
					<span class="arrow" :class="{ up: !fold && typeIndex === index }"></span> 
				</div>
			</div>
			<div class="tab-item" @click="changeType(index)">
				<div class="box">
					<span class="text">发布时间</span>
					<span class="arrow" :class="{ up: !fold && typeIndex === index }"></span> 
				</div>
			</div>
		</section>
		<!-- 下拉分类 -->
		<section class="select-box">
			<transition-group enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
				<!-- 活动种类 -->
				<section :key="'type0'" v-show="typeIndex === 0 && !fold" class="selcet-area">
					<ul class="select-row">
						<li v-for="(item, index) in actTypeList" class="select-col" @click="selectItem(item, index, 'act')">
							<span :class="{ active: item.active }" class="select-item">{{ item.name }}</span>
						</li>
					</ul>
					<footer class="select-footer">
						<div class="reset" @click="doReset('act')">重置</div>
						<div class="confirm" @click="doConfirm('act')">确定</div>
					</footer>
				</section>
				<!-- 地区列表 -->
				<section :key="'type1'" v-show="typeIndex === 1 && !fold" class="selcet-area">
					<ul class="select-row">
						<li v-for="(item, index) in actCityList" class="select-col" @click="selectItem(item, index, 'city')">
							<span :class="{ active: item.active }" class="select-item">{{ item.name }}</span>
						</li>
						<!-- 静态数据 -->
						<!-- <li class="selcet-col" @click="selectItem(item, index, 'city')">
							<span class="select-item">直属市</span>
						</li>
						<li class="selcet-col">
							<span class="select-item">上城区</span>
						</li>
						<li class="selcet-col">
							<span class="select-item">下城区</span>
						</li> -->
					</ul>
					<footer class="select-footer">
						<div class="reset" @click="doReset('city')">重置</div>
						<div class="confirm" @click="doConfirm('city')">确定</div>
					</footer>
				</section>
				<!-- 年龄段 -->
				<section :key="'type2'" v-show="typeIndex === 2 && !fold" class="selcet-area">
					<ul class="select-row">
						<li class="selcet-col" v-for="(item, index) in itemAgeList" @click="selectItem(item, index, 'age')">
							<span class="select-item" :class="{ active: item.active }">{{ item.name }}</span>
						</li>
					</ul>
					<footer class="select-footer">
						<div class="reset" @click="doReset('age')">重置</div>
						<div class="confirm" @click="doConfirm('age')">确定</div>
					</footer>
				</section>
				<!-- 分类排序 -->
				<section :key="'type3'" v-show="typeIndex === 3 && !fold" class="selcet-area">
					<ul class="select-row">
						<li class="selcet-col" v-for="(item, index) in itemSortList" @click="selectItem(item, index, 'sort')">
							<span class="select-item" :class="{ active: item.active }">{{ item.name }}</span>
						</li>
					</ul>
					<footer class="select-footer">
						<div class="reset" @click="doReset('sort')">重置</div>
						<div class="confirm" @click="doConfirm('sort')">确定</div>
					</footer>
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
			id: {
				type: String
			}
		},
		data () {
			return {
				arrowUp: false,
				keyword: '',
				typeIndex: -1,
				// 类别数据
				actTypeList: [
					{
						name : "全部"
					},{
						name : "亲子活动"
					},{
						name : "校园活动"
					}
				],
				// 地区数据
				actCityList: [
					{
						name : "上城区"
					},{
						name : "下城区"
					},{
						name : "拱墅区"
					}
				],
				// 年龄数据
				itemAgeList: [
					{
						name : "0~3岁"
					},{
						name : "3~6岁"
					},{
						name : "6~12岁"
					}
				],
				// 排序方式
				itemSortList: [],
				// 收起菜单
				fold: true,
				// 消息
				messageList: []
			}
		},
		computed: {
			// tab栏数据
			 typeDatas () {
			 	let list = []
			 	list.push(this.getSelectedStr(this.selectedActType) || '活动类别')
			 	list.push(this.getSelectedStr(this.selectedActCity) || '地区')
			 	list.push(this.getSelectedStr(this.selectedAge) || '年龄')
			 	list.push(this.getSelectedStr(this.selectedSort) || '排序')
			 },

			 // 选中的活动种类
			 selectedActType () {
			 	if (!this.actTypeList) {
			 		return []
			 	}
			 	let arr = []
			 	this.actTypeList.forEach(item => {
			 		if (item.active) {
			 			arr.push(item)
			 		}
			 	})
			 	return arr
			 },
			 // 选中的活动地区
			 selectedActCity () {
			 	if (!this.actCityList) {
			 		return []
			 	}
			 	let arr = []
			 	this.actCityList.forEach(item => {
			 		if(item.active) {
			 			arr.push(item)
			 		}
			 	})
			 	return arr
			 },
			 // 选中的年龄段
			 selectedAge () {
			 	if (!this.itemAgeList) {
			 		return []
			 	}
			 	let arr = []
			 	this.itemAgeList.forEach(item => {
			 		if (item.active) {
			 			arr.push(item)
			 		}
			 	})
			 	return arr
			 },
			 // 选中的排序方式
			 selectedSort () {
			 	if (!this.itemSortList) {
			 		return []
			 	}
			 	let arr = []
			 	this.itemSortList.forEach(item => {
			 		if (item.active) {
			 			arr.push(item)
			 		}
			 	})
			 	return arr
			 }
		},
		created () {
			this.loadData()
		},
		mounted () {
			// 获取被选中的种类
			this.getSelectedType()
		},
		methods: {
			loadData () {
				// 活动种类列表
				this.$ajax.bookConstant().then(res => {
					let actTypeList = res.data.bookTypeList
					actTypeList.forEach(item => {
						item.active = false
					})
					let itemAgeList = res.data.itemAgeList
					itemAgeList.forEach(item => {
						item.active = false
					})
					this.actTypeList = actTypeList
					this.itemAgeList = itemAgeList
					// 获取选中的图书类型
					this.getSelectedType()
				}, err => {
					console.log(err)
				})
			},
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
			// 选中字段
			getSelectedStr (arr) {
				let str = ''
				if (!arr.length) {
					return ''
				}
				arr.forEach(item => {
					if (item.active) {
						str += item.name + ','
					}
				})
				return str ? str.subStr(0, str.length - 1) : ''
			},
			// 选中当前选项
			selectItem (item, index, type) {
				if (type === 'act') {
					this.actTypeList[index].active = !this.bookTypeList[index].active
				} else if (type === 'age') {
					this.itemAgeList[index].active = !this.itemAgeList[index].active
				} else if (type === 'city') {
					this.actCityList[index].active = !this.actCityList[index].active
				} else if (type === 'sort') {
					this.itemSortList[index].active = !this.itemSortList[index].active
				}
			},

			// 重置选项
			doReset (type) {
				if (type === 'act') {
					this.actTypeList.forEach(item => {
						item.active = false
					})
					this.$emit('reset')
				}
				if (type === 'city') {
					this.actCityList.forEach(item => {
						item.active = false
					})
					this.$emit('reset')
				}
				if (type === 'age') {
					this.itemAgeList.forEach(item => {
						item.active = false
					})
				}
				if (type === 'sort') {
					this.itemSortList.forEach(item => {
						item.active = false
					})
					this.$emit('reset')
				}
			},

			// 确定选中
			doConfirm (type) {
				// if (type === 'act') {
				// 	this.params.actTypeIds = getWithCommaString(this.selectedActType, 'id')
				// }
				if (type === 'age') {
					this.params.itemAgeIds = getWithCommaString(this.selectedAge, 'id')
				}
				if (type === 'city') {
					this.params.itemCityIds = getWithCommaString(this.selectedActCity,'id')
				}
				if (type === 'sort') {
					this.params.itemSortIds = getWithCommaString(this.selectedSort,'id')
				}
				// 刷新
				this.$emit('refreshData', this.params)
				// 隐藏选择器
				this.hideSelector()
			},
			// 跳转搜索页面
			openSearch () {
				this.$router.push({
					path: './search'
				})
			},

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
					if (item.id === this.id) {
						this.actTypeList[index].active = true
						this.doConfirm('act')
					}
				})
			}
		}
	}

</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './top.styl'
</style>