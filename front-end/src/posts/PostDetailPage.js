import React from "react";
import SideBar from "../global/SideBar";
import Rating from '../global/Rating';
import * as actionsObject from "./PostActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import CommentList from "../comments/CommentList";

class PostPage extends React.Component {

	handleUpVote = () => {
		const thisPostID = this.props.posts[0].id;
		this.props.upVotePost(thisPostID);
	};

	handleDownVote = () => {
		const thisPostID = this.props.posts[0].id;
		this.props.downVotePost(thisPostID);
	};

	handleDeletePost = () => {
		const postID = this.props.posts[0].id;
		this.props.deletePost(postID);
	};

	render() {

		const {
			itemId, itemTitle, body, voteScore, itemImg,
			currency, itemPrice, itemDiscountPrice, itemDiscount, itemRatingScore
		} = this.props.posts[0];


		const paramPostID = this.props.match.params.post;

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

		const sidebarCategories = this.props.globalData && this.props.globalData.categories || [];
		const thumbnailStyle = {
			backgroundImage: `url(${itemImg})`
		};

		return (
			<div className="container page__post-detail animated fadeIn">
				<div className="row">
					<div className="col-sm-8">
						<div className="global__main-content">
							<div className="post">
								<h3 className="m-t-none">{itemTitle}</h3>
								<div className="row">
									<div className="col-sm-4">
										<div className="thumbnail" style={thumbnailStyle}></div>
									</div>
									<div className="col-sm-8">
										<p className='mb-1'>
											{discountBadgeNode}
											{priceNode} |
											Like: <strong>{voteScore}</strong>
										</p>
										<p>
											<Rating rating={itemRatingScore}/>
										</p>
										<p>
											Reviews: <strong>{numberOfComments}</strong>
										</p>
										<div className="actions">
											<div className="btn-group btn-group-sm m-r-sm" role="group">
												<button onClick={this.handleUpVote} type="button"
														className="btn btn-default">
													<i className="fa fa-thumbs-o-up" aria-hidden="true"></i></button>
												<button onClick={this.handleDownVote} type="button"
														className="btn btn-default">
													<i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
												</button>
											</div>
											<div className="btn-group btn-group-sm" role="group">
												<button className="btn btn-default">Add to wish list</button>
												<button className="btn btn-primary"><i className="fa fa-fw fa-cart-plus"
																					   aria-hidden="true"></i>
													Add to Cart
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<CommentList postID={paramPostID}/>
						</div>
					</div>
					<div className="col-sm-1"></div>
					<div className="col-sm-3">
						<SideBar categories={sidebarCategories}/>
					</div>
				</div>
			</div>
		)
	}

	componentDidMount() {
		const itemId = this.props.match.params.itemId;
		this.props.getSinglePost(itemId);

		// Get all the categories for the sidebar if we do not have the data.
		// This is the case when we navigate to this page directly
		if (this.props.globalData.categories.length === 0) {
			this.props.getAllCategories();
		}
	}

}

const mapStateToProps = (state) => ({
	posts: state.posts,
	globalData: state.globalData
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
