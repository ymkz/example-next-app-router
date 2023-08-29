declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'test' | 'production'
        ENVIRONMENT: 'local' | 'development' | 'staging' | 'production'
        USE_STUB: 'true' | 'false'
        JSONPLACEHOLDER_API_URL: string
      }
    }
  }
}
