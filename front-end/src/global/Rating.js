import React from "react";

const Rating = (props = {rating: 0}) => {
	const rating = props.rating;
	const numberOfStars = Math.floor(rating);
	const thereIsAHalfStar = rating - numberOfStars > 0;

	if (rating > 0) {

		const starArray = [];
		for (let i = 0; i < numberOfStars; i++) {
			starArray.push(<span key={i}><i className="fa fa-fw fa-star" aria-hidden="true"></i></span>);
		}

		if (thereIsAHalfStar) {
			starArray.push(<span key={numberOfStars}>
				<i className="fa fa-fw fa-star-half-o" aria-hidden="true"></i>
			</span>);
		}

		return <span className='rating'>{starArray}</span>;

	}
	return null
};

export default Rating
