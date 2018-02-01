<template>
	<section class="hotAct">
		<p class="hotAct-title">
			<img src="./hot_icon.png">
			<span class="text">热门活动</span>
		</p>
		<!-- 活动列表 -->
		<ul class="activity-list">
			<li class="list-item activity-item clearFix" @click.prevent.stop="openDetail(item.id)" v-for="(item, index) in itemList">
				<div class="itemContain">
					<div class="activity-media">
						<img v-lazy="item.logo">
					</div>
					<div class="list-right">
						<div class="activity-name">{{ item.title }}</div>
						<!-- <span class="activity-time">{{ item.begin_time | getUpdateDay }} 开始</span> -->
						<span class="activity-time">{{ item.begin_time | getUpdateDay }} 开始</span>
						<p v-if="item.min_fee == '0.0'" class="free">免费</p>
						<p v-else class="price">
	    			<span class="num">￥
	    				<span class="big">{{ item.min_fee | getInteger }}</span>
	    			{{ item.min_fee | getDecimal }} 起
	    			</span>
	    		</p>
					</div>
<!-- 					<div class="distance">
						<span>{{ item.distance | getDistance }}千米</span>
					</div> -->
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
	export default {
		name: 'hotAct',
		props: {
			itemList: {
				type: Array
			},
			id: {
				type: String
			}
		},
		data () {
			return {
				// listData: [],
			}
		},
		computed: {
		},
		methods: {
			// 加载数据
			getData () {
				console.log(this.itemList)
			},
			// 打开详情
			openDatail () {
				this.$router.push({
					path: './datail/actdetail',
					query: {
						id: id
					}
				})
			}
		},
		components: {
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './hotAct.styl'
</style>