import Axios from 'axios';

const baseUrl = 'https://pelard-n.herokuapp.com';
const secret = '2cfb9e9a-34a9-4843-961f-6e2639c41856-b10445eb-a0e8-4fa2-b636-015b2f1e3660';

// export const userRegistration = async (data) => {
// 	try {
// 		const token = await Axios.post('https://pelrard-n.heokuapp.com/token/generate', { secret });
// 		console.log(token);
// 		if (token.data.data.token) {
// 			const response = await Axios.post('https://pelard-n.herokuapp.com/user/register', { ...data });
// 			console.log('response from registering', response);
// 		} else return token;
// 	} catch (error) {}
// };

//GET TOKEN REQUEST
export const getToken = async ({ secret, _id }) => {
	const response = await fetch(`${baseUrl}/token/generate`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ secret, _id })
	});

	const json = await response.json();
	// console.log(json);
	return json.data.token;
};

//USER REGISTRATION REQUEST
export const userRegistration = async (data) => {
	console.log(data);
	try {
		const token = await getToken({ secret });
		const response = await fetch(`${baseUrl}/user/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token
			},
			body: JSON.stringify(data)
		});

		const json = await response.json();
		console.log('Registration');
		console.log(json);
	} catch (errors) {
		console.log(errors);
	}
};

//USER LOGIN REQUEST
export const userLogin = async (userName, password) => {
	const token = await getToken({ secret });
	console.log('fetch token', token);
	const response = await fetch(`${baseUrl}/user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		},
		body: JSON.stringify({ userName, password })
	});
	const json = await response.json();
	// json.payload.data.token = token;
	const userdata_token = Object.assign({}, json, { token: token });

	console.log('token', userdata_token);
	return userdata_token;
};

//GET ALL REPORTED CASES REQUEST
export const getReportedCases = async () => {
	const token = await getToken({ secret });
	const response = await fetch(`${baseUrl}/violations`, {
		method: 'GET',
		headers: {
			Authorization: token
		}
	});
	const json = await response.json();

	return json;
};

//RESET PASSWORD EMAIL POST REQUEST
export const resetAdminPassword = async ({ identifier }) => {
	const token = await getToken({ secret });
	const response = await fetch(`${baseUrl}/email/request-password-reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		},
		body: JSON.stringify({ identifier })
	});
	const json = await response.json();
	return json;
};
