<template>
	<div>
		<v-header :activity="true" :isCollected="false"></v-header>
		<v-link v-if="linkShow" @close-link="closeLink()"></v-link>
		<v-content :info="info" :activity="true">
			<div slot="desc" class="desc activity">
				<div class="title">
					<span class="age">{{ info.age }}</span>
					<span v-if="info.ishot" class="hot">热</span>
					<div class="time">
						<img src="./time.png">
						<span class="text">{{ publish }}发布</span>
					</div>
				</div>
				<div class="text">
					{{ info.content }}
				</div>
				<div class="price">
					￥<span class="num">{{ info.min_fee }}</span>元起
				</div>
			</div>
		</v-content>
		<split></split>
		<div class="comment-area">
			<v-comment :entrance="entrance"></v-comment>
		</div>
		<split></split>
		<split></split>
		<split></split>
		<split></split>
		<split></split>
		<split></split>
		<v-shopcat :activity="true" :id="id" @go-apply="goApply()"></v-shopcat>
	</div>
</template>

<script>
	import header from '../header/header'
	import link from '../common/link'
	import shopcat from '../shopcat/shopcat'
	import content from '../content/content'
	import comment from '../comment/comment'
	import split from '../split/split'
	import {getUpdateDay} from '../../common/js/date.js'
	import {getQueryString} from '../../common/js/date'
	export default {
		name: 'activity',
		data () {
			return {
				title: '活动名称',
				entrance: 'activity',
				id: getQueryString('id'),
				cls: getQueryString('cls'),
				linkShow: true,
				info: {}
			}
		},
		computed: {
			publish () {
				// return this.info.updated_at
				return getUpdateDay(this.info.updated_at)
			}
		},
		mounted () {
			this.$ajax({
				method: 'post',
				url: '/activity/activityDetil',
				data: {
					id: this.id,
					cls: this.cls
				}
			})
			.then((res) => {
				let data = res.data.data
				data.begin_time = getUpdateDay(data.begin_time)
				data.end_time = getUpdateDay(data.end_time)
				data.business_list = JSON.parse(data.business_list)
				this.info = data
			})
			.catch((err) => {
				console.log('error: ' + err)
			})
		},
		methods: {
			getUpdateDay (time) {
				return getUpdateDay(time)
			},
			// 关闭link
			closeLink () {
				this.linkShow = false
			},
			// 立即报名
			goApply () {
				this.$router.push({
					path: '/apply/choose',
					query: {
						id: this.id,
						is_realname: this.info.is_realname
					}
				})
			}
		},
		components: {
			'v-header': header,
			'v-link': link,
			'v-content': content,
			'v-comment': comment,
			split,
			'v-shopcat': shopcat
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './activity.styl'
</style>