<template>
	<div class="ording-list">
		<ul class="list">
			<li v-for="(item, index) in listData" class="list-item underline">
				<div class="left-media">
					<img v-lazy="item.src">
				</div>
				<div class="right-part">
					<div class="box">
						<p class="title">{{ item.title }}</p>
						<div class="desc">
							<img src="./gift_icon.png">
							<p class="text">{{ item.desc }}</p>
						</div>
						<p class="time">
							<span class="text">{{ item.daysText }}</span>
							<span class="num">({{ item.daysNum }})</span>
						</p>
						<div class="bottom">
							<p class="price">￥<span class="big">{{ item.price }}</span>元</p>
							<div class="buttons">
								<img @click="addNum(index, $event)" src="./add_icon.png">
								<transition-group enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
									<span :key="1" v-if="item.number">{{ item.number }}</span>
									<img :key="2" v-if="item.number" @click="reduceNum(index, $event)" src="./reduce_icon.png">
								</transition-group>
							</div>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'publish',
		props: ['listData'],
		data () {
			return {}
		},
		methods: {
			reduceNum (index, event) {
				if (this.listData[index].number <= 0) {
					return
				}
				this.listData[index].number -= 1
			},
			addNum (index, event) {
				this.listData[index].number += 1
				if (event) {
					this.$emit('increment', event.target)
				}
			}
		}
	}
</script>

<style lang="stylus" res="stylesheet/stylus">
	@import './list.styl'
</style>