import React from "react";

class EditForm extends React.Component {

	constructor() {
		super();
		this.state = {}
	}

	handleTitleChange = (event) => {
		this.setState({title: event.target.value})
	};

	handleContentChange = (event) => {
		this.setState({body: event.target.value})
	};

	componentWillReceiveProps(nextProps) {
		if (!this.props.post) {
			this.setState(nextProps.post)
		}
	}

	render() {
		let {title, body, category, author} = this.state;

		return (
			<form onSubmit={this.props.handleFormSubmit}>
				<div className="form-group">
					<label htmlFor="postTitle">Title</label>
					<input type="text" value={title} onChange={this.handleTitleChange} name="postTitle" className="form-control"
						   id="postTitle"
						   placeholder="Post Title"/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Content</label>
					<textarea value={body} onChange={this.handleContentChange} name="postContent" id="postContent" rows="10"
							  className="form-control"></textarea>
				</div>
				<div className="form-group">
					<label htmlFor="postAuthor">Category</label>
					<select name="postCategory" value={category} disabled id="postCategory" className="form-control">
						<option selected value="react">React</option>
						<option value="redux">Redux</option>
						<option value="udacity">Udacity</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="postAuthor">Author</label>
					<input type="text" value={author} disabled name="postAuthor" className="form-control" id="postAuthor"
						   placeholder="Post Author"/>
				</div>
				<button type="submit" className="btn btn-primary">Submit Changes</button>
			</form>
		)
	}

	componentDidMount() {
		this.setState(this.props.post)
	}

}

export default EditForm