import http from 'k6/http';
import { sleep, check } from 'k6';
const login = JSON.parse(open('../fixtures/login.json'))
import { pegarBaseURL } from '../utils/variavel.js';

export const options = {
  // Define the number of iterations for the test
  stages:[
    { duration: '10s', target: 10  },
    { duration: '20s', target: 10  },
    { duration: '10s', target: 30  },
    { duration: '20s', target: 30  },
    { duration: '20s', target: 0  }

  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(90)<900', 'max<1500'], // 95% of requests should be below 200ms
  },
};

export default function () {
  const url = pegarBaseURL() + '/login';
  const body = JSON.stringify(login);
  

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, body, params);

  check(response,{
    'validar status 200 login com sucesso': (res) => res.status === 200,
    'verificar se recebe token': (res) =>  'token' in JSON.parse(res.body) 
  })
  

  sleep(1);
}