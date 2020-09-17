// import axios from 'axios';

// const baseUrl = 'https://pelard-n.herokuapp.com';
// const secret = '2cfb9e9a-34a9-4843-961f-6e2639c41856-b10445eb-a0e8-4fa2-b636-015b2f1e3660';

// //GET TOKEN REQUEST
// export const getToken = async ({ secret, _id }) => {
// 	const response = await fetch(`${baseUrl}/token/generate`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({ secret, _id })
// 	});

// 	const json = await response.json();
// 	// console.log('token response', json);
// 	return json.data.token;
// };

// export const getDistrictTotalCases = async (_id, data) => {
// 	const token = await getToken({ secret, _id });

// 	axios
// 		.get(`${baseUrl}/reports/districts`, {
// 			method: 'GET',
// 			headers: {
// 				'content-Type': 'application/json',
// 				Authorization: token
// 			}
// 		})
// 		.then((res) => {
// 			console.log(res.data.data);
// 			return res.data.data;
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// 	return data;
// };
