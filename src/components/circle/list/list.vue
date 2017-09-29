<template>
	<ul class="circle-list">
		<li v-for="item in listData" class="list-item">
			<!-- 标题 -->
			<p class="title">
				<span class="text">{{ item.title }}</span>
				<span v-if="parseInt(item.is_best)" class="color-label c00b7ee">精</span>
				<span v-if="parseInt(item.img_quantity)" class="color-label c3fc97d">图</span>
				<!-- <span class="color-label cf7996c">热</span> -->
			</p>
			<!-- 图片 -->
			<ul v-if="parseInt(item.img_quantity)" class="media-list">
				<li v-for="img in item.imgList" ref="listImg" :style="getImgStyle(item.imgList.length)" class="img-item">
					<img v-lazy="img">
				</li>
			</ul>
			<!-- 底部 -->
			<div class="bottom">
				<div class="left-part">
					<div class="comment item">
						<img src="./comment_icon.png">
						<span class="count">{{ item.comment_count }}</span>
					</div>
					<div class="like item">
						<img src="./like_icon.png">
						<span class="count">{{ item.zan_count }}</span>
					</div>
					<div class="time item">
						<img src="./time_icon.png">
						<span class="count">{{ item.created_at | getPastTimeText }}前</span>
					</div>
				</div>
				<div class="right-part">
					<img class="avatar" v-lazy="item.user_avatar">
					<span class="name">{{ item.user_name }}</span>
				</div>
			</div>
			<!-- 其他 -->
			<div class="other">
				<span class="other-label attention">
					<span v-if="item.attention" class="flag">已</span>关注
				</span>
				<span class="other-label type">
					{{ item.channel_name }}
				</span>
			</div>
		</li>
	</ul>
</template>

<script>
	export default {
		name: 'circle-list',
		props: {
			listData: {
				type: Array
			}
		},
		data () {
			return {}
		},
		methods: {
			// 获取图片高度 style 对象
			getImgStyle (length) {
				let resize = window.innerWidth / 375
				let ip6Width = ((375 - 20) - (length - 1) * 5) / length
				return {
					height: ip6Width * 0.6 * resize + 'px',
					lineHeight: ip6Width * 0.6 * resize + 'px'
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './list.styl'
</style>