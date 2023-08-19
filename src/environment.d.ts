declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'test' | 'production'
        ENVIRONMENT: 'local' | 'development' | 'staging' | 'production'
        JSONPLACEHOLDER_API_URL: string
      }
    }
  }
}
