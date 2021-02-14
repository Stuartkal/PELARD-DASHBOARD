import { getToken } from "./auth";
import { baseUrl } from "./config";

export const getReportedCases = async (
  _id,
  pageIndex,
  pageSize = 10,
  filter,
  range
) => {
  const Authorization = await getToken(_id);
  let url = `${baseUrl}/violations?page=${
    pageIndex + 1
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

export const getSingleCase = async (_id, id) => {
  const Authorization = await getToken(_id);
  const url = `${baseUrl}/violations/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization,
    },
  });

  const json = await response.json();
  return json;
};

export const deleteCase = async (_id, id) => {
  const Authorization = await getToken(_id);
  const url = `${baseUrl}/violations/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization,
    },
  });

  const json = await response.json();
  return json;
};

export const updateCase = async (_id, id, body) => {
  const Authorization = await getToken(_id);
  const url = `${baseUrl}/violations/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization,
    },
    body: JSON.stringify(body),
  });

  const json = await response.json();

  return json;
};

export const updateUserRole = async (_id ,role) => {
  const Authorization = await getToken(_id);
  const url = `${baseUrl}/user/${_id}/apply`

  const response = await fetch(url,{
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization
    },
    body: JSON.stringify({role}),
  })

  const json = await response.json()
 
  return json
}

export const generatePdf = (id) => {
  window.open(
    `https://pelard-n.herokuapp.com/documents/${id}/generate-pdf`,
    "_blank"
  ) ||
    (window.location.href = `https://pelard-n.herokuapp.com/documents/${id}/generate-pdf`);
};
