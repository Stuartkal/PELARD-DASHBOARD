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

export const login = async (userName, password) => {
  const Authorization = await getToken();
  const response = await fetch(`${baseUrl}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
    body: JSON.stringify({ userName, password }),
  });

  const json = await response.json();

  return json;
};

export const register = async (body) => {
  const response = await fetch(`${baseUrl}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await response.json();

  return json.data.token;
};

export const resetPassword = async (identifier) => {
  const Authorization = await getToken();
  const response = await fetch(`${baseUrl}/email/request-password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
    body: JSON.stringify({ identifier }),
  });
  const json = await response.json();

  return json;
}
