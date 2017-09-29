<template>
	<div class="periodical-detail">
		<section class="header">
			<div v-if="listImg.length > 1" class="banner underline">
				<v-banner :listImg="listImg" :style="{ height: bannerHeight }"></v-banner>
			</div>
			<div class="content underline">
				<p class="title">{{ info.name }}</p>
				<p class="suggest">
					<!-- <span v-if="info.fee_unit" :class="{ borderRight: info.age_id }" class="times">{{ info.fee_unit }}</span> -->
					<span v-if="info.fee_unit" class="times">{{ info.fee_unit }}</span>
					<span v-if="info.age_id" class="grade">{{ info.age_id }}岁适读</span>
				</p>
				<p class="carriage">
					<span>运费: </span>
					<span class="carriage-price">{{ info.delivery_fee || '满99包邮' }}</span>
				</p>
				<p class="price">
					<span class="new">￥<span class="big">{{ info.last_fee | getInteger }}</span>{{ info.last_fee | getDecimal }}</span>
					<!-- <span class="old">￥{{ info.original_fee | getInteger }}</span> -->
				</p>
				<v-cartControl ref="cartcontrol" :index="index" :num="localNumber" class="cart"></v-cartControl>
			</div>
		</section>
		<section class="main">
			<div v-if="info.gift_name.length" class="gift">
				<div class="img">
					<img src="./gift_icon.png">
				</div>
				<div class="text">{{ info.gift_name }}</div>
			</div>
			<div v-if="info.gift_name.length" class="photo">
				<img :src="info.gift_logo">
			</div>
			<split></split>
			<div class="content" ref="content" v-html="info.html"></div>
		</section>
	</div>
</template>

<script>
	import banner from '../../common/banner/banner'
	import cartControl from '../cartControl/cartControl'
	import split from '../../common/split/split'
	import {extendObj} from '../../../common/js/common.js'
	export default {
		name: 'publish',
		props: ['listData'],
		data () {
			return {
				bannerHeight: window.innerWidth * 0.6 + 'px',
				info: JSON.parse(this.$route.query.info),
				index: parseInt(this.$route.query.index)
			}
		},
		computed: {
			localNumber () {
				if (this.listData && this.listData.length) {
					return this.listData[this.index].number
				}
				return 0
			},
			listImg () {
				if (!this.info.detail_img.length) {
					return [{
						url: '//www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png'
					}]
				}
				let list = []
				this.info.detail_img.forEach(item => {
					// let image = new Image()
					// image.src = item
					// image.display = 'none'
					// let width = image.width
					// let height = image.height
					// let winWidth = window.innerWidth
					// if (width > winWidth || height > winWidth) {
					// 	let resize = width > height ? width / winWidth : height / winWidth
					// 	width = width / resize
					// 	height = height / resize
					// }
					list.push({
						url: item
						// backgroundSize: `${width}px ${height}px`
					})
				})
				return list
			}
		},
		mounted () {
			// this.$refs.cartcontrol.num = this.info.number
			// console.log(this.localNumber)
			document.title = '详情'
			this.getData()
		},
		methods: {
			getData () {
				let id = this.info.id
				this.$ajax.getAjax(`/book/${id}/open`)
					.then(res => {
						this.info = extendObj(this.info, res.data.book)
						// console.log(this.info)
						this.$refs.content.innerHTML = this.info.html
					})
			}
		},
		components: {
			'v-banner': banner,
			'v-cartControl': cartControl,
			split
		},
		filters: {
			getInteger (num) {
				return Math.floor(num)
			},
			getDecimal (num) {
				return parseFloat(num - Math.floor(num)).toFixed(2).substr(1)
			}
		}
	}
</script>

<style lang="stylus" res="stylesheet/stylus">
	@import './detail.styl'
</style>