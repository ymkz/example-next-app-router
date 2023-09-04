/**
 * @see https://azukiazusa.dev/blog/instrumenting-Node-js-applications-with-open-telemetry/
 */

import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { Resource } from '@opentelemetry/resources'
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

const sdk = new NodeSDK({
  instrumentations: [new HttpInstrumentation()],
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
