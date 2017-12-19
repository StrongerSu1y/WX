<template>
	<div class="mine-coupon">
		<!-- 头部 -->
		<section class="mine-coupon-top underline">
			<div class="back-icon" @click="goBack()">
				<img src="./back_icon.png">
			</div>
			<p class="title">领券中心</p>
		</section>
		<!-- 列表 -->
		<ul v-if="listData && listData.length" class="coupon-list">
			<li v-for="(item, index) in listData" ref="listItem" class="coupon-item">
				<div class="item-body">
					<div class="left-part">
						<p class="price">
							<span class="big">{{ item.amount || 0 }}</span>
							<span class="desc">元</span>
						</p>
						<p class="condition">满{{ item.reachamount || 0 }}元可用</p>
					</div>
					<div class="center-part">
						<p class="type">{{ item.name }}</p>
						<p class="remain">剩余 {{ item.left }}张</p>
						<p class="deadline">有效期至 {{ item.validtime | getUpdateDay }}</p>
					</div>
					<div class="right-part" @click="getCouponItem(index, item.id)">
						<div class="get-box" v-if="!item.loadingShow">领取</div>
						<v-loading v-if="item.loadingShow"></v-loading>
					</div>
				</div>
				<div class="item-footer">{{ item.description }}</div>
			</li>
		</ul>
		<empty v-if="!listData.length" :text="'暂无可领优惠券'"></empty>
	</div>
</template>

<script>
	import loading from '@/components/common/loading/loading'
	import empty from '@/components/common/empty/empty'
	export default {
		data () {
			return {
				listData: [],
				// 页码
				pageNum: 1,
				pageSize: 20
			}
		},
		computed: {
			params () {
				let params = {}
				params._uid = localStorage.getItem('userId')
				params.pageNum = this.pageNum
				params.pageSize = this.pageSize
				return params
			}
		},
		created () {
			// 加载数据
			this.loadData()
		},
		mounted () {
			this.$nextTick(() => {
			})
		},
		methods: {
			// 加载数据
			loadData () {
				this.Toast.loading({
					title: '加载中...'
				})
				this.$ajax.couponList(this.params).then(res => {
					console.log(res)
					let list = res.data.pageInfo.list
					list.forEach(item => {
						item.loadingShow = false
					})
					this.listData = this.listData.concat(list)
				}, err => {
					console.log(err)
				})
			},
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
			// 点击领取
			getCouponItem (index, id) {
				this.listData = this.listData.map((item, index2) => {
					if (index === index2) {
						item.loadingShow = true
					}
					return item
				})
				// 提交
				this.$ajax.couponReceive(id).then(res => {
					console.log(res)
					if (res.data.result.status === '0') {
						setTimeout(() => {
							this.Toast.success({
								title: '领取成功！'
							})
							this.listData[index].loadingShow = false
							// 重新加载数据
							this.reload()
						}, 1000)
					} else {
						this.Toast.warning({
							title: res.data.result.msg
						})
						this.listData[index].loadingShow = false
					}
				}, err => {
					console.log(err)
					this.Toast.warnint({
						title: err.data.result.msg
					})
					this.listData[index].loadingShow = false
				})
			},
			// 重新加载
			reload () {
				this.pageNum = 1
				this.loadData()
			}
		},
		components: {
			'v-loading': loading,
			empty
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './coupon.styl'
</style>