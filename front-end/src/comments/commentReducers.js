import * as actionsObject from "./CommentActions";

const initialCommentState = {
	parentId: [
		{
			id: '',
			parentId: '',
			timestamp: 0,
			body: '',
			author: '',
			voteScore: 0,
			deleted: false,
			parentDeleted: false
		}
	]

};

const commentReducer = function(state = initialCommentState, action) {
	switch (action.type) {

		case actionsObject.GET_ALL_COMMENTS: {
			const {comments, postID} = action;
			return {
				...state,
				[postID]: comments
			};
		}

		case actionsObject.GET_SINGLE_COMMENT: {
			return [action.comment]
		}

		case actionsObject.UP_VOTE_COMMENT: {
			const postID = action.postID;
			const commentID = action.commentID;
			const newState = JSON.parse(JSON.stringify(state));
			newState[postID].forEach((comment) => {
				if (comment.id === commentID) {
					comment.voteScore++;
				}
			});

			return newState;
		}

		case actionsObject.DOWN_VOTE_COMMENT: {
			const postID = action.postID;
			const commentID = action.commentID;
			const newState = JSON.parse(JSON.stringify(state));
			newState[postID].forEach((comment) => {
				if (comment.id === commentID) {
					comment.voteScore--;
				}
			});

			return newState;

		}

		case actionsObject.ADD_NEW_COMMENT: {
			const newState = JSON.parse(JSON.stringify(state));
			const newComment = action.commentObject;
			const parentId = newComment.parentId;

			newComment.deleted = false;
			newComment.parentDeleted = false;
			newComment.voteScore = 0;
			newState[parentId].push(newComment);

			return newState;
		}

		case actionsObject.EDIT_COMMENT: {
			const newState = JSON.parse(JSON.stringify(state));

			const {id, timestamp, body, parentId} = action.commentObject;

			newState[parentId].forEach((comment) => {
				if (comment.id === id) {
					comment.body = body;
					comment.timestamp = timestamp;
				}
			});

			return newState
		}

		case actionsObject.DELETE_COMMENT: {

			const newState = JSON.parse(JSON.stringify(state));
			newState[action.postID].forEach((comment, index) => {
				if (comment.id === action.commentID) {
					comment.deleted = true;
				}
			});
			return newState
		}

		default:
			return state;
	}
};

export default commentReducer;