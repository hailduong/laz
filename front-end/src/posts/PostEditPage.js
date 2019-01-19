import React from "react";
import EditForm from "./PostEditForm";
import serialize from "form-serialize"

class EditPostPage extends React.Component {

	handleFormSubmit = (event) => {
		event.preventDefault();
		const formObject = serialize(event.target, {hash: true});
		const title = formObject.postTitle;
		const body = formObject.postContent;
		const postID = this.props.match.params.postID;
		this.props.editPost({id: postID, title, body});
		this.props.history.go(-1);
	};

	render() {

		const postID = this.props.match.params.postID;
		const thisPostObject = this.props.posts.filter((post) => post.id.toString() === postID)[0];
		
		return (
			<div className="container animated fadeIn">
				<div className="col-sm-12">
					<h1>Edit Post</h1>
					<EditForm post={thisPostObject}
							  postID={postID}
							  handleFormSubmit={this.handleFormSubmit}
					/>
				</div>
			</div>
		)
	}

	componentDidMount() {
		const postID = this.props.match.params.postID;
		const thisPostObject = this.props.posts.filter((post) => post.id === postID)[0];
		if (!thisPostObject) {
			this.props.getSinglePost(postID)
		}
	}
}

export default EditPostPage;