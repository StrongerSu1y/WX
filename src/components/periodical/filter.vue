<template>
	<div>
		<v-header :period="true"></v-header>
		<div class="tab">
			<div class="item" @click="changeTabIndex(0)">
				<div class="text area">
					{{ areaText }}
				</div>
			</div>
			<div class="item" @click="changeTabIndex(1)">
				<div class="text">
					筛选
				</div>
			</div>
		</div>
		<split></split>
		<component v-if="holdon" @selectArea="getArea" :is="tabView"></component>
	</div>
</template>

<script>
	import header from '../header/header'
	import split from '../common/split/split'
	import area from './area'
	import screen from './screen'
	export default {
		name: 'filter',
		data () {
			return {
				showIndex: -1,
				holdon: false,
				tabList: ['v-area', 'screen'],
				areaText: '选择地区'
			}
		},
		computed: {
			tabView () {
				return this.tabList[this.showIndex]
			}
		},
		methods: {
			getArea (msg) {
				this.showIndex = -1
				this.holdon = false
				this.areaText = msg
			},
			// 切换
			changeTabIndex (index) {
				if (this.showIndex >= 0 && this.showIndex !== index) {
					this.holdon = true
				} else {
					this.holdon = !this.holdon
				}
				this.showIndex = index
			}
		},
		components: {
			'v-header': header,
			split,
			'v-area': area,
			screen
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './filter.styl'
</style>