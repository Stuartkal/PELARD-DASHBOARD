import { baseUrl, secret } from "./config";

export const getToken = async (_id) => {
  const response = await fetch(`${baseUrl}/token/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ secret, _id }),
  });

  const json = await response.json();

  return json.data.token;
};

export const getUsers = async (_id) => {
    const Authorization = await getToken(_id)
    const url = `${baseUrl}/admin/users`

    const response = await fetch(url,{
        method: 'GET',
        headers:{
            Authorization
        }
    })

    const json = await response.json()
    return json
}

export const getApplications = async (_id) => {
    const Authorization = await getToken(_id)
    const url = `${baseUrl}/admin/applications`

    const response = await fetch(url,{
        method: 'GET',
        headers:{
            Authorization
        }
    })

    const json = await response.json()
    return json
}

export const deleteUser = async (_id) => {
    const Authorization = await getToken(_id)
    const url = `${baseUrl}/admin/users/${_id}`

    const response = await fetch(url,{
        method: 'DELETE',
        headers:{
            Authorization
        }
    })

    const json = await response.json()
    return json
}

export const updateUser = async (_id,body) => {
    const Authorization = await getToken(_id)
    const url = `${baseUrl}/admin/users/${_id}`

    const response = await fetch(url,{
        method: 'PUT',
        headers:{
            "Content-Type": "application/json",
            Authorization
        },
        body: JSON.stringify(body),
    })

    const json = await response.json()
    return json
}

export const updateUserRole = async (_id,applicationId) => {
    const Authorization = await getToken(_id)
    const url = `${baseUrl}/admin/users/${_id}/update-role`

    const response = await fetch(url,{
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            Authorization
        },
        body: JSON.stringify({applicationId}),
    })

    const json = await response.json()
    return json
}

export const getApplication = async (_id,applicationId) => {
    const Authorization = await getToken(_id)
    const url = `${baseUrl}/admin/applications${applicationId}`

    const response = await fetch(url,{
        method: 'GET',
        headers:{
            Authorization
        }
    })

    const json = await response.json()
    return json
}

