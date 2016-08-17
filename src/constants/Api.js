const API_PROTOCOL = process.env.API_PROTOCOL || 'http'
const API_HOST = process.env.API_HOST || 'localhost'
const API_PORT = process.env.API_PORT || '3001'
const API_VERSION = process.env.API_VERSION || '1'

export const API_ROOT = API_PROTOCOL + '://' + API_HOST + ':' + API_PORT + '/api/' + API_VERSION + '/'