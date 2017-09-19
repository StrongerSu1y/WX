
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

export function getPrice (str) {
	return parseFloat(str).toFixed(2)
}

export function extendObj (target, source) {
	for (var obj in source) {
		target[obj] = source[obj]
	}
	return target
}

// 获取需要的字段
export function getNeedData (obj, arr) {
	let returnObj = {}
	arr.forEach(item => {
		returnObj[item] = obj[item]
	})
	return returnObj
}

// 获取整个数组需要的字段
export function getNeedDataList (arr, args) {
	let needArr = []
	arr.forEach(item => {
		let needObj = getNeedData(item, args)
		needArr.push(needObj)
	})
	return needArr
}

// 获取所有不重复的 Set
export function getArraySet (arr, type) {
	let s = new Set()
	let backArr = []
	arr.forEach(item => {
		s.add(item[type])
	})
	for (var i of s) {
		backArr.push(i)
	}
	return backArr
}

// 获取带逗号的 string
export function getWithCommaString (arr, type) {
	let str = ''
	console.log(str)
	arr.forEach(item => {
		if (type) {
			str += item[type] + ','
		} else {
			str += item + ','
		}
	})
	return str.substr(0, str.length - 1)
}
