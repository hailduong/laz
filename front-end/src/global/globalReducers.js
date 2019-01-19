import * as actionsObject from './GlobalActions';

const initialGlobalState = {
	categories: []
};

const globalReducer = function (state = initialGlobalState, action) {

	switch (action.type) {
		case actionsObject.GET_ALL_CATEGORIES: {
			return {
				categories: [...action.categories]
			}
		}

		default:
			return state;
	}
};

export default globalReducer;
