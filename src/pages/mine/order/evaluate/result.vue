<template>
	<div class="mine-order-evaluate">
		<!-- 头部 -->
		<section class="mine-order-evaluate-top underline">
			<div class="back-icon" @click="goBack()">
				<img src="./back_icon.png">
			</div>
			<p class="title">评价</p>
		</section>
		<!-- 感谢 -->
		<section class="thank-box">
			感谢您的评价!
		</section>
		<!-- 积分赠送遮罩 -->
		<section v-if="maskShow" class="mask">
			<transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
					<div v-if="giftContentShow" class="dialog-box" @click="hideMask()">
						<p class="integral">
							<span class="number">100</span>
							<span class="text">积分</span>
						</p>
						<p class="desc-text">来自五星好评</p>
						<div class="stars">
							<img src="./dialog_star.png">
							<img src="./dialog_star.png">
							<img src="./dialog_star.png">
							<img src="./dialog_star.png">
							<img src="./dialog_star.png">
						</div>
					</div>
			</transition>
		</section>
		<!-- 猜您喜欢 -->
		<v-recommend :recommendList="recommendList"></v-recommend>
	</div>
</template>

<script>
	import recommend from '@/pages/book/recommend/recommend'
	export default {
		data () {
			return {
				maskShow: false,
				giftContentShow: false,
				recommendList: []
			}
		},
		computed: {
			params () {
				let params = {}
				params.id = this.$route.query.id
				params.cls = this.$route.query.cls
				return params
			}
		},
		created () {
			// 加载数据
			this.loadData()
		},
		mounted () {
			this.$nextTick(() => {
				if (this.$route.query.score === 5) {
					setTimeout(() => {
						this.maskShow = true
						setTimeout(() => {
							this.giftContentShow = true
						}, 300)
					}, 300)
				}
			})
		},
		methods: {
			// 加载数据
			loadData () {
				this.$ajax.tradeDetail(this.params).then(res => {
					console.log(res)
					this.recommendList = res.data.recommendList
				}, err => {
					console.log(err)
				})
			},
			// 返回上一页
			goBack () {
				this.$router.go(-2)
			},
			// 隐藏遮罩
			hideMask () {
				this.maskShow = false
			}
		},
		components: {
			'v-recommend': recommend
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './evaluate.styl'
</style>