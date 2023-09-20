/**
 * @see https://azukiazusa.dev/blog/instrumenting-Node-js-applications-with-open-telemetry/
 */

import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino'
import { Resource } from '@opentelemetry/resources'
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { NoopSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

const sdk = new NodeSDK({
  instrumentations: [new PinoInstrumentation(), new HttpInstrumentation()],
  traceExporter: new OTLPTraceExporter(),
  spanProcessor: new NoopSpanProcessor(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
  }),
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'example-service',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]:
      process.env.ENVIRONMENT,
  }),
})

sdk.start()
