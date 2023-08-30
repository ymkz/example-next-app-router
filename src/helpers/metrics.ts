import { ValueType, metrics } from '@opentelemetry/api'

/**
 * @see https://github.com/open-telemetry/opentelemetry-js/blob/main/doc/metrics.md
 */

const meter = metrics.getMeter('example-next-app-router')

const errorCounter = meter.createCounter('error_counter', {
  description: 'counter of a error by code',
  unit: 'counts',
  valueType: ValueType.INT,
})

export const incrementErrorCount = (code = 'unknown') => {
  errorCounter.add(1, { code })
}
