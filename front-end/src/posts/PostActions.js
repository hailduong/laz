export const GET_ALL_POSTS = 'GET_ALL_POST';
export const GET_SINGLE_POST = 'GET_SINGLE_POST';
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

		fetch("/posts", postsFetchConfigs)
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

export const getSinglePost = (postID) => {
	return (dispatch) => {

		const singlePostFetchConfigs = {
			method: 'GET',
			headers: {
				'Authorization': 'key',
				'Content-Type': 'application/json'
			}
		};

		fetch(`/posts/${postID}`, singlePostFetchConfigs)
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

export const upVotePost = (id) => {
	return (dispatch) => {

		// TODO: like/upvote this?

	}
};

export const downVotePost = (id) => {
	return (dispatch) => {

		// TODO: dislike/down vote?
	}
};
