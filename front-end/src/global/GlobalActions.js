export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';

export const getAllCategories = () => {
	return (dispatch) => {

		const postsFetchConfigs = {
			method: 'GET',
			headers: {
				'Authorization': 'key',
				'Content-Type': 'application/json'
			}
		};

		fetch("/categories", postsFetchConfigs)
			.then(response => response.json())
			.then(data => {
				console.log('Categories fetched', data);
				dispatch({
					type: GET_ALL_CATEGORIES,
					categories: data.categories
				})
			});
	}
};
