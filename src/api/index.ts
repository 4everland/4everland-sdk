const isProd = process.env.NODE_ENV === 'production'
export const pinningServiceApi = isProd
  ? 'https://api.4everland.dev'
  : 'https://pinning.foreverland.xyz'
export const registerApi = isProd ? 'https://b.foreverland.xyz' : 'https://sts-api.foreverland.xyz'
export const endpoint = isProd ? 'https://endpoint.4everland.co' : 'https://s3gw.foreverland.xyz'
