<template>
	<div class="book-detail-product">
		<!-- scroll 外层容器 -->
		<div ref="wrapper" class="wrapper" :style="{ height: winHeight }">
			<!-- 内容 -->
			<section ref="content" class="content">
				<!-- 轮播图 -->
				<v-banner :style="{ height: bannerHeight }" :listImg="listImg" class="banner"></v-banner>
				<!-- 主要信息 -->
				<section class="main">
					<p class="name">
	    			<span class="text">{{ item.name }}&nbsp;</span>
	    			<span v-if="item.hardcover === '1'" class="package">精装</span>
	    			<span v-if="item.hardcover === '0'" class="package">平装</span>
	    		</p>
	    		<p class="age">
	    			适度年龄({{ item.age_id }}儿童)
	    		</p>
	    		<p class="price">
	    			<span class="num">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getDecimal }}</span>
	    			<span class="discount">({{ item.discount }}折)</span>
	    		</p>
	    		<p class="origin-price">
	    			原价：¥{{ item.original_fee }}
	    		</p>
	    		<p class="integral">
	    			<img src="./integral_icon.png">
	    			<span class="text">100积分=0.10元 (最多可用500积分)</span>
	    		</p>
				</section>
				<!-- 运费及销量 -->
				<section class="carriage-sales">
					<div>
						<p class="carriage">
							<span class="text-label">运费：</span>
							<span class="text">免运费</span>
						</p>
					</div>
					<div>
						<p class="sales">
							<span class="text-label">全网销量：</span>
							<span class="text">{{ item.sale_quantity }}</span>
						</p>
					</div>
				</section>
				<split :height="'8'"></split>
				<!-- 公司 -->
				<section class="company">
					<div class="left-part">
						<img src="./company_icon.png">
						<span>由微校网发货&售后</span>
					</div>
					<div class="center-part">
						<img src="./security_icon.png">
						<span>交易保障</span>
					</div>
					<div class="right-part">
						<img src="./authentication_icon.png">
						<span>企业认证</span>
					</div>
				</section>
				<split :height="'8'"></split>
				<!-- 链接 -->
				<ul class="link-list">
					<li class="link-item">
						<span class="text">商品详情</span>
						<img src="./right-arrow.png">
					</li>
					<li class="link-item">
						<span class="text">内容目录</span>
						<img src="./right-arrow.png">
					</li>
					<li class="link-item">
						<span class="text">出版信息</span>
						<img src="./right-arrow.png">
					</li>
				</ul>
				<split :height="'8'"></split>
				<!-- 礼物 -->
				<section class="gift-box">
					<div v-if="item.gift_logo || item.gift_name" class="gift">
						<div class="img">
							<img src="./gift_icon.png">
						</div>
						<div class="text">赠送:{{ item.gift_name }}</div>
					</div>
					<div v-if="item.gift_logo && item.gift_logo.length" class="photo">
						<img :src="item.gift_logo">
					</div>
				</section>
				<split :height="'8'"></split>
				<p v-if="item.commentList && item.commentList.length" class="comment-title">
					商品评价 ({{ commentTotal }})
				</p>
				<v-comment v-if="item.commentList && item.commentList.length" :commentList="item.commentList" @totalComment="totalComment"></v-comment>
				<!-- 查看全部评价 -->
				<div class="view-comment" @click.prevent.stop="showAllComment()">
					<span class="comment-button">查看全部评价</span>
				</div>
				<!-- 拖动查看详情 -->
				<div class="touch-view">
					<span class="text">继续拖动 查看详情</span>
					<img src="./touch_up.png">
				</div>
			</section>
			<!-- <section class="bottom-block" style="position: fixed; width: 100%; bottom: 0; left: 0; height: 50px; background: #f8f7f6;" v-if="canGoComment"></section> -->
		</div>
	</div>
</template>

<script>
	import banner from '@/components/common/banner/banner'
	import split from '@/components/common/split/split'
	import comment from '../comment/comment'
	import BScroll from 'better-scroll'
	export default {
		name: 'book-detail-product',
		props: {
			item: {
				type: Object
			}
		},
		data () {
			return {
				bannerHeight: window.innerWidth + 'px',
				// 屏幕高度
				winHeight: window.innerHeight + 'px',
				commentTruthTotal: 0,
				scroller: '',
				scrollTop: 0,
				// 可以上拉跳转
				canGoComment: false
			}
		},
		computed: {
			listImg () {
				if (!this.item.detail_img) {
					return []
				}
				let arr = []
				this.item.detail_img.forEach(item => {
					arr.push({
						url: item
					})
				})
				return arr
			},
			commentTotal () {
				if (this.item && this.item.commentList && this.item.commentList.length) {
					if (this.commentTruthTotal) {
						return this.commentTruthTotal
					}
					return this.item.commentList.length
				}
			}
		},
		components: {
			'v-banner': banner,
			split,
			'v-comment': comment
		},
		watch: {
			scrollTop (newVal, oldVal) {
				let nowHeight = newVal + parseInt(window.innerHeight, 10) - 50
				let goLine = parseInt(this.$refs.content.offsetHeight, 10) + 20
				if (nowHeight > goLine - 50) {
					setTimeout(() => {
						this.canGoComment = true
					}, 1500)
				} else {
					this.canGoComment = false
				}
				if (nowHeight > goLine) {
					if (this.canGoComment) {
						// 查看评价
						this.showAllComment()
					}
				}
			},
			item (newVal, oldVal) {
				this.$nextTick(() => {
					setTimeout(() => {
						this.initBetterScroll()
					}, 20)
				})
			}
		},
		created () {
		},
		mounted () {
			this.$nextTick(() => {
				setTimeout(() => {
					this.initBetterScroll()
				}, 20)
			})
		},
		methods: {
			// 所有评论数量
			totalComment (total) {
				this.commentTruthTotal = total
				setTimeout(() => {
					this.initBetterScroll()
				}, 20)
			},
			// 查看全部评价
			showAllComment () {
				setTimeout(() => {
					this.$emit('changeTopTabIndex', 2)
				}, 100)
			},
			// 初始化 scroller
			initBetterScroll () {
				if (!this.scroller) {
					this.scroller = new BScroll(this.$refs.wrapper, {
						probeType: 3,
						click: true
					})
					// 监听滚动条
					this.listenScroll()
				} else {
					this.scroller.refresh()
				}
			},
			listenScroll () {
				this.scroller.on('scroll', (pos) => {
					this.scrollTop = -pos.y
				})
				this.scroller.on('touchend', (pos) => {
					if (pos.y > 50) {
						// 刷新
						// this.loadData()
					}
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './product.styl'
</style>