import * as actionsObject from "./PostActions";

const initialPostState = [
	{
		id: 'sample',
		timestamp: 0,
		title: '',
		body: '',
		author: '',
		category: '',
		voteScore: 0,
		deleted: false,
		thumbnailURL: ""
	}
];

const postReducer = function (state = initialPostState, action) {
	switch (action.type) {

		case actionsObject.GET_ALL_POSTS: {
			const newState = [];
			for (let propName in action.posts) {
				if (action.posts.hasOwnProperty(propName)) {
					newState.push(action.posts[propName])
				}
			}
			return newState;
		}


		case actionsObject.GET_SINGLE_POST: {
			return [action.post]
		}

		case actionsObject.UP_VOTE_POST: {

			return state.map((post) => {
				if (post.id === action.postObject.id) {
					return {
						...post,
						voteScore: post.voteScore + 1
					};
				}

				return post;
			});

		}

		case actionsObject.DOWN_VOTE_POST: {

			return state.map((post) => {
				if (post.id === action.postObject.id) {
					return {
						...post,
						voteScore: post.voteScore - 1
					};
				}

				return post;
			});

		}

		default:
			return state;
	}
};


export default postReducer;
