<template>
	<div class="mine-order-refund">
		<!-- 头部 -->
		<section class="mine-order-refund-top">
			<div class="back-icon" @click="goBack()">
				<img src="./back_icon.png">
			</div>
			<p class="title">退款</p>
			<div class="submit-btn" @click="doSubmit()">
				提交
			</div>
		</section>
		<!-- 评分 -->
		<section class="reminder">
			<p class="title">退款提示:</p>
			<ul class="reminder-list">
				<li v-for="(item, index) in reminderList" class="reminder-item">
					{{ index + 1 }}. {{ item.text }}
				</li>
			</ul>
		</section>
		<!-- 退款原因 -->
		<section class="refund-reason">
			<p class="title">
				<span class="text">退款原因</span>
				<img src="./must_select.png">
			</p>
			<div @click="showSelector()" class="refund-type" :class="{ hasVal: reason }">{{ reason || '请选择退款类型'}}</div>
		</section>
		<!-- 退款说明 -->
		<section class="refund-explain">
			<p class="title">
				<span class="text">退款说明</span>
				<img src="./not_must_select.png">
			</p>
			<div class="explain-box">
				<textarea class="explain-area" placeholder="请在此输入退款说明"></textarea>
			</div>
		</section>
		<!-- 图片 -->
		<ul class="pic-list">
			<li v-if="picList && picList.length" v-for="(pic, index) in picList" class="pic-item">
				<img class="pic" :src="pic">
				<img class="close-icon" src="./close_icon.png" @click.prevent.stop="deleteItem(index)">
			</li>
			<li class="pic-item" @click="submitPic()">
				<input ref="file" type="file" name="image" accept="image/*" style="display: none;" @change="handleInputChange($event)">
				<img class="pic" src="./submit_pic_icon.png">
			</li>
		</ul>
	</div>
</template>

