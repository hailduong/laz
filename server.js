require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const categories = require('./categories');
const posts = require('./posts');
const comments = require('./comments');

const fakeData = require('./fakeData.json');
const allPostsData = fakeData.data.resultValue[201711102].data;

const app = express();

// Declare the static folder
app.use('/', express.static(__dirname + '/front-end'));
app.use(cors());

// Send the index.html if the requested path is the home
const paths = ['/', '/item/:id'];
app.get(paths, (req, res) => {
	res.sendFile(__dirname + '/front-end/index.html');
});

//
// app.use((req, res, next) => {
// 	const token = req.get('Authorization');
//
// 	if (token) {
// 		req.token = token
// 		next()
// 	} else {
// 		res.status(403).send({
// 			error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
// 		})
// 	}
// })


app.get('/categories', (req, res) => {
	categories.getAll(req.token)
		.then(
			(data) => res.send(data),
			(error) => {
				console.error(error)
				res.status(500).send({
					error: 'There was an error.'
				})
			}
		)
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

app.get('/posts/:id/comments', (req, res) => {
	comments.getByParent(req.token, req.params.id)
		.then(
			(data) => res.send(data),
			(error) => {
				console.error(error)
				res.status(500).send({
					error: 'There was an error.'
				})
			}
		)
})

app.get('/comments/:id', (req, res) => {
	comments.get(req.token, req.params.id)
		.then(
			(data) => res.send(data),
			(error) => {
				console.error(error)
				res.status(500).send({
					error: 'There was an error.'
				})
			}
		)
})

app.put('/comments/:id', bodyParser.json(), (req, res) => {
	comments.edit(req.token, req.params.id, req.body)
		.then(
			(data) => res.send(data),
			(error) => {
				console.error(error)
				res.status(500).send({
					error: 'There was an error.'
				})
			}
		)
})

app.post('/comments', bodyParser.json(), (req, res) => {
	comments.add(req.token, req.body)
		.then(
			(data) => res.send(data),
			(error) => {
				console.error(error)
				res.status(500).send({
					error: 'There was an error.'
				})
			}
		)
})

app.post('/comments/:id', bodyParser.json(), (req, res) => {
	const {option} = req.body
	comments.vote(req.token, req.params.id, option)
		.then(
			(data) => res.send(data),
			(error) => {
				console.error(error)
				res.status(500).send({
					error: 'There was an error.'
				})
			}
		)
})

app.delete('/comments/:id', (req, res) => {
	comments.disable(req.token, req.params.id)
		.then(
			(data) => res.send(data),
			(error) => {
				console.error(error)
				res.status(500).send({
					error: 'There was an error.'
				})
			}
		)
})

app.listen(config.port, () => {
	console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
