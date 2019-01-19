const clone = require('clone');

let db = {}

const defaultData = {
	"8xf0y6ziyjabvozdd253nd": {
		id: '8xf0y6ziyjabvozdd253nd',
		timestamp: 1467166872634,
		title: 'Is Success Down To The Quality Of Your Work?',
		body: 'One of the biggest fallacies of our industry is that good work speaks for itself. It is a self-delusional lie that those with a good reputation tell themselves to explain their success.',
		author: 'Paul Boag',
		category: 'react',
		voteScore: 6,
		deleted: false
	},
	"6ni6ok3ym7mf1p33lnez": {
		id: '6ni6ok3ym7mf1p33lnez',
		timestamp: 1468479767190,
		title: 'Launching An App? Make App Store Optimization Your Foundation For Growth',
		body: 'Most apps developed and released in Google’s Play store are abandoned by their developers. Over half of these apps get fewer than 5000 downloads, and most apps are considered unprofitable. This article is not going to make you the next Instagram, but it will hopefully help you get a nice base level of users that you can grow from.',
		author: 'thingone',
		category: 'react',
		voteScore: 5,
		deleted: false
	},
	"6ni6ok3ym7mf1p33lnez1": {
		id: '6ni6ok3ym7mf1p33lnez1',
		timestamp: 1468479767191,
		title: 'Removing Friction In UX: Last-Minute Travel Planning And Activity Booking (A Case Study)',
		body: 'Most travellers make last-minute decisions, even though they spend significant time researching things to do before embarking on their trip. Finding a hotel and flight is relatively easy, but when it comes to tours and activities, the problem is that late or last-minute bookings are not always available.',
		author: 'thingone',
		category: 'udacity',
		voteScore: 45,
		deleted: false
	},
	"6ni6ok3ym7mf1p33lnez2": {
		id: '6ni6ok3ym7mf1p33lnez2',
		timestamp: 1468475767192,
		title: 'An Introduction To Gravit Designer: Designing A Weather App',
		body: 'Being a designer at the moment is great because a wealth of modern design applications are available that let you easily bring your ideas to the screen: Sketch, Affinity Designer, Adobe XD (beta) and Figma, to name just a few (not to mention the classics, Photoshop and Illustrator).',
		author: 'thingone',
		category: 'redux',
		voteScore: 13,
		deleted: false
	},
	"6ni6ok3ym7mf1p33lnez3": {
		id: '6ni6ok3ym7mf1p33lnez3',
		timestamp: 1468476767190,
		title: 'UX Meets MBA: What Happens When A Designer Goes To Business School',
		body: 'If great design can imbue customers with trust, why are designers so removed from product management and the larger business strategy? As a VP of UX with an MBA, I strive to bring both worlds together to create a new model in which user experience and design align with overall business strategy and company vision to drive increased revenue and customer engagement.',
		author: 'thingone',
		category: 'udacity',
		voteScore: 24,
		deleted: false
	},
	"6ni6ok3ym7mf1p33lnez4": {
		id: '6ni6ok3ym7mf1p33lnez4',
		timestamp: 1468477767190,
		title: 'How To Create A Sketch Plugin With Front-End Technologies',
		body: 'Most apps developed and released in Google’s Play store are abandoned by their developers. Over half of these apps get fewer than 5000 downloads, and most apps are considered unprofitable. This article is not going to make you the next Instagram, but it will hopefully help you get a nice base level of users that you can grow from.',
		author: 'thingone',
		category: 'react',
		voteScore: 56,
		deleted: false
	},
	"6ni6ok3ym7mf1p33lnez5": {
		id: '6ni6ok3ym7mf1p33lnez5',
		timestamp: 1468478767190,
		title: 'Web Development Reading List: Announcing Changes, A Design Kit, DNA Malware, And Why Meaning Is An Advantage',
		body: 'You might have noticed it already: in the past few weeks you might have missed Anselms Web Development Reading List issues here on SmashingMag. No worries, from now on, we’ll switch to collecting the most important news of each month in one handy, monthly summary for you. If youd like to continue reading Anselms weekly reading list (and we encourage you to!), you can still do so via email, on wdrl.info or via RSS. — Editorial Team',
		author: 'thingone',
		category: 'react',
		voteScore: 32,
		deleted: false
	},
	"6ni6ok3ym7mf1p33lnez6": {
		id: '6ni6ok3ym7mf1p33lnez6',
		timestamp: 1469479767190,
		title: 'User Authentication For Web And iOS Apps With AWS Cognito',
		body: 'Developers and organizations alike are looking for a way to have more agility with mobile solutions. There is a desire to decrease the time from idea to test. As a developer, I often run up against one hurdle that can slow down the initial build of a mobile hypothesis: user management.',
		author: 'thingone',
		category: 'redux',
		voteScore: 11,
		deleted: false
	},
	"6ni6ok3ym7mf1p33lnez7": {
		id: '6ni6ok3ym7mf1p33lnez7',
		timestamp: 1460479767190,
		title: 'Designing The Perfect Feature Comparison Table',
		body: 'Not all products are created equal. While we repeatedly buy some products almost mindlessly, for others, we take a lot of time to make a purchasing decision. For a price tag that meets a certain threshold or if we are particularly invested in the quality of a product, we want to be absolutely certain that we are making the right choice and are getting a good product for a good price. Thats where a feature comparison table makes all the difference.',
		author: 'thingone',
		category: 'redux',
		voteScore: -5,
		deleted: false
	},
	"6ni6ok3ym7mf1p33lnez8": {
		id: '6ni6ok3ym7mf1p33lnez8',
		timestamp: 1463479767190,
		title: 'The Nine Principles Of Design Implementation',
		body: 'Most apps developed and released in Google’s Play store are abandoned by their developers. Over half of these apps get fewer than 5000 downloads, and most apps are considered unprofitable. This article is not going to make you the next Instagram, but it will hopefully help you get a nice base level of users that you can grow from.',
		author: 'thingone',
		category: 'redux',
		voteScore: 9,
		deleted: false
	}
};