<script>
	// 退款原因
	let data1 = [{
		text: '未收到货',
		value: 1
	}, {
		text: '收到商品与描述不符',
		value: 2
	}, {
		text: '少件/漏发',
		value: 3
	}, {
		text: '收到商品破损',
		value: 4
	}, {
		text: '商品需要维修',
		value: 5
	}, {
		text: '商品质量问题',
		value: 6
	}]
	import Picker from 'better-picker'
	export default {
		data () {
			return {
				// 提示数组
				reminderList: [{
					text: '积分商品退款，积分不予退还。'
				}, {
					text: '积分商品退款，积分不予退还。'
				}, {
					text: '积分商品退款，积分不予退还。'
				}],
				// 上传图片数组
				picList: [],
				// 理由
				reason: '',
				// 关系数组
				relationList: data1,
				// 选择器
				picker: new Picker({
					data: [data1],
					selectedIndex: [0, 0, 0],
					title: '退款原因'
				})
			}
		},
		computed: {
		},
		mounted () {
			// 选择
			this.picker.on('picker.select', (index, selectedIndex) => {
				this.reason = this.relationList[index].text
			})
		},
		methods: {
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
			// 更改评分
			changeScore (index) {
				this.score = index + 1
			},
			// 上传图片
			submitPic () {
				this.$refs.file.click()
			},
			// 监听 input 改变
			handleInputChange (event) {
				let file = event.target.files[0]
				const imgMaxSize = 1024 * 1024 * 10 // 10MB
				// 检查文件类型
				if (['jpeg', 'png', 'gif', 'jpg'].indexOf(file.type.split('/')[1]) < 0) {
					// 不是图片格式文件
					this.Toast.warning({
						title: '请上传标准格式的图片'
					})
					return
				}
				// 文件大小限制
				if (file.size > imgMaxSize) {
					this.Toast.warning({
						title: '图片大小超过限制'
					})
					return
				}
				this.transformFileToDataUrl(file)
			},
			// 将 File append 进 FromData
			transformFileToFormData (file) {
				const formData = new FormData()
				formData.append('type', file.type)
				formData.append('size', file.size || 'image/jpeg')
				formData.append('name', file.name)
				formData.append('lastModifiedDate', file.lastModifiedDate)
				formData.append('file', file)
				// 上传图片，等接口
				// this.uploadImg(formData)
			},
			// 图片压缩
			transformFileToDataUrl (file) {
				const imgCompassMaxSize = 200 * 1024
				// 存储文件相关信息
				this.imgFile.type = file.type || 'image/jpeg'
				this.imgFile.size = file.size
				this.imgFile.name = file.name
				this.imgFile.lastModifiedDate = file.lastModifiedDate
				// 封装好的函数
				const reader = new FileReader()
				// file转dataURL是个异步函数，要将代码写在回调离
				reader.onload = (e) => {
					const result = e.target.result
					this.picList.push(result)
					if (result.length < imgCompassMaxSize) {
						this.compress(result, this.processData, false) // 图片不压缩
					} else {
						this.compress(result, this.processData) // 图片压缩
					}
				}
				reader.readAsDataURL(file)
			},
			// 使用 canvas 绘制图片并压缩
			compress (dataURL, callback, shouldCompress = true) {
				const img = new window.Image()
				img.src = dataURL
				img.onload = () => {
					const canvas = document.createElement('canvas')
					const ctx = canvas.getContext('2d')
					canvas.width = img.width
					canvas.height = img.height
					ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
					let compressedDataUrl = shouldCompress ? canvas.toDataURL(this.imgFile.type, 0.2) : canvas.toDataURL(this.imgFile.type, 1)
					callback(compressedDataUrl)
				}
			},
			processData (dataUrl) {
				// 这里使用二进制方式处理 dataUrl
				const binaryString = window.atob(dataUrl.split(',')[1])
				const arrayBuffer = new ArrayBuffer(binaryString.length)
				const intArray = new Uint8Array(arrayBuffer)
				const imgFile = this.imgFile
				for (let i = 0, j = binaryString; i < j; i++) {
					intArray[i] = binaryString.charCodeAt(i)
				}
				const data = [intArray]
				let blob = ''
				try {
					blob = new Blob(data, { type: imgFile.type })
				} catch (error) {
					window.BlobBuilder = window.BlobBuilder || window.WebkitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder
					if (error.name === 'TypeError' && window.BlobBuilder) {
						const builder = new window.BlobBuilder()
						builder.append(arrayBuffer)
						blob = builder.getBlob(imgFile.type)
					} else {
						this.Toast.fail({
							title: '版本过低，不支持上传图片'
						})
						throw new Error('版本过低，不支持上传图片')
					}
				}
				// blob 转 file
				const fileOfBlob = new File([blob], imgFile.name)
				const formData = new FormData()
				// type
				formData.append('type', imgFile.type)
				// size
				formData.append('size', fileOfBlob.size)
				formData.append('name', imgFile.name)
				formData.append('lastModifiedDate', imgFile.lastModifiedDate)
				// append 文件
				formData.append('file', fileOfBlob)
				// 上传图片
				// this.uploadImg(formData)
			},
			// 上传图片
			uploadImg (formData) {
				const xhr = new XMLHttpRequest()
				// 监听进度
				xhr.upload.addEventListener('progress', e => {
					console.log(e.loaded / e.total)
				}, false)
				// 错误监听
				xhr.addEventListener('error', () => {
					this.Toast.fail({
						title: '上传失败！'
					})
				})
				xhr.onreadystatechange = () => {
					if (xhr.readyState === 4) {
						const result = JSON.parse(xhr.responseText)
						if (xhr.status === 200) {
							// 上传成功
							console.log(result)
						} else {
							// 上传失败
						}
					}
				}
				let _url = 'upload'
				xhr.open('POST', _url, true)
				xhr.send(formData)
			},
			// 删除单项
			deleteItem (index) {
				this.picList.splice(index, 1)
			},
			// 提交
			doSubmit () {
				this.$router.goBack()
			},
			// 选择退款原因
			showSelector () {
				this.picker.show()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './refund.styl'
</style>