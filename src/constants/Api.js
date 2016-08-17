const API_PROTOCOL = process.env.apiProtocol || 'http'
const API_HOST = process.env.apiHost || 'localhost'
const API_PORT = process.env.apiPort || '3001'
const API_VERSION = process.env.apiVersion || '1'

export const API_ROOT = API_PROTOCOL + '://' + API_HOST + ':' + API_PORT + '/api/' + API_VERSION + '/'