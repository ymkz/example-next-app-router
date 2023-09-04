import { ValueType } from '@opentelemetry/api'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc'
import { Resource } from '@opentelemetry/resources'
import {
  PeriodicExportingMetricReader,
  MeterProvider,
} from '@opentelemetry/sdk-metrics'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

const meterProvider = new MeterProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'example-service',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]:
      process.env.ENVIRONMENT,
  }),
})

meterProvider.addMetricReader(
  new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
    exportIntervalMillis: 1000,
  }),
)

const meter = meterProvider.getMeter('example-exporter-collector')

const errorCounter = meter.createCounter('error_counter', {
  description: 'counter of a error by code',
  unit: 'counts',
  valueType: ValueType.INT,
})

export const incrementErrorCount = (code = 'unknown') => {
  errorCounter.add(1, { code })
}
