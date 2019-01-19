const clone = require('clone')
const config = require('./config')

let db = {}

const categoryList = [
	'Electronic Devices',
	'Electronic Accessories',
	'TV & Home Appliances',
	'Health & Beauty',
	'Babies & Toys',
	'Groceries & Pets',
	'Home & Lifestyle',
	'Women Fashion',
	'Men Fashion',
	'Fashion Accessories',
	'Sports & Travel',
	'Automotive & Motorcycles'
];

const transformedCategories = categoryList.map(item => {
	return {
		name: item,
		path: item.replace(/\s/g,'_').toLowerCase()
	}
});

const defaultData = {
	categories: transformedCategories
};

function getData(token) {
	//Each token has it's own copy of the DB. The token in this case is like an app id.
	let data = db[token]
	//This populates the default user data if there isn't any in the db.
	if (data == null) {
		data = db[token] = clone(defaultData)
	}
	return data
}

function getAll(token) {
	return new Promise((res) => {
		res(getData(token))
	})
}

module.exports = {
	getAll
}
