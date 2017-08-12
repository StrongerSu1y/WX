<template>
	<div>
		<div class="comment">
			<!-- 活动 -->
			<div v-if="entrance === entranceList[0]" class="title activity">
				<span class="text">最新评论</span>
				<span class="right-text">23</span>
				<img src="./comment_icon.png" class="comment-icon">
			</div>
			<div v-else class="title">
				<!-- <div class="img comment-icon"></div> -->
				<img src="./comment_icon.png">
				<span class="text">评论</span>
				<span class="right-text">共23条评论</span>
			</div>
			<ul class="comment-list">
				<li v-for="(item, index) in commentList" v-if="index < commentShowThreshold" class="list-item">
					<div class="avatar" :class="{ round: entrance === entranceList[0] }">
						<img :src="item.url">
					</div>
					<div class="content">
						<div v-if="entrance !== entranceList[0]" class="level">
							<img v-for="star in levels" :src="getLevel(item.starLevel, star)">
						</div>
						<div v-if="entrance === entranceList[0]" class="name" :class="{ activity: entrance === entranceList[0] }">
							<span>谁家陌上青年狼</span>
							<span class="right-text">点赞<span class="c999999">({{ item.likes }})</span></span>
							<img src="./like_icon.png" class="comment-icon">
						</div>
						<div v-else class="name">洛可可</div>
						<div v-if="entrance !== entranceList[0]" class="time">
							2016-05-18 12:36:50
						</div>
						<div class="text">
							评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容。
						</div>
						<div class="photos">
							<div class="item">
								<img :src="imgList[0].url">
							</div>
							<div class="split"></div>
							<div class="item">
								<img :src="imgList[1].url">
							</div>
							<div class="split"></div>
							<div class="item">
								<img :src="imgList[2].url">
							</div>
						</div>
						<div v-if="entrance === entranceList[0]" class="bottom">
							<div class="location">
								<img src="./comment_location.png">
								<span class="">杭州</span>
							</div>
							<div class="times">
								<img src="./time.png">
								<span class="">{{ getReplyTime(item.time) }}前</span>
							</div>
							<div class="reply">
								<img src="./reply.png">
								<span class="">回复({{ item.reply }})</span>
							</div>
							<div class="deletes">
								<img src="./delete.png">
								<span class="delete-text">删除</span>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="show-all" :class="{ activity: entrance === entranceList[0]}" style="margin-top: 0.2rem" v-if="holdOn" @click="showMore('comment')">
			<span class="text" :class="{ down: entrance !== entranceList[0]}" v-show="!commentUnfold">查看所有评论</span>
			<span class="text" :class="{ up: entrance !== entranceList[0]}" v-show="commentUnfold">收起</span>
		</div>
	</div>
</template>

<script>
	let commentList = []
	let starSrc = `star.png`
	let starActiveSrc = `star_active.png`
	for (var j = 0; j < 6; j++) {
		commentList.push({
			url: `book.jpg`,
			starLevel: 4,
			likes: 5,
			time: 1,
			reply: 6
		})
	}
	export default {
		name: 'comment',
		props: ['entrance'],
		data () {
			return {
				commentList: commentList,
				commentThreshold: 3, // 评论阈值
				commentShowThreshold: 3, // 评论显示阈值
				commentUnfold: false, // 评论是否展开
				imgList: [{
					url: `book.jpg`
				}, {
					url: `book.jpg`
				}, {
					url: `book.jpg`
				}],
				levels: [1, 2, 3, 4, 5],
				entranceList: ['activity'],
				// 点赞图标
				likeIconSrc: `like_icon.png`,
				// 评论定位
				commentLocationSrc: `comment_location.png`,
				// 时间
				timeSrc: `time.png`,
				// 回复
				replySrc: `reply.png`,
				// 删除
				deleteSrc: `delete.png`
			}
		},
		computed: {
			holdOn () {
				return this.commentList.length > this.commentThreshold
			},
			// 评论图标
			commentSrc () {
				if (this.entrance === this.entranceList[0]) {
					return `comment_logo.png`
				} else {
					return `comment_icon.png`
				}
			}
		},
		methods: {
			showMore (entrance) {
				this[entrance + 'Unfold'] = !this[entrance + 'Unfold']
				if (this[entrance + 'Unfold']) {
					this[entrance + 'ShowThreshold'] = this[entrance + 'List'].length
				} else {
					this[entrance + 'ShowThreshold'] = this[entrance + 'Threshold']
				}
			},
			getLevel (num, index) {
				return num >= index ? starActiveSrc : starSrc
			},
			getReplyTime (time) {
				if (time < 60) {
					return time + '分钟'
				} else if (time < 60 * 24) {
					return Math.floor(time / 60) + '小时'
				} else {
					return Math.floor(time / (60 * 24)) + '天'
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './comment.styl'
</style>