function getData(token) {
	let data = db[token]
	if (data == null) {
		data = db[token] = clone(defaultData)
	}
	return data
}

function getByCategory(token, category) {
	return new Promise((res) => {
		let posts = getData(token)
		let keys = Object.keys(posts)
		let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
		res(filtered_keys.map(key => posts[key]))
	})
}

function get(token, id) {
	return new Promise((res) => {
		const posts = getData(token)
		res(
			posts[id].deleted
				? {}
				: posts[id]
		)
	})
}

function getAll(token) {
	return new Promise((res) => {
		const posts = getData(token)
		let keys = Object.keys(posts)
		let filtered_keys = keys.filter(key => !posts.deleted)
		res(filtered_keys.map(key => posts[key]))
	})
}

function add(token, post) {
	return new Promise((res) => {
		let posts = getData(token)

		posts[post.id] = {
			id: post.id,
			timestamp: post.timestamp,
			title: post.title,
			body: post.body,
			author: post.author,
			category: post.category,
			voteScore: 1,
			deleted: false
		}

		res(posts[post.id])
	})
}

function vote(token, id, option) {
	return new Promise((res) => {
		let posts = getData(token)
		post = posts[id]
		switch (option) {
			case "upVote":
				post.voteScore = post.voteScore + 1
				break
			case "downVote":
				post.voteScore = post.voteScore - 1
				break
			default:
				console.log(`posts.vote received incorrect parameter: ${option}`)
		}
		res(post)
	})
}

function disable(token, id) {
	return new Promise((res) => {
		let posts = getData(token)
		posts[id].deleted = true
		res(posts[id])
	})
}

function edit(token, id, post) {
	return new Promise((res) => {
		let posts = getData(token)
		for (prop in post) {
			posts[id][prop] = post[prop]
		}
		res(posts[id])
	})
}

module.exports = {
	get,
	getAll,
	getByCategory,
	add,
	vote,
	disable,
	edit,
	getAll
}