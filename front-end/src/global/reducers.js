import {combineReducers} from "redux";

import postReducers from "../posts/postReducers";
import commentReducers from "../comments/commentReducers";
import globalReducers from "./globalReducers";

export default combineReducers({
	posts: postReducers,
	comments: commentReducers,
	globalData: globalReducers
})
