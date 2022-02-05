import { getToken } from "./auth";
import { baseUrl } from "./config";

export const monthlyReport = async (_id, year) => {
  const Authorization = await getToken(_id);
  const url = `${baseUrl}/reports/monthly?year=${year}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization,
    },
  });

  const json = await response.json();
  // console.log(json,'report');
  return json;
};

export const districtReport = async (_id) => {
  const Authorization = await getToken(_id);
  const url = `${baseUrl}/reports/districts`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization,
    },
  });

  const json = await response.json();
  return json;
};
