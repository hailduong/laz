require('dotenv').config({path: __dirname + '/.env'});
console.log('[Server] Running in ', process.env.NODE_ENV, 'mode');

const express = require('express');
const cors = require('cors');
const config = require('./config');

const fakeData = require('./fakeData.json');
const allPostsData = fakeData.data.resultValue[201711102].data;

const app = express();

// Enalbe Cross Origin Resource Sharing for all request
app.use(cors());

// Declare the static folder
app.use('/', express.static(__dirname + '/front-end'));

// Send the index.html if the requested path is the home
const paths = ['/', '/item/:id'];
app.get(paths, (req, res) => {
	res.sendFile(__dirname + '/front-end/index.html');
});

app.get('/categories', (req, res) => {
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
			path: item.replace(/\s/g, '_').toLowerCase()
		}
	});

	const categoriesData = {
		categories: transformedCategories
	};

	res.send(categoriesData);

	console.log('[Server] Sent all categories');
});

app.get('/posts', (req, res) => {
	res.send(allPostsData);
	console.log('[Server] Sent all products');
});


app.get('/posts/:id', (req, res) => {
	const requestedPostId = req.params.id;
	const thisPostData = allPostsData.find(item => item.itemId === requestedPostId);
	res.send(thisPostData);
	console.log('[Server] Sent a single post data with id', requestedPostId);
});

app.listen(config.port, () => {
	console.log('Server listening on port %s, Ctrl+C to stop', config.port)
});
