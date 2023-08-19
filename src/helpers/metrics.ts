import { ValueType, metrics } from '@opentelemetry/api'

/**
 * @see https://github.com/open-telemetry/opentelemetry-js/blob/main/doc/metrics.md
 */

const meter = metrics.getMeter('example-next-app-router')

const requestCounter = meter.createCounter('request_counter', {
  description: 'counter of a request by code',
  unit: 'counts',
  valueType: ValueType.INT,
})

const errorCounter = meter.createCounter('error_counter', {
  description: 'counter of a error by code',
  unit: 'counts',
  valueType: ValueType.INT,
})

const warnCounter = meter.createCounter('warn_counter', {
  description: 'counter of a warn by code',
  unit: 'counts',
  valueType: ValueType.INT,
})

export const incrementRequestCount = (code = 'unknown') => {
  requestCounter.add(1, { code })
}

export const incrementErrorCount = (code = 'unknown') => {
  errorCounter.add(1, { code })
}

export const incrementWarnCount = (code = 'unknown') => {
  warnCounter.add(1, { code })
}
