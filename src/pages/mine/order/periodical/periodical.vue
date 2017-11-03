<template>
	<div class="mine-periodical">
		<v-top :title="title"></v-top>
		<v-nav :navIndex="navIndex" @changeNavIndex="changeNavIndex"></v-nav>
		<transition-group enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">
			<component :key="navIndex" :is="nowContent" :listData="nowListData"></component>
		</transition-group>
		<!-- <v-list :listData="listData" v-if="listData && listData.length" @addTabIndex="addTabIndex"></v-list> -->
	</div>
</template>

<script>
	let listData = [{
		text: '',
		status: '待付款',
		orderId: '111111111',
		numbers: 3,
		complete: false,
		price: '100.00',
		buttonText: '去付款'
	}, {
		text: '',
		status: '待付款',
		orderId: '111111111',
		numbers: 3,
		complete: false,
		price: '100.00',
		buttonText: ''
	}, {
		text: '',
		status: '待付款',
		orderId: '2222222',
		numbers: 5,
		complete: true,
		price: '222.00',
		buttonText: '去评价'
	}]
	import top from '../top/top'
	import nav from '../nav/nav'
	import list from './list/list'
	export default {
		data () {
			return {
				title: '刊物',
				navIndex: 0,
				listData: listData,
				contentList: ['v-list', 'v-list', 'v-list', 'v-list', 'v-list']
			}
		},
		computed: {
			nowListData () {
				return this.listData.slice(this.navIndex, this.navIndex + 1)
			},
			nowContent () {
				return this.contentList[this.navIndex]
			}
		},
		methods: {
			changeNavIndex (index) {
				this.navIndex = index
			},
			addTabIndex (num) {
				let index = this.navIndex + num
				if (index >= 4 || index <= 0) {
					return false
				}
				this.navIndex = index
			}
		},
		components: {
			'v-top': top,
			'v-nav': nav,
			'v-list': list
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './periodical.styl'
</style>