<template>
	<ul class="activity-list">
		<!-- <li v-for="(item, index) in listData" class="list-item underline activity-item" @click.prevent.stop="openDetail(item.id)">
			<div class="activity-media">
				<img v-lazy="item.logo">
			</div>
			<p class="activity-name">{{ item.title }}</p>
			<div class="activity-bottom">
				<span>活动时间：{{ item.begin_time | getUpdateDay }}至{{ item.end_time | getUpdateDay }}</span>
			</div>
		</li> -->

		<li class="list-item activity-item clearFix" @click="openDetail()">
			<div class="itemContain">
				<div class="activity-media">
					<img src="./hotact1.png">
				</div>
				<div class="list-right">
					<div class="activity-name">活动名称活动名称活动名称活动名称活动名称活动名称</div>
					<span class="activity-time">10月1日9:20:10开始</span>
					<p>￥100.00免费</p>
				</div>
			</div>
		</li>
		<li class="list-item underline activity-item clearFix">
			<div class="itemContain">
				<div class="activity-media">
					<img src="./hotact2.png">
				</div>
				<div class="list-right">
					<div class="activity-name">活动名称活动名称活动名称活动名称活动名称活动名称</div>
					<span class="activity-time">10月1日9:20:10开始</span>
					<p>￥100.00起</p>
				</div>
			</div>
		</li>
		<li class="list-item underline activity-item clearFix">
			<div class="itemContain">
				<div class="activity-media">
					<img src="./hotact1.png">
				</div>
				<div class="list-right">
					<div class="activity-name">活动名称活动名称活动名称活动名称活动名称活动名称</div>
					<span class="activity-time">10月1日9:20:10开始</span>
					<p>￥100.00免费</p>
				</div>
			</div>
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'actList',
		props: {
			listData: {
				type: Array
			}
		},
		data () {
			return {}
		},
		methods: {
			// 查看详情
			openDetail () {
				this.$router.push({
					path: '../../../../pages/activity/detail',
					query: {
						// id: id
					}
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './actList.styl'
</style>