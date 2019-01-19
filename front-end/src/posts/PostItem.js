import React from "react";
import * as actionsObject from "./PostActions";
import * as commentActionsObject from "../comments/CommentActions"
import {Link} from "react-router-dom";

import {connect} from "react-redux";

class Post extends React.Component {

	handleUpVote = () => {
		const thisPostID = this.props.content.id;
		this.props.upVotePost(thisPostID);
	};

	handleDownVote = () => {
		const thisPostID = this.props.content.id;
		this.props.downVotePost(thisPostID);
	};

	handleDeletePost = () => {
		const postID = this.props.content.id;
		this.props.deletePost(postID);
	};

	render() {

		const {
			itemId, timestamp, itemTitle, body, author, category, voteScore, deleted, itemImg,
			currency, itemPrice, itemDiscountPrice, itemDiscount, itemRatingScore
		} = this.props.content;


		const postLink = `/item/${itemId}`;

		const postComments = (() => {
			if (!!this.props.comments && !!this.props.comments[itemId]) {
				return this.props.comments[itemId];
			}
			return [];
		})();

		const numberOfComments = postComments.length;
		const price = `${itemPrice}${currency}`;
		const discountedPrice = `${itemDiscountPrice}${currency}`;

		const priceNode = itemPrice
			? <span><span className='original-price'>{price}</span> - <strong>{discountedPrice}</strong></span>
			: <span><strong>{discountedPrice}</strong></span>;

		const discountBadgeNode = itemDiscount
			? <span className='badge badge-success mr-1'>{itemDiscount} off</span>
			: null;

		return (
			<div className="row global__post m-b-xl animated fadeIn" data-id={itemId}>
				<div className="col-sm-4">
					<div className="thumbnail">
						<img className="img-fluid" src={itemImg}/>
					</div>
				</div>
				<div className="col-sm-8 caption">
					<h3 className="m-t-none"><a className="post-title" href={postLink}>{itemTitle}</a></h3>
					<p>{body}</p>
					<p>
						{discountBadgeNode}
						{priceNode} |
						Like: <strong>{voteScore}</strong>
						Category: <strong>{category}</strong> |
						Reviews: <strong>{numberOfComments}</strong> |
						Rating: <strong>{itemRatingScore}</strong>
					</p>
					<div className="btn-group btn-group-sm m-r-sm" role="group">
						<button onClick={this.handleUpVote} type="button" className="btn btn-default">Like</button>
						<button onClick={this.handleDownVote} type="button" className="btn btn-default">Dislike
						</button>
					</div>
					<div className="btn-group btn-group-sm" role="group">
						<button className="btn btn-default">Buy Now</button>
						<button className="btn btn-default">Add to Cart</button>
					</div>
				</div>
			</div>
		)
	}

	componentDidMount() {
		const thisPostID = this.props.content.id;
		this.props.getAllComments(thisPostID);
	}
}

const mapStateToProps = (state) => ({
	posts: state.posts,
	comments: state.comments
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
		// TODO: Edit Post
		dispatch(actionsObject.editPost({id, title, body}))
	},
	getAllComments: (postID) => {
		dispatch(commentActionsObject.getAllComments(postID))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
