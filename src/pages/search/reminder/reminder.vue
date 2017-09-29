<template>
	<div class="search-reminder">
		<section class="bar">
			<div class="top" style="background: none">
				<div class="select-box">
					<span class="text">图书</span>
					<span class="bottom-arrow"></span>
				</div>
				<v-selector v-show="selectorShow" :typeList="typeList" @changeTypeIndex="changeTypeIndex"></v-selector>
			</div>
		</section>
		<section class="reminder-body">
			<div class="top-triangle"></div>
			<p class="text">
				输入搜索内容前请先点击此处选择搜索类型！
				<span class="Cf5b039">(这是一条很重要的提示)</span>
			</p>
		</section>
		<section class="buttons">
			<div @click="noReminder()" class="left-button button">
				不再提示
			</div>
			<div @click="hideReminder()" class="right-button button">
				我知道了
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: 'search-reminder',
		data () {
			return {}
		},
		methods: {
			hideReminder () {
				this.$emit('hideReminder')
			},
			// 不再提醒
			noReminder () {
				localStorage.setItem('noReminder', true)
				this.$emit('hideReminder')
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './reminder.styl'
</style>