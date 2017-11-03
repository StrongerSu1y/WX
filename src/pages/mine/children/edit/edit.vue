<template>
	<div class="mine-children-edit">
		<!-- 头部 -->
		<section class="mine-children-edit-top underline">
			<div class="back-icon" @click="goBack()">
				<img src="../back_icon.png">
			</div>
			<p class="title">孩子管理</p>
			<div class="add-btn" @click="doSave()">
				保存
			</div>
		</section>
		<ul class="input-list">
			<li class="input-item">
				<div class="left-part">
					<img v-lazy="item.avatar || defaultAvatar">
				</div>
				<div class="center-part">
					<input type="text" placeholder="设置头像" readonly="">
				</div>
				<div class="right-part">
					<img src="../right_arrow.png">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">姓名</span>
				</div>
				<div class="center-part">
					<input type="text" placeholder="请输入孩子姓名">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">性别</span>
				</div>
				<div class="center-part">
					<div class="gendle-box">
						<div @click="changeGendle(1)" class="select-box">
							<img class="select-img" :src="item.gendle === 1 ? selectedSrc : notSelectedSrc">
							<img class="gendle-icon" src="../boy.png">
							<span class="text">男</span>
						</div>
					</div>
					<div class="gendle-box">
						<div @click="changeGendle(2)" class="select-box">
							<img class="select-img" :src="item.gendle === 2 ? selectedSrc : notSelectedSrc">
							<img class="gendle-icon" src="../girl.png">
							<span class="text">女</span>
						</div>
					</div>
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">地区</span>
				</div>
				<div class="center-part">
					<input type="text" placeholder="请选择地区" readonly>
				</div>
				<div class="right-part">
					<img src="../right_arrow.png">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">入学年份</span>
				</div>
				<div class="center-part">
					<input type="text" placeholder="请选择孩子入学年份" readonly>
				</div>
				<div class="right-part">
					<img src="../right_arrow.png">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">学校</span>
				</div>
				<div class="center-part">
					<input type="text" placeholder="请选择学校" readonly>
				</div>
				<div class="right-part">
					<img src="../right_arrow.png">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">年级</span>
				</div>
				<div class="center-part">
					<input class="yellow" type="text" placeholder="请选择孩子当前就读年级" readonly>
				</div>
				<div class="right-part">
					<img src="../right_arrow.png">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">班级</span>
				</div>
				<div class="center-part">
					<input type="text" placeholder="请选择班级" readonly>
				</div>
				<div class="right-part">
					<img src="../right_arrow.png">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">家长</span>
				</div>
				<div class="center-part">
					<input type="text" placeholder="请输入家长姓名">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">电话</span>
				</div>
				<div class="center-part">
					<input type="text" placeholder="请输入孩子家长联系电话">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">关系</span>
				</div>
				<div class="center-part">
					<input type="text" placeholder="请输入家长与孩子关系" readonly>
				</div>
				<div class="right-part">
					<img src="../right_arrow.png">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">设置为当前</span>
				</div>
				<div class="center-part">
					<div class="block-box"></div>
					<div @click="changeSelected" class="select-box">
						<img class="select-img" :src="isSelected ? selectedSrc : notSelectedSrc">
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				item: {
					gendle: 1
				},
				defaultAvatar: require('../../avatar.jpg'),
				selectedSrc: require('../reset/select_btn_active.png'),
				notSelectedSrc: require('../reset/select_btn.png'),
				isSelected: false
			}
		},
		computed: {
		},
		mounted () {
			if (this.$route.query.item) {
				this.item = JSON.parse(this.$route.query.item)
			}
			this.$nextTick(() => {
			})
		},
		methods: {
			// 切换选中状态
			changeSelected () {
				this.isSelected = !this.isSelected
			},
			// 孩子性别
			changeGendle (index) {
				this.item.gendle = index
			},
			// 返回
			goBack () {
				this.$router.goBack()
			},
			// 保存
			doSave () {
				this.goBack()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './edit.styl'
</style>