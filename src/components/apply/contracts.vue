<template>
	<div class="contracts">
		<v-header :entrance="'apply'" :title="title"></v-header>
		<div class="main">
			<div class="name underline">
				<span class="desc">联系人</span>
				<input type="text" name="name" v-model="name" placeholder="请在此输入联系人名称">
			</div>
			<div class="tel">
				<span class="desc">手机</span>
				<input type="number" pattern="[0-9]*" name="mobile" v-model="mobile" placeholder="请在此输入联系人电话">
			</div>
		</div>
		<!-- 底部提交按钮 -->
		<footer class="footer" @click="doSubmit()">
			提交
		</footer>
	</div>
</template>

<script>
	import header from '../header/header'
	export default {
		name: 'contracts',
		data () {
			return {
				needInfo: false,
				name: '',
				mobile: '',
				title: '请填写联系人信息'
			}
		},
		methods: {
			// 提交
			doSubmit () {
				var _data = {
					name: this.name,
					mobile: this.mobile,
					active_id: this.$route.query.id,
					pay_channel: 0, // 报名
					_uid: 9646,
					cls: 14
				}
				JSON.parse(this.$route.query.comboList).forEach((item, index) => {
					if (item.num > 0) {
						_data['ticket_' + item.id + ''] = item.num
					}
				})
				this.$ajax({
					method: 'post',
					url: '/activetrade/confirm',
					data: _data
				})
				.then((res) => {
					console.log(res)
					let data = res.data
					if (data.msg === 'success') {
						this.$router.push({
							path: '/apply/pay',
							query: {
								fee: data.data.totle_final_fee,
								outtradeno: data.data.no
							}
						})
						// this.$router.push({
						// 	path: '/apply/realname'
						// })
					}
				})
				.catch((err) => {
					console.log(err)
				})
			}
		},
		components: {
			'v-header': header
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './contracts.styl'
</style>