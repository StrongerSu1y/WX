<template>
	<div>
		<div class="shopcat">
			<div class="item buttons">
				<div class="collect button">
					<img :src="collectSrc" @click="toggleCollect()">
					<div class="text">{{ collectText }}</div>
				</div>
				<div class="shop button">
					<div class="dot">
						3
					</div>
					<img :src="shopcatSrc">
					<div class="text">购物车</div>
				</div>
			</div>
			<div class="item buy">
				立即购买
			</div>
			<div class="item add">
				放入购物车
			</div>
		</div>
		<div v-if="onlyBuy" class="shopcat">
			<div class="item buy">
				立即购买
			</div>
		</div>
		<div v-if="activity" class="shopcat" @click="goApply()">
			<div class="item buy activity">
				<img src="./apply.png">
				<span>我要报名</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'shopcat',
		props: ['onlyBuy', 'activity', 'id'],
		data () {
			return {
				collect: `collect.png`,
				collectActive: `collect_active.png`,
				collectOn: false,
				shopcatSrc: `shopcat.png`,
				// 报名图标
				applyIconSrc: `apply.png`
			}
		},
		computed: {
			collectSrc () {
				return this.collectOn ? this.collectActive : this.collect
			},
			collectText () {
				return this.collectOn ? '已收藏' : '收藏'
			}
		},
		methods: {
			// 切换收藏
			toggleCollect () {
				this.collectOn = !this.collectOn
			},
			// 我要报名
			goApply () {
				this.$emit('go-apply')
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './shopcat.styl'
</style>