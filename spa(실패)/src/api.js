const HOST = `https://kox947ka1a.execute-api.ap-northeast-2.amazonaws.com`;
const PATH = `prod/users`;

export const api = {
  auth: async (token, problem) =>
    await fetch(`${HOST}/${PATH}/start`, {
      method: 'POST',
      headers: {
        'X-Auth-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ problem: problem }),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err)),

  locations: async (key) =>
    await fetch(`${HOST}/${PATH}/trucks`, {
      headers: {
        Authorization: key,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((err) => console.error(err)),

  trucks: async (key) =>
    await fetch(`${HOST}/${PATH}/trucks`, {
      headers: {
        Authorization: key,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((err) => console.error(err)),

  simulate: async (key, commands) =>
    await fetch(`${BASE_URL}/simulate`, {
      method: 'PUT',
      headers: {
        Authorization: key,
        'Content-Type': 'application/json',
      },
      body: '{"commands": [' + commands + ']}',
    })
      .then((res) => res.json())
      .catch((err) => console.error(err)),

  score: async (key) =>
    await fetch(`${BASE_URL}/score`, {
      method: 'GET',
      headers: {
        Authorization: key,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((err) => console.error(err)),
};
