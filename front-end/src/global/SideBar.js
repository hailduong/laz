import React from "react";
import {NavLink} from "react-router-dom"

function SideBar(props) {
	const categories = props.categories;
	const listOfNavLink = categories.map((data, index) => {
		return (
			<li key={index}><NavLink to="#">{data.name}</NavLink></li>
		)
	});
	return (
		<div className="global__sidebar">
			<h3 className="m-t-none m-b-lg">Categories</h3>
			<ol className="categories">
				{listOfNavLink}
			</ol>
		</div>
	)
}

export default SideBar;
