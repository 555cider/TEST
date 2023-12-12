const express = require('express');
const router = express.Router();
const https = require('https');

// 토큰: `9adca5f19095a0770b24ecd6fb410845`;
// 명령: [{ truck_id: 0, command: [2, 5, 4, 1, 6] }];

router.get('/', (req, res) => {
  res.render('layout', {});
});

router.post('/auth', async (req, res) => {
  const token = req.body.token;
  const key = await postToken(token, 1)
    .then((res) => JSON.parse(res).auth_key)
    .catch((err) => console.error(err))
    .finally(console.log(`key!`));
  const locations = await getData(key, 'locations')
    .then((res) => JSON.parse(res).locations)
    .catch((err) => console.error(err))
    .finally(console.log(`locations!`));
  const trucks = await getData(key, 'trucks')
    .then((res) => JSON.parse(res).trucks)
    .catch((err) => console.error(err))
    .finally(console.log(`trucks!`));
  res.render('layout', {
    token: token,
    key: key,
    locations: locations,
    trucks: trucks,
  });
});

router.put('/simulate', async (req, res) => {
  const key = req.body.key;
  const commands = req.body.commands;
  const simulate = await putCommands(key, commands)
    .then((res) => JSON.parse(res))
    .catch((err) => console.error(err))
    .finally(console.log(`simulate: ${simulate}`));
  const locations = await getData(key, 'locations')
    .then((res) => JSON.parse(res).locations)
    .catch((err) => console.error(err))
    .finally(console.log(`locations: ${locations}`));
  const trucks = await getData(key, 'trucks')
    .then((res) => JSON.parse(res).trucks)
    .catch((err) => console.error(err))
    .finally(console.log(`trucks: ${trucks}`));
  res.render('layout', {
    token: token,
    key: key,
    simulate: simulate,
    locations: locations,
    trucks: trucks,
  });
});

const postToken = (token, problem) => {
  const options = {
    hostname: 'kox947ka1a.execute-api.ap-northeast-2.amazonaws.com',
    path: '/prod/users/start',
    method: 'POST',
    headers: {
      'X-Auth-Token': token,
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let output = '';
      res.setEncoding('utf8');
      res.on('data', (body) => (output = body));
      res.on('error', reject);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          resolve(output);
        } else {
          reject(`Failed. status: ${res.statusCode}, body: ${res.body}`);
        }
      });
    });
    req.on('error', reject);
    req.write(`{"problem": ${problem}}`);
    req.end();
  });
};

const getData = (key, path) => {
  const options = {
    hostname: 'kox947ka1a.execute-api.ap-northeast-2.amazonaws.com',
    path: '/prod/users/' + path,
    method: 'GET',
    headers: {
      Authorization: key,
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let output = '';
      res.setEncoding('utf8');
      res.on('data', (body) => (output += body));
      res.on('error', reject);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          resolve(output);
        } else {
          reject(`Failed. status: ${res.statusCode}, body: ${res.body}`);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
};

const putCommands = (key, commands) => {
  const options = {
    hostname: 'kox947ka1a.execute-api.ap-northeast-2.amazonaws.com',
    path: '/prod/users/simulate',
    method: 'PUT',
    headers: {
      Authorization: key,
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let output = '';
      res.setEncoding('utf8');
      res.on('data', (body) => (output += body));
      res.on('error', reject);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          resolve(output);
        } else {
          reject(`Failed. status: ${res.statusCode}, body: ${res.body}`);
        }
      });
    });
    req.on('error', reject);
    req.write(`{"commands": ${commands}}`);
    req.end();
  });
  //[{ truck_id: 0, command: [2, 5, 4, 1, 6] }]
};

module.exports = router;
