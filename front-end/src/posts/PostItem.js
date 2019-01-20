import React from "react";
import * as actionsObject from "./PostActions";
import * as commentActionsObject from "../comments/CommentActions"
import Rating from '../global/Rating';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

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
			itemId, itemTitle, body, voteScore, itemImg,
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

		const discountBadgeNode = itemDiscount
			? <span className='badge badge-success mr-2'>{itemDiscount} off</span>
			: null;

		const priceNode = itemPrice
			? <span>
				<strong className='text-primary'>{discountedPrice}</strong>
				<span className='mr-2 ml-2'>-</span>
				<span className='original-price'>{price}</span>
			  </span>
			: <span><strong>{discountedPrice}</strong></span>;

		const thumbnailStyle = {
			backgroundImage: `url(${itemImg})`
		};

		return (
			<div className="row global__post m-b-xl animated fadeIn" data-id={itemId}>
				<div className="col-sm-4">
					<div className="thumbnail" style={thumbnailStyle}></div>
				</div>
				<div className="col-sm-8 caption">
					<h3 className="m-t-none"><Link className="post-title" to={postLink}>{itemTitle}</Link></h3>
					<p>{body}</p>
					<p className='mb-1'>
						{discountBadgeNode}
						{priceNode} |
						Like: <strong>{voteScore}</strong>
					</p>
					<p>
						<Rating rating={itemRatingScore}/>
						{itemRatingScore > 0 && <span className='ml-2 mr-2'>|</span>}
						Reviews: <strong>{numberOfComments}</strong>
					</p>
					<div className="btn-group btn-group-sm m-r-sm" role="group">
						<button onClick={this.handleUpVote} type="button" className="btn btn-default">
							<i className="fa fa-thumbs-o-up" aria-hidden="true"></i></button>
						<button onClick={this.handleDownVote} type="button" className="btn btn-default">
							<i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
						</button>
					</div>
					<div className="btn-group btn-group-sm" role="group">
						<button className="btn btn-default">Add to wish list</button>
						<button className="btn btn-default"><i className="fa fa-fw fa-cart-plus" aria-hidden="true"></i>
							Add to Cart
						</button>
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
