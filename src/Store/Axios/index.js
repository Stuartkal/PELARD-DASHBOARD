import axios from 'axios';

const secret = '2cfb9e9a-34a9-4843-961f-6e2639c41856-b10445eb-a0e8-4fa2-b636-015b2f1e3660';
const getToken = async () => {
	await axios
		.get('https://pelard-n.herokuapp.com/token/generate', { secret })
		.then((response) => {
			console.log('response from token', response);
			return response.data.token;
		})
		.catch((error) => error.response.data);
};

const _axios = axios.create({
	baseURL: 'https://pelard-n.herokuapp.com',
	headers: {
		'Content-Type': 'application/json',
		Authorization: getToken()
	}
});

export default _axios;
