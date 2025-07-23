import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from '../helpers/token.js'

export const options = {
  iterations: 1
  
};

export default function() {
  const token = obterToken()
  const body = JSON.stringify({
    contaOrigem:1,
    contaDestino:2,
    valor:11,
    token: ""
  })
  
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  };

  let response = http.post('http://localhost:3000/transferencias',body,params);
  check(response, { "status is 201": (res) => res.status === 201 });
  
  sleep(1);
}
