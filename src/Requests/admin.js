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

export const getUsers = async ({
    _id,
    pageIndex,
    pageSize = 10,
    filter,
    range,
}) => {
    const Authorization = await getToken(_id);
    let url = `${baseUrl}/admin/users?page=${pageIndex + 1
        }&limit=${pageSize}&filter=${JSON.stringify(filter)}`;

    if (range.start && range.end) {
        url = `${url}&range=${JSON.stringify(range)}`;
    }

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization,
        },
    });

    const json = await response.json();
    return json;
};

export const getApplications = async (
    _id,
    pageIndex,
    pageSize = 10,
    filter
) => {
    const Authorization = await getToken(_id);
    const url = `${baseUrl}/admin/applications?page=${pageIndex + 1
        }&limit=${pageSize}&filter=${JSON.stringify(filter)}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization,
        },
    });

    const json = await response.json();
    return json;
};

export const deleteUser = async (_id, userId) => {
    const Authorization = await getToken(_id);
    const url = `${baseUrl}/admin/users/${userId}`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization,
        },
    });

    const json = await response.json();
    return json;
};

export const updateUser = async (
    _id,
    userId,
    firstName,
    lastName,
    phoneNumber,
    email,
    userName,
    role
) => {
    const Authorization = await getToken(_id);
    const url = `${baseUrl}/admin/users/${userId}`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization,
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            userName: userName,
            role: role
        }),
    });
    const json = await response.json();
    return json;
};

export const updateUserRoleAdmin = async (_id, applicationId) => {
    const Authorization = await getToken(_id);
    const url = `${baseUrl}/admin/applications/${applicationId}`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization,
        },
        body: JSON.stringify({ status: "Approved" }),
    });

    const json = await response.json();
    return json;
};

export const getApplication = async (_id, applicationId) => {
    const Authorization = await getToken(_id);
    const url = `${baseUrl}/admin/applications/${applicationId}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization,
        },
    });

    const json = await response.json();
    return json;
};
