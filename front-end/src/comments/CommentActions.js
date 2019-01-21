export const GET_ALL_COMMENTS = 'GET_ALL_COMMENTS';
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT';
export const GET_SINGLE_COMMENT = 'GET_SINGLE_COMMENT';
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT';
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const getAllComments = (postID) => {
	return (dispatch) => {

		const fetchConfig = {
			method: 'GET',
			headers: {
				'Authorization': 'key',
				'Content-Type': 'application/json'
			}
		};

		// fetch(`/posts/${postID}/comments`, fetchConfig)
		// 	.then(response => response.json())
		// 	.then(data => {
		// 		console.log('Comments fetched', data);
		//
		// 	});
		const data = []; // fake data
		dispatch({
			type: GET_ALL_COMMENTS,
			comments: data,
			postID: postID
		})
	}
};
export const getSingleComment = (commentID) => {
	return (dispatch) => {

		const fetchConfigs = {
			method: 'GET',
			headers: {
				'Authorization': 'key',
				'Content-Type': 'application/json'
			}
		};

		fetch(`/comments/${commentID}`, fetchConfigs)
			.then(response => response.json())
			.then(data => {
				console.log('Single comment fetched', data);
				dispatch({
					type: GET_SINGLE_COMMENT,
					comment: data
				})
			});
	}
};
export const addNewComment = ({id, timestamp, body, author, parentId}) => {
	return (dispatch) => {

		const fetchConfigs = {
			method: 'POST',
			headers: {
				'Authorization': 'key',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id, timestamp, body, author, parentId
			})
		};

		fetch(`/comments`, fetchConfigs)
			.then(response => response.json())
			.then(data => {
				console.log('Single posts fetched', data);
				dispatch({
					type: ADD_NEW_COMMENT,
					commentObject: {id, timestamp, body, author, parentId}
				})
			});
	}
};
export const editComment = ({id, timestamp, body, parentId}) => {
	return (dispatch) => {
		const fetchConfigs = {
			method: 'PUT',
			headers: {
				'Authorization': 'key',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				timestamp, body
			})
		};

		fetch(`/comments/${id}`, fetchConfigs)
			.then(response => response.json())
			.then(data => {
				dispatch({
					type: EDIT_COMMENT,
					commentObject: {id, timestamp, body, parentId}
				})
			});
	}
};
export const deleteComment = (id, postID) => {
	return (dispatch) => {
		const fetchConfigs = {
			method: 'DELETE',
			headers: {'Authorization': 'key', "Content-Type": "application/json"}
		};

		fetch(`/comments/${id}`, fetchConfigs).then(data => {
			dispatch({
				type: DELETE_COMMENT,
				commentID: id,
				postID: postID
			})
		});
	}
};
export const upVoteComment = (commentID, postID) => {
	return (dispatch) => {

		const fetchConfigs = {
			method: 'POST',
			headers: {'Authorization': 'key', "Content-Type": "application/json",},
			body: JSON.stringify({
				option: "upVote"
			})
		};

		fetch(`/comments/${commentID}`, fetchConfigs).then(data => {
			dispatch({
				type: UP_VOTE_COMMENT,
				commentID,
				postID
			})
		});


	}
};
export const downVoteComment = (commentID, postID) => {
	return (dispatch) => {

		const fetchConfigs = {
			method: 'POST',
			headers: {'Authorization': 'key', "Content-Type": "application/json",},
			body: JSON.stringify({
				option: "downVote"
			})
		};

		fetch(`/comments/${commentID}`, fetchConfigs).then(data => {
			dispatch({
				type: DOWN_VOTE_COMMENT,
				commentID,
				postID
			})
		});

	}
};
