import React from "react";

const Sort = (props) => {

	const sortByPrice = () => {
		props.sort("-itemDiscountPrice")
	};

	const sortByRating = () => {
		props.sort("-itemRatingScore")
	};


	return (
		<div className="sort text-right awe-check d-flex align-items-center justify-content-end">
			<span className="m-r-sm">Sort by:</span>
			<span className="radio-inline radio radio-success">
				<input defaultChecked={true} type="radio" onClick={sortByPrice} name="sortPosts" id="sort-by-price" value="price"/>
				<label htmlFor="sort-by-price">Price</label>
			</span>
			<span className="radio-inline radio radio-success">
				<input type="radio" onClick={sortByRating} name="sortPosts" id="sort-by-rating" value="rating"/>
				<label htmlFor="sort-by-rating">Rating</label>
			</span>
		</div>
	)

};

export default Sort;
