import React from "react";
import Comment from "./CommentItem";
import {connect} from "react-redux";
import * as actionsObject from "./CommentActions";
import serialize from "form-serialize";

class CommentList extends React.Component {

	handleAddComment = (event) => {
		event.preventDefault();
		const formData = serialize(event.target, {hash: true});
		const postID = this.props.postID;

		// TODO: we might want to validate instead of faking content...
		const commentObject = {
			id: Date.now(),
			timestamp: Date.now(),
			body: formData.body || 'No comment!', // just faking the content for now... ;)
			author: formData.author || 'Anonymous',
			parentId: postID
		};

		this.props.addComment(commentObject);

		// Clear the comment form after adding the comment
		event.target.reset();
	};

	render() {

		const postID = this.props.postID;
		const comments = (() => {
			if (!!this.props.comments[postID]) {
				return this.props.comments[postID].filter(comment => comment.deleted !== true);
			}
			return [];
		})();
		const numberOfComments = comments.length;

		const addCommentForm = (
			<div className="new-comment m-b-xl">
				<form onSubmit={this.handleAddComment} name="formAddComment">
					<input name="author" type="text" className="form-control m-b-sm" placeholder="Your name"/>
					<textarea name="body" className="form-control m-b-sm" rows="5" placeholder="Review"></textarea>
					<button type="submit" className="btn btn-default btn-sm">Add Review</button>
				</form>
			</div>
		);


		// If there is no comment, render the add form.
		if (numberOfComments === 0) {
			return (
				<div className="comments mt-5">
					<h4 className="mb-1">Reviews</h4>
					<p>There is no review currently!
						<br/>
						You might want to be the first to review?
					</p>
					{addCommentForm}
				</div>
			)
		}

		// Otherwise, render comment list with the add form
		//TODO: add edit comment
		const actions = {
			upVoteComment: this.props.upVoteComment,
			downVoteComment: this.props.downVoteComment,
			deleteComment: this.props.deleteComment,
			editComment: this.props.editComment
		};

		const commentNodes = comments.map((comment) => <Comment actions={actions}
																comment={comment}
																postID={postID}
																key={comment.id}/>
		);

		return (
			<div className="comments m-t-lg">
				<h4 className="m-b-md">Reviews ({numberOfComments}):</h4>
				<ul className="list-unstyled">
					{commentNodes}
				</ul>
				{addCommentForm}
			</div>
		)
	}

	componentDidMount() {
		const postID = this.props.postID;
		this.props.getAllComments(postID);
	}

}

const mapStateToProps = (state) => ({
	comments: state.comments
});

// TODO: Currently, get comments will add an extra "parentID", should fix this.
const mapDispatchToProps = (dispatch) => ({
	getAllComments: (postID) => {
		dispatch(actionsObject.getAllComments(postID))
	},
	upVoteComment: (commentID, postID) => {
		dispatch(actionsObject.upVoteComment(commentID, postID))
	},
	downVoteComment: (commentID, postID) => {
		dispatch(actionsObject.downVoteComment(commentID, postID))
	},
	deleteComment: (commentID, postID) => {
		dispatch(actionsObject.deleteComment(commentID, postID))
	},
	addComment: ({id, timestamp, body, author, parentId}) => {
		dispatch(actionsObject.addNewComment({id, timestamp, body, author, parentId}))
	},
	editComment: ({id, timestamp, body, parentId}) => {
		dispatch(actionsObject.editComment({id, timestamp, body, parentId}))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
