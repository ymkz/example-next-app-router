import dayjs from 'dayjs'
import { headers } from 'next/headers'
import { pino } from 'pino'

export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  timestamp: () => {
    return `,"timestamp":"${dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS')}"`
  },
  formatters: {
    level: (label) => {
      return { level: label }
    },
    bindings: () => {
      return {}
    },
  },
})

export const accessLogging = () => {
  const headersInstance = headers()
  logger.info({
    msg: 'accesslog',
    path: headersInstance.get('next-url'),
    referer: headersInstance.get('referer'),
  })
}
