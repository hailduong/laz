const fakeData = require('../global/fakeData');

export const GET_ALL_POSTS = 'GET_ALL_POST';
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS';
export const GET_SINGLE_POST = 'GET_SINGLE_POST';
export const ADD_NEW_POST = 'ADD_NEW_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';


export const getAllPosts = () => {
	return (dispatch) => {

		const postsFetchConfigs = {
			method: 'GET',
			headers: {
				'Authorization': 'key',
				'Content-Type': 'application/json'
			}
		};

		fetch("http://localhost:5001/posts", postsFetchConfigs)
			.then(response => response.json())
			.then(data => {
				console.log('Posts fetched', data);
				dispatch({
					type: GET_ALL_POSTS,
					posts: data
				})
			});

	}
};
export const getCategoryPosts = (category) => {
	return (dispatch) => {

		const categoryPostsFetchConfigs = {
			method: 'GET',
			headers: {
				'Authorization': 'key',
				'Content-Type': 'application/json'
			}
		};

		fetch(`http://localhost:5001/${category}/posts`, categoryPostsFetchConfigs)
			.then(response => response.json())
			.then(data => {
				console.log('Category posts fetched', data);
				dispatch({
					type: GET_CATEGORY_POSTS,
					posts: data
				})
			});
	}
};
export const getSinglePost = (postID) => {
	return (dispatch) => {

		const singlePostFetchConfigs = {
			method: 'GET',
			headers: {
				'Authorization': 'key',
				'Content-Type': 'application/json'
			}
		};

		fetch(`http://localhost:5001/posts/${postID}`, singlePostFetchConfigs)
			.then(response => response.json())
			.then(data => {
				console.log('Single posts fetched', data);
				dispatch({
					type: GET_SINGLE_POST,
					post: data
				})
			});
	}
};
export const addNewPost = ({id, timestamp, postTitle, postContent, postAuthor, postCategory} = {}) => {
	return (dispatch) => {

		const addPostFetchConfigs = {
			method: 'POST',
			headers: {
				'Authorization': 'key',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id, timestamp,
				title: postTitle,
				body: postContent,
				author: postAuthor,
				category: postCategory
			})
		};

		fetch(`http://localhost:5001/posts`, addPostFetchConfigs)
			.then(response => response.json())
			.then(data => {
				console.log('Single posts fetched', data);
				dispatch({
					type: ADD_NEW_POST,
					postObject: {id, timestamp, postTitle, postContent, postAuthor, postCategory}
				})
			});
	}
};
export const editPost = ({id, title, body}) => {
	return (dispatch) => {
		const editPostFetchConfigs = {
			method: 'PUT',
			headers: {
				'Authorization': 'key',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id, title, body
			})
		};

		fetch(`http://localhost:5001/posts/${id}`, editPostFetchConfigs)
			.then(response => response.json())
			.then(data => {
				dispatch({
					type: EDIT_POST,
					postObject: {id, title, body}
				})
			});
	}
};
export const deletePost = (id) => {
	return (dispatch) => {
		const fetchConfigs = {
			method: 'DELETE',
			headers: {'Authorization': 'key', "Content-Type": "application/json"}
		};

		fetch(`http://localhost:5001/posts/${id}`, fetchConfigs).then(data => {
			dispatch({
				type: DELETE_POST,
				postObject: {id}
			})
		});
	}
};
export const upVotePost = (id) => {
	return (dispatch) => {

		const fetchConfigs = {
			method: 'POST',
			headers: {'Authorization': 'key', "Content-Type": "application/json",},
			body: JSON.stringify({
				option: "upVote"
			})
		};

		fetch(`http://localhost:5001/posts/${id}`, fetchConfigs).then(data => {
			dispatch({
				type: UP_VOTE_POST,
				postObject: {id}
			})
		});


	}
};
export const downVotePost = (id) => {
	return (dispatch) => {

		const fetchConfigs = {
			method: 'POST',
			headers: {'Authorization': 'key', "Content-Type": "application/json",},
			body: JSON.stringify({
				option: "downVote"
			})
		};

		fetch(`http://localhost:5001/posts/${id}`, fetchConfigs).then(data => {
			dispatch({
				type: DOWN_VOTE_POST,
				postObject: {id}
			})
		});

	}
};
