<template>
	<div class="mine-address-index">
		<!-- 头部 -->
		<section class="mine-address-index-top underline">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">地址管理</p>
			<div class="add-btn" @click="doAdd()">
				添加
			</div>
		</section>
		<ul class="input-list">
			<li v-for="(address, index) in addressList" class="input-item" @click="openAddressItem(address)">
				<section class="header">
					<div class="main">
						<div class="left-part">
							<div class="contract">
								<span class="name">{{ address.name }}</span>
								<span class="mobile">{{ address.mobile }}</span>
							</div>
							<div class="address" :style="getAddressBottom(address.address)">{{ address | getFullAddress }}</div>
						</div>
						<div class="right-arrow" @click="modifyAddress('order/address')">
							<img :src="rightArrowSrc">
						</div>
					</div>
				</section>
			</li>
		</ul>
	</div>
</template>

<script>
	let addressList = [{
		name: '张三丰',
		mobile: '13777818859',
		address: '翠苑第一小学(翠苑校区)一年级1班',
		cityArea: ''
	}]
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				rightArrowSrc: require('@/common/icons/right_arrow.png'),
				addressList: addressList
			}
		},
		computed: {
		},
		mounted () {
			this.$nextTick(() => {
			})
		},
		methods: {
			// 返回
			goBack () {
				this.$router.goBack()
			},
			// 添加
			doAdd () {
				this.$router.push({
					path: '/mine/address/edit'
				})
			},
			// 获得底部距离
			getAddressBottom (address) {
				return address.length > 23 ? '15px' : '25px'
			},
			// 打开单条地址
			openAddressItem (address) {
				this.$router.push({
					path: '/mine/address/edit',
					query: {
						address: JSON.stringify(address)
					}
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'
</style>