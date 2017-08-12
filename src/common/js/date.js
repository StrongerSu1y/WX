/**
 * Created by yi on 2016-12-27.
 */

export function formatDate (date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ''
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
		}
	}
	return fmt
}

export function getUpdateDay (time) {
	let _year, _month, _date
	if (!time) {
		return ''
	}
	if (time instanceof Date) {
		let newDate = new Date(time)
		_year = newDate.getFullYear()
		_month = newDate.getMonth() + 1
		_date = newDate.getDate()
	} else {
		_year = time.substr(0, 4)
		_month = time.substr(5, 2)
		_date = time.substr(8, 2)
	}
	return _year + '年' + _month + '月' + _date + '日'
}

function padLeftZero (str) {
	return ('00' + str).substr(str.length)
}

export function getQueryString (name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
	var queryIndex = window.location.href.indexOf('?')
	var queryStr = window.location.href.substr(queryIndex).substr(1)
	var r = queryStr.match(reg)
	if (r != null) {
		return unescape(r[2])
	}
	return null
}
