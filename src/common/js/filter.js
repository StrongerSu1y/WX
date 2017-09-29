let getInteger = value => {
	return Math.floor(parseFloat(value))
}

let getDecimal = value => {
	return parseFloat(parseFloat(value) - Math.floor(parseFloat(value))).toFixed(2).substr(1)
}

let getFullAddress = obj => {
	if (!obj.hasOwnProperty('cityArea')) {
		return false
	}
	return obj.cityArea.split(',').join('') + obj.address
}

let getUpdateDay = (time) => {
	if (!time) {
		return ''
	}
	time = time.replace(/-/g, '/')
	let _year, _month, _date
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

let getPastTimeText = (time) => {
	if (!time) {
		return ''
	}
	time = time.replace(/-/g, '/')
	// 如果有小数点，则去掉
	if (time.indexOf('.') > -1) {
		time = time.split('.')[0]
	}
	let nowTime = new Date().getTime()
	let createTime = new Date(time).getTime()
	let pastTime = nowTime - createTime
	let baseSecond = 1000
	let baseMin = 1000 * 60
	let baseHour = 1000 * 60 * 60
	let baseDay = 1000 * 60 * 60 * 24
	let baseMon = 1000 * 60 * 60 * 24 * 30
	let baseYear = 1000 * 60 * 60 * 24 * 365
	if (pastTime < baseMin) {
		return Math.floor(pastTime / baseSecond) + '秒'
	} else if (pastTime < baseHour) {
		return Math.floor(pastTime / baseMin) + '分'
	} else if (pastTime < baseDay) {
		return Math.floor(pastTime / baseHour) + '小时'
	} else if (pastTime < baseMon) {
		return Math.floor(pastTime / baseDay) + '天'
	} else if (pastTime < baseYear) {
		return Math.floor(pastTime / baseMon) + '月'
	} else {
		return Math.floor(pastTime / baseYear) + '年'
	}
}

export {
	getInteger,
	getDecimal,
	getFullAddress,
	getUpdateDay,
	getPastTimeText
}
