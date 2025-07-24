const login = JSON.parse(open('../fixtures/login.json'))
import http from 'k6/http'
import { pegarBaseURL } from '../utils/variavel.js';

export function obterToken () {
    const url = pegarBaseURL() + '/login';
    const body = JSON.stringify(login);
      
    
    const params = {
        headers: {
          'Content-Type': 'application/json',
        },
    };
    
    const response = http.post(url, body, params);

    return response.json('token')

}