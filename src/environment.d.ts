declare module 'process' {
  global {
    namespace NodeJS {
      type ProcessEnv = {
        NODE_ENV: 'development' | 'production' | 'test'
        APP_ENV: 'local' | 'dev' | 'stg' | 'prod' | 'test'
        USE_STUB: 'true' | 'false'
        JSONPLACEHOLDER_API_URL: string
      }
    }
  }
}
