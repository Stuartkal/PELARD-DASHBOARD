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
  let url = `${baseUrl}/violations?page=${pageIndex + 1
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

export const updateCase = async (
  _id,
  id,
  reporterName,
  reporterContact,
  violationType,
  violationDescription,
  village,
  districtOfViolation,
  // victimName,
  // otherVictim,
  // suspectName,
  // otherSuspect,
  // witnessName,
  // otherWitness,
  // injuries,
  // secure_url,
  // contactAuthority,
  // authorityResponse,
  // otherViolation,
  // fileDescription
) => {
  const Authorization = await getToken(_id);
  const url = `${baseUrl}/violations/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
    body: JSON.stringify({
      type: violationType,
      description: violationDescription,
      reporter: {
        name: reporterName,
        contact: reporterContact
      },
      location: {
        name: village,
        district: districtOfViolation
      },
      // involved: [
      //   {
      //     type: "victim", name: victimName,
      //     relevantLinks: [
      //       {
      //         description: otherVictim,
      //         link: 'string'
      //       }
      //     ]
      //   },

      //   {
      //     type: "suspect", name: suspectName,
      //     relevantLinks: [
      //       {
      //         description: otherSuspect,
      //         link: 'string'
      //       }
      //     ]
      //   },
      //   {
      //     type: "witness", name: witnessName,
      //     relevantLinks: [
      //       {
      //         description: otherWitness,
      //         link: 'string'
      //       }
      //     ]
      //   },
      // ],
      // injuries: [
      //   {
      //     description: injuries,
      //     link: secure_url
      //   }
      // ],
      // authorityResponse: [
      //   {
      //     name: contactAuthority, response: authorityResponse,
      //     relevantLinks: [
      //       {
      //         description: otherViolation,
      //         link: fileDescription
      //       }
      //     ]
      //   },

      // ],
      // otherInfo: [
      //   {
      //     description: "string",
      //     link: secure_url
      //   }
      // ]
    }),
  });

  const json = await response.json();
  console.log(json)
  return json;
};

export const updateUserRole = async (_id, role) => {
  const Authorization = await getToken(_id);
  const url = `${baseUrl}/user/${_id}/apply`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization
    },
    body: JSON.stringify({ role }),
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
