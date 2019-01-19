import React from "react";
import SideBar from "../global/SideBar";
import * as actionsObject from "./PostActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Redirect} from 'react-router';
import CommentList from "../comments/CommentList";
import moment from "moment";

class PostPage extends React.Component {

	handleUpVote = () => {
		const thisPostID = this.props.posts[0].id;
		this.props.upVotePost(thisPostID);
	};

	handleDownVote = () => {
		const thisPostID = this.props.posts[0].id;
		this.props.downVotePost(thisPostID);
	};

	handleEditPost = () => {
		// TODO: Edit Post
	};

	handleDeletePost = () => {
		const postID = this.props.posts[0].id;
		this.props.deletePost(postID);
	};

	render() {

		const {id, timestamp, title, body, author, category, voteScore, deleted} = this.props.posts[0];
		const editLink = `/edit-post/${id}`;
		const paramPostID = this.props.match.params.post;
		const formattedDate = moment(timestamp).format("MMM DD YYYY");

		let {thumbnailURL} = this.props.posts[0];
		const randomNumber = Math.floor(Math.random() * 8) + 1;
		if (!thumbnailURL) thumbnailURL = `.assets/images/${randomNumber}.jpg`;

		// Redirect to home page if the post is deleted;
		if (!id || deleted) {
			return (
				<Redirect to="/"/>
			)
		}


		// Otherwise, just render it.
		return (
			<div className="container post-page animated fadeIn">
				<div className="col-sm-8">
					<div className="global__main-content">
						<div className="post">
							<h3 className="m-t-none">{title}</h3>
							<div className="thumbnail">
								<img className="img-fluid" src={thumbnailURL} alt=""/>
							</div>
							<p>
								Category: <strong>{category}</strong> |
								Author: <strong>{author}</strong> |
								VoteScore: <strong>{voteScore}</strong> |
								Time: <strong>{formattedDate}</strong>
							</p>
							<p>{body}</p>
							<div className="btn-group actions m-r-sm" role="group">
								<button onClick={this.handleUpVote} type="button" className="btn btn-default">Up Vote</button>
								<button onClick={this.handleDownVote} type="button" className="btn btn-default">Down Vote</button>
							</div>
							<div className="btn-group actions" role="group">
								<Link to={editLink} onClick={this.handleEditPost} className="btn btn-default">Edit</Link>
								<button onClick={this.handleDeletePost} type="button" className="btn btn-default">Delete</button>
							</div>
						</div>
						<CommentList postID={paramPostID}/>
					</div>
				</div>
				<div className="col-sm-1"></div>
				<div className="col-sm-3">
					<SideBar/>
				</div>
			</div>
		)
	}

	componentDidMount() {
		const postID = this.props.match.params.post;
		this.props.getSinglePost(postID);
	}

}

const mapStateToProps = (state) => ({
	posts: state.posts
});

const mapDispatchToProps = (dispatch) => ({
	upVotePost: (postID) => {
		dispatch(actionsObject.upVotePost(postID))
	},
	downVotePost: (postID) => {
		dispatch(actionsObject.downVotePost(postID))
	},
	deletePost: (postID) => {
		dispatch(actionsObject.deletePost(postID))
	},
	editPost: ({id, title, body}) => {
		dispatch(actionsObject.editPost({id, title, body}))
	},
	getSinglePost: (postID) => {
		dispatch(actionsObject.getSinglePost(postID))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
