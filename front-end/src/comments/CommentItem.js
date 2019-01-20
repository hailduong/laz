import React from "react";

class Comment extends React.Component {

	constructor() {
		super();

		this.state = {
			editing: false,
			editAuthor: null,
			editContent: null
		}
	}

	editComment = () => {
		const {body} = this.props.comment;
		this.setState({
			editing: true,
			editContent: body
		})
	};

	handleUpVoteComment = () => {
		const commentID = this.props.comment.id;
		const postID = this.props.postID;
		this.props.actions.upVoteComment(commentID, postID);
	};

	handleDownVoteComment = () => {
		const commentID = this.props.comment.id;
		const postID = this.props.postID;
		this.props.actions.downVoteComment(commentID, postID)
	};

	handleDeleteComment = () => {
		const commentID = this.props.comment.id;
		const postID = this.props.postID;
		this.props.actions.deleteComment(commentID, postID)
	};

	handleEditComment = (event) => {
		event.preventDefault();
		const commentID = this.props.comment.id;
		const parentId = this.props.comment.parentId;
		const commentBody = this.state.editContent;
		this.props.actions.editComment({
			id: commentID,
			timestamp: Date.now(),
			body: commentBody,
			parentId: parentId
		});
		this.setState({
			editing: false
		})
	};

	handleContentChange = (event) => {
		this.setState({editContent: event.target.value})
	};

	render() {

		const commentPlaceHolderImage = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNWU2Yjc4NmYzMyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1ZTZiNzg2ZjMzIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMy40Njg3NSIgeT0iMzYuNSI+NjR4NjQ8L3RleHQ+PC9nPjwvZz48L3N2Zz4=";
		const {author, body, voteScore} = this.props.comment;

		const {editing} = this.state;

		const editCommentForm = (() => {
			if (editing) {
				return (
					<div className="new-comment m-b-lg m-t">
						<form onSubmit={this.handleEditComment} name="formAddComment">
							<textarea name="body" onChange={this.handleContentChange} value={this.state.editContent}
									  className="form-control m-b-sm" rows="5" placeholder="Comment"></textarea>
							<button type="submit" className="btn btn-primary btn-sm">Update Comment</button>
						</form>
					</div>
				)
			}

			return null;

		})();

		return (
			<li className="media m-b-lg">
				<div className="media-left">
					<a href="#">
						<img className="media-object" src={commentPlaceHolderImage}/>
					</a>
				</div>
				<div className="media-body">
					<h4 className="media-heading">{author}</h4>
					<div>{body}</div>
					<div>Votes: {voteScore}</div>
				</div>
				<div className="media-actions m-t">
					<div className="btn-group btn-group-sm m-r-sm">
						<button onClick={this.handleUpVoteComment} type="button" className="btn btn-default">Up Vote
						</button>
						<button onClick={this.handleDownVoteComment} type="button" className="btn btn-default">Down
							Vote
						</button>
					</div>
					<div className="btn-group btn-group-sm">
						<button onClick={this.editComment} type="button" className="btn btn-default">Edit</button>
						<button onClick={this.handleDeleteComment} type="button" className="btn btn-default">Delete
						</button>
					</div>
				</div>
				{editCommentForm}
			</li>
		)
	}
}

export default Comment;
