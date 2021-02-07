const baseUrl = 'https://pelard-n.herokuapp.com';
const secret = '2cfb9e9a-34a9-4843-961f-6e2639c41856-b10445eb-a0e8-4fa2-b636-015b2f1e3660';

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
	// console.log('token response', json);
	return json.data.token;
};

//USER REGISTRATION REQUEST
export const userRegistration = async (data) => {
	// console.log(data);
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
		return response;
		// const json = await response.json();
		// // console.log('Registration');
		// // console.log(json);
	} catch (errors) {
		console.log(errors);
	}
};

//USER LOGIN REQUEST
export const userLogin = async (userName, password) => {
	const token = await getToken({ secret });
	// console.log('fetch token', token);
	const response = await fetch(`${baseUrl}/user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		},
		body: JSON.stringify({ userName, password })
	});
	const json = await response.json();
	// console.log('userId', json);
	// json.payload.data.token = token;
	const userdata_token = Object.assign({}, json, { token: token });

	// console.log('token', userdata_token);
	return userdata_token;
};

//GET ALL REPORTED CASES REQUEST
export const getReportedCases = async (_id) => {
	// console.log('my request', JSON.stringify(_id));
	const token = await getToken({ secret, _id });

	const response = await fetch(`${baseUrl}/violations?range={"start": "2020-01-01", "end": "2021-12-31"}&limit=74`, {
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

//UDATE VIOLATION
// export const updateViolation = async (
// 	id,
// 	reporterName,
// 	reporterContact,
// 	dateTime,
// 	violationType,
// 	violationDescription,
// 	village,
// 	districtOfViolation,
// 	victimName,
// 	otherVictim,
// 	suspectName,
// 	otherSuspect,
// 	witnessName,
// 	otherSuspect,
// 	otherWitness,
// 	injuries,
// 	secure_url,
// 	contactAuthority,
// 	authorityResponse,
// 	otherViolation,
// 	fileDescription,
// 	secure_url

// 	) => {
// 	try {
// 		const token = await getToken({secret});
// 	const response = await fetch(`${baseUrl}/violation/${id}`, {
// 		method: 'POST',
// 		headers: {
// 			'content-Type' : 'application/json',
// 		},
// 		body: JSON.stringify(
// 			{
// 				reporter: {
// 					name: reporterName,
// 					contact: reporterContact,
// 				},
// 				dateTime: dateTime,
// 				type: violationType,
// 				description: violationDescription,
// 				location: {
// 				  name:village,
// 				  district: districtOfViolation
// 				  },

// 				involved: [
// 					{ type: "victim", name: victimName,
// 					relevantLinks:[
// 					{
// 					  description:otherVictim,
// 					  link:'string'
// 					  }
// 					]
// 					},

// 					{ type: "suspect", name: suspectName,
// 					relevantLinks:[
// 					{
// 					  description:otherSuspect,
// 					  link:'string'
// 					  }
// 					]
// 					 },
// 					{ type: "witness", name: witnessName,
// 					relevantLinks:[
// 					{
// 					  description:otherWitness,
// 					  link:'string'
// 					  }
// 					]
// 					 },
// 				],
// 				 injuries: [
// 				  {
// 					description: injuries,
// 					link:secure_url
// 				  }
// 				],
// 				authorityResponse:[
// 					{ name: contactAuthority, response: authorityResponse,
// 					 relevantLinks:[
// 					{
// 					  description:otherViolation,
// 					  link:fileDescription
// 					  }
// 					]
// 					 },

// 				],
// 				otherInfo: [
// 				  {
// 					description: "string",
// 					link:secure_url
// 				  }
// 				]
// 			}
// 		)
// 	})
// 	}
// 	catch(errors) {
// 		console.log(errors)
// 	}
// }
