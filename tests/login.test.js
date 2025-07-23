import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  // Define the number of iterations for the test
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(90)<900', 'max<1500'], // 95% of requests should be below 200ms
  },
};

export default function () {
  const url = 'http://localhost:3000/login';
  const body = JSON.stringify({
    username: 'julio.lima',
    senha: '123456',
  });

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