import { getToken } from "./auth";
import { baseUrl } from "./config";

export const monthlyReport = async (_id) => {
  const Authorization = await getToken(_id);
  const response = await fetch(`${baseUrl}/reports/monthly`, {
    method: "GET",
    headers: {
      Authorization,
    },
  });

  const json = await response.json();
  return json;
};

export const districtReport = async (_id) => {
  const Authorization = await getToken(_id);
  const response = await fetch(`${baseUrl}/reports/districts`, {
    method: "GET",
    headers: {
      Authorization,
    },
  });

  const json = await response.json();
  return json;
};
