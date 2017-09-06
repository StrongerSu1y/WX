
import Vue from 'vue'
let Obj = new Vue()

export function checkInput () {
	let inputItems = document.querySelectorAll('input[required]')
	for (let i = 0; i < inputItems.length; i++) {
		if (!inputItems[i].value) {
			Obj.Toast.warning({
				title: inputItems[i].placeholder
			})
			inputItems[i].focus()
			return false
		}
	}
	return true
}

export function checkMobile (item) {
	if (!/^1[3|4|5|8][0-9]\d{8}$/.test(item.value)) {
		Obj.Toast.warning({
			title: '请输入正确的手机号'
		})
		item.focus()
		return false
	}
	return true
}

export function addScript (url) {
	let script = document.createElement('script')
	let head = document.getElementsByTagName('head')[0]
	script.src = url
	head.appendChild(script)
}

export function isWeixin () {
	let u = navigator.userAgent.toLowerCase()
	if (u.match(/MicroMessenger/i)) {
		return true
	}
	return false
}

export function getStrLength (str) {
	let len = 0
	for (let i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
			len += 2
		} else {
			len += 1
		}
	}
	return len
}

