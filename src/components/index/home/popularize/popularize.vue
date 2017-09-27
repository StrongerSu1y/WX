<template>
	<section class="home-popularize">
		<ul class="list">
			<li v-if="themes && themes.hasOwnProperty('book')" class="list-item">
				<p class="title">{{ themes.book.title }}</p>
				<p class="sub-title">{{ themes.book.subtitle }}</p>
				<div class="media">
					<div v-for="pic in themes.book.pics" class="img-box">
						<img class="left-img" v-lazy="pic">
					</div>
				</div>
			</li>
			<li v-if="themes && themes.hasOwnProperty('goods')" class="list-item">
				<p class="title">{{ themes.goods.title }}</p>
				<p class="sub-title">{{ themes.goods.subtitle }}</p>
				<div class="media">
					<div v-for="pic in themes.goods.pics" class="img-box">
						<img class="left-img" v-lazy="pic">
					</div>
				</div>
			</li>
		</ul>
		<split></split>
		<div v-if="firstActivity" class="center">
			<p class="title">{{ firstActivity.title }}</p>
			<p class="sub-title">{{ firstActivity.subTitle }}</p>
			<div class="media-imgs" :style="{ height: winWidth }">
				<div class="top-box img-box">
					<img v-lazy="firstActivity.pics[2]">
				</div>
				<div class="middle-box img-box">
					<img v-lazy="firstActivity.pics[1]">
				</div>
				<div class="bottom-box img-box">
					<img v-lazy="firstActivity.pics[0]">
				</div>
			</div>
		</div>
		<split></split>
		<div v-if="otherActivity && otherActivity % 2 !== 0" class="center">
			<p class="title">{{ otherActivity[0].title }}</p>
			<p class="sub-title">{{ otherActivity[0].subTitle }}</p>
			<div class="media-imgs" :style="{ height: winWidth }">
				<div class="top-box img-box">
					<img v-lazy="otherActivity[0].pics[2]">
				</div>
				<div class="middle-box img-box">
					<img v-lazy="otherActivity[0].pics[1]">
				</div>
				<div class="bottom-box img-box">
					<img v-lazy="otherActivity[0].pics[0]">
				</div>
			</div>
		</div>
		<ul v-if="otherActivity && otherActivity % 2 === 0" class="list">
			<li v-for="item in otherActivity" class="list-item">
				<p class="title">{{ item.title }}</p>
				<p class="sub-title">{{ item.subTitle }}</p>
				<div class="media-imgs" :style="{ height: halfWinWidth }">
					<div class="top-box img-box">
						<img v-lazy="item.pics[2]">
					</div>
					<div class="middle-box img-box">
						<img v-lazy="item.pics[1]">
					</div>
					<div class="bottom-box img-box">
						<img v-lazy="item.pics[0]">
					</div>
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
	// let topList = [{
	// 	title: '图书推广主题名称',
	// 	subTitle: '推广主题名称副标题',
	// 	leftImg: 'http://www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png',
	// 	rightImg: 'http://www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png'
	// }, {
	// 	title: '商品推广主题名称',
	// 	subTitle: '推广主题名称副标题',
	// 	leftImg: 'http://www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png',
	// 	rightImg: 'http://www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png'
	// }]
	// let center = {
	// 	title: '活动培训推广主题名称推广主题',
	// 	subTitle: '推广主题名称副标题推广主题名称副标题推广',
	// 	imgList: [
	// 		'http://www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png',
	// 		'http://www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png',
	// 		'http://www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png'
	// 	]
	// }
	// let bottomList = [{
	// 	title: '活动培训推广主题',
	// 	subTitle: '推广主题名称副标题',
	// 	imgList: [
	// 		'http://www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png',
	// 		'http://www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png',
	// 		'http://www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png'
	// 	]
	// }, {
	// 	title: '活动培训推广主题',
	// 	subTitle: '推广主题名称副标题',
	// 	imgList: [
	// 		'http://www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png',
	// 		'http://www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png',
	// 		'http://www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png'
	// 	]
	// }]
	import split from '../../../common/split/split'
	export default {
		name: 'home-popularize',
		props: {
			themes: {
				type: Object
			}
		},
		data () {
			return {
				// topList: topList,
				// center: center,
				// bottomList: bottomList,
				winWidth: (window.innerWidth - (window.innerWidth / 375 * 20)) * 0.6 + 'px',
				halfWinWidth: (window.innerWidth / 2 - (window.innerWidth / 375 * 20)) * 0.6 + 'px'
			}
		},
		computed: {
			firstActivity () {
				if (!this.themes || !this.themes.hasOwnProperty('activities') || !this.themes.activities.length) {
					return false
				}
				return this.themes.activities[0]
			},
			otherActivity () {
				if (!this.themes || !this.themes.hasOwnProperty('activities') || this.themes.activities.length <= 1) {
					return false
				}
				return this.themes.activities.slice(1)
			}
		},
		components: {
			split
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './popularize.styl'
</style>