<template>
		<!-- 活动列表 -->
		<ul class="activity-list">
			<li class="list-item activity-item clearFix" @click.prevent.stop="openDetail(item.id)" v-for="(item, index) in itemList">
				<div class="itemContain">
					<div class="activity-media">
						<img v-lazy="item.logo">
					</div>
					<div class="list-right">
						<div class="activity-name">{{ item.title }}</div>
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
</template>

<script>
	export default {
		name: 'searchList',
		// props: {
		// 	listData: {
		// 		type: Array
		// 	}
		// },
		data () {
			return {
				itemList: []
			}
		},
		methods: {
			// 获取活动列表
			getActList () {
				let params = {
					lat: '39',
					lng: '116',
					city_id: '3501',
					cls: '14'
				}
				this.$ajax.activityList(params).then(res => {
					console.log(res)
				}, err => {
					console.log(err)
				})
			},
			openDetail (id) {
				this.$router.push({
					path: '../../activity/detail',
					query: {
						id: id
					}
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './list.styl'
</style>