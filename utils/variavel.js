const configLocal = JSON.parse(open('../config/config.local.json'))

export function pegarBaseURL (){
    const baseUrl = __ENV.BASE_URL || configLocal.baseUrl
    return baseUrl
}