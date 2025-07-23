const login = JSON.parse(open('../fixtures/login.json'))
import http from 'k6/http'

export function obterToken () {
    const url = 'http://localhost:3000/login';
    const body = JSON.stringify(login);
      
    
    const params = {
        headers: {
          'Content-Type': 'application/json',
        },
    };
    
    const response = http.post(url, body, params);

    return response.json('token')

}