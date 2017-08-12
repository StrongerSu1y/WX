<template>
	<div class="contracts">
		<v-header :entrance="'apply'" :title="title"></v-header>
		<div>
			<ul class="info">
				<li class="main">
					<div class="main-header">
						<div class="left">
							<span class="type">票名称票名称票名称票名称票名称票名</span>
							<span class="group">团</span>
						</div>
						<div class="right">
							<span class="price">￥390.00</span>
							<img src="./child_info.png">
						</div>
					</div>
					<ul class="list">
						<li class="name underline">
							<span class="desc">孩子姓名</span>
							<input type="text" name="name" placeholder="请在此输入孩子姓名">
						</li>
						<li class="gender underline">
							<span class="desc">孩子性别</span>
							<div class="box">
								<div class="item" @click="changeGenderIndex(2)">
									<div class="img" :class="{ active: genderIndex === 2 }"></div>
									<span class="">女生</span>
								</div>
								<div class="item man" @click="changeGenderIndex(1)">
									<div class="img" :class="{ active: genderIndex === 1 }"></div>
									<span class="">男生</span>
								</div>
							</div>
						</li>
						<li class="parent-name underline">
							<span class="desc">家长姓名</span>
							<input type="text" name="parentName" placeholder="请在此输入家长姓名">
						</li>
						<li class="parent-tel underline">
							<span class="desc">家长电话</span>
							<input type="number" name="parentTel" placeholder="请在此输入家长电话">
						</li>
						<li class="relation list-item-arrow">
							<span class="desc">关系</span>
							<span class="value">爸爸</span>
						</li>
					</ul>
				</li>
			</ul>
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
		name: 'realname',
		data () {
			return {
				noCheckSrc: `gender_check.png`,
				hasCheckSrc: `gender_check_active.png`,
				genderIndex: 0,
				// 孩子信息
				childInfoSrc: `child_info.png`,
				title: '请填写报名人员信息'
			}
		},
		computed: {
			manCheckSrc () {
				return this.genderIndex === 1 ? this.hasCheckSrc : this.noCheckSrc
			},
			womenCheckSrc () {
				return this.genderIndex === 2 ? this.hasCheckSrc : this.noCheckSrc
			}
		},
		methods: {
			changeGenderIndex (index) {
				this.genderIndex = index
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