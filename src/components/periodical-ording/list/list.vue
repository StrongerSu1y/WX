<template>
	<div class="ording-list">
		<ul class="list">
			<scroller class="scroller" :on-refresh="refresh" :on-infinite="loadMore" ref="myscroller">
				<li v-for="(item, index) in listData" class="list-item underline" @click="showDetail(index)">
					<div class="left-media">
						<img v-lazy="item.logo">
					</div>
					<div class="right-part">
						<div class="box">
							<p class="title">{{ item.name || '' }}</p>
							<div v-if="item.gift_name.length" class="desc">
								<img src="./gift_icon.png">
								<p class="text">{{ item.gift_name || '' }}</p>
							</div>
							<p class="time">
								<span class="text">{{ item.fee_unit || '' }}</span>
							</p>
							<div class="bottom" @click.prevent.stop="">
								<p class="price">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getDecimal }}元</p>
								<v-cartControl :index="index" :num="item.number"></v-cartControl>
							</div>
						</div>
					</div>
				</li>
			</scroller>
		</ul>
	</div>
</template>

<script>
	import cartControl from '../cartControl/cartControl'
	import Vue from 'vue'
	import VueScroller from 'vue-scroller'
	Vue.use(VueScroller)
	export default {
		name: 'publish',
		props: ['listData'],
		data () {
			return {}
		},
		created () {
		},
		methods: {
			// 显示详情
			showDetail (index) {
				this.$router.push({
					path: 'ording/detail',
					query: {
						info: JSON.stringify(this.listData[index]),
						index: index
					}
				})
			},
			// 刷新
			refresh () {
				this.$root.Bus.$emit('refresh')
			},
			// 加载更多
			loadMore () {
				this.$emit('loadMore')
				setTimeout(() => {
					console.log(this.$refs.myscroller)
					this.$refs.myscroller.finishPullToRefresh()
				}, 3000)
			},
			// 结束刷新
			finishPullToRefresh () {
				setTimeout(() => {
					this.$refs.myscroller.finishPullToRefresh()
				}, 300)
			}
		},
		components: {
			'v-cartControl': cartControl
		}
	}
</script>

<style lang="stylus" res="stylesheet/stylus">
	@import './list.styl'
</style>