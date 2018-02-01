<template>
	<section class="praise">
		<p class="praise-title">
			<img src="./best_icon.png">
			<span class="text">最佳口碑榜</span>
		</p>
		<!-- 列表 -->
		<div>
			<ul class="media-list">
				<li class="img-item" v-for="star in starList" @click="openDatail(star.id)">
					<img :src="star.logo">
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
	export default {
		name: 'praise',
		props: {
			starList: {
				type: Array
			},
			id: {
				type: String
			}
		},
		data () {
			return {}
		},
		computed: {
		},
		methods: {
			data () {
				
			},
			openDatail (id) {
				this.$router.push({
					path: './datail/actdetail',
					query: {
						id: id
					}
				})
			}
		},
		components: {
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './praise.styl'
</style>