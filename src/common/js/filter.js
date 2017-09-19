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

export {
	getInteger,
	getDecimal,
	getFullAddress
}
