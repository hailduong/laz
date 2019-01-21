import React from "react";
import SideBar from "../global/SideBar";
import Sort from "../global/Sort";
import Post from "./PostItem";
import sortBy from "sort-by";


class ListPage extends React.Component {

	constructor() {
		super();

		// TODO: not working so well here :-( need to fix this T_T
		this.state = {
			sort: "-itemRatingScore",
			categories: []
		}
	}

	sort = (sortOrder) => {
		this.setState({
			sort: sortOrder
		});
	};

	render() {

		const sortOrder = this.state.sort;
		const postsNode = (() => {

			if (Array.isArray(this.props.posts)) {
				const sortedPosts = this.props.posts.sort(sortBy(sortOrder));

				return sortedPosts.map((post, index) => {

					// Only return posts that are not deleted
					if (!post.deleted) {
						return <Post key={post.id} content={post}/>
					}

				});
			}

			return null;
		})();


		const totalNumberOfProducts = this.props.posts.filter((post) => !post.deleted).length;
		const sidebarCategories = this.props.globalData && this.props.globalData.categories || [];

		return (
			<div className="container page__list-all-post">
				<div className="row">
					<div className="col-12 col-lg-8">
						<div className="row m-b-lg">
							<div className="col-6"><span
								className='all-products'>All products: <strong>{totalNumberOfProducts}</strong></span>
							</div>
							<div className="col-6 d-none d-lg-block d-xl-block"><Sort sort={this.sort}/></div>
						</div>
						<div className="global__main-content">
							{postsNode}
						</div>
					</div>
					<div className="col-lg-1 d-none d-lg-block d-xl-block"></div>
					<div className="col-lg-3 d-none d-lg-block d-xl-block">
						<SideBar categories={sidebarCategories}/>
					</div>
				</div>
			</div>
		)
	}

	componentDidMount() {

		// Get all posts
		// TODO: should have a condition here, no need to fetch if we have already
		this.props.getAllPosts();

		// Get all the categories for the sidebar.
		// TODO: should have a condition here, no need to fetch if we have already
		this.props.getAllCategories();
	}

}


export default ListPage;
