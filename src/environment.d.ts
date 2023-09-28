declare module 'process' {
  global {
    namespace NodeJS {
      type ProcessEnv = {
        NODE_ENV: 'development' | 'test' | 'production'
        APP_ENV: 'local' | 'pr' | 'dev' | 'stg' | 'prod'
        USE_STUB: 'true' | 'false'
        JSONPLACEHOLDER_API_URL: string
      }
    }
  }
}
