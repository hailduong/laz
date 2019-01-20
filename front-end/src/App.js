import React, {Component} from 'react';
import Navbar from "./global/Navbar";
import ListPage from "./posts/PostListPage";
import PostDetailPage from "./posts/PostDetailPage";
import * as actionsObject from "./posts/PostActions";
import * as globalActions from "./global/GlobalActions";

import {BrowserRouter, Route} from 'react-router-dom'


import {connect} from "react-redux";

class App extends Component {
	render() {

		const {
			getAllPosts, getCategoryPosts, posts, comments,
			globalData, getAllCategories
		} = this.props;

		return (
			<BrowserRouter>
				<div>
					<Navbar/>
					<Route exact path="/" render={() => {
						return (
							<ListPage getAllPosts={getAllPosts}
									  posts={posts}
									  comments={comments}
									  globalData={globalData}
									  getAllCategories={getAllCategories}
							/>
						)
					}}/>
					<Route exact path="/item/:itemId" render={(props) => {
						return (
							<PostDetailPage match={props.match}
											globalData={globalData}
											getAllCategories={getAllCategories}
							/>
						)
					}}/>
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = ({posts, comments, globalData}) => ({
	posts, comments, globalData
});

const mapDispatchToProps = (dispatch) => ({
	getSinglePost: (postID) => {
		dispatch(actionsObject.getSinglePost(postID))
	},
	getAllPosts: () => {
		dispatch(actionsObject.getAllPosts())
	},
	getCategoryPosts: (category) => {
		dispatch(actionsObject.getCategoryPosts(category))
	},
	addNewPost: ({id, timestamp, postTitle, postContent, postAuthor, postCategory} = {}) => {
		dispatch(actionsObject.addNewPost({id, timestamp, postTitle, postContent, postAuthor, postCategory}))
	},
	editPost: ({id, title, body}) => {
		dispatch(actionsObject.editPost({id, title, body}))
	},
	getAllCategories: () => {
		dispatch(globalActions.getAllCategories())
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
