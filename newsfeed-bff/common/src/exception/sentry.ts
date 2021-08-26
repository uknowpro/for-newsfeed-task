import * as Sentry from '@sentry/node';
import * as useragent from 'useragent';

export interface ExceptionLogger {
  capture(error: unknown, request: Request, response: Response);
}

export class SentryLogger implements ExceptionLogger {
  constructor() {
    Sentry.init();
  }

  capture(error: unknown, request: any, response: any) {
    const userAgent = useragent.parse(request.headers['user-agent']);

    Sentry.withScope((scope) => {
      Sentry.setUser(this.userSerializer(request));
      Sentry.setContext('device', this.deviceSerializer(userAgent));
      Sentry.setContext('os', this.osSerializer(userAgent))
      Sentry.setContext('browser', this.browerSerializer(userAgent));
      Sentry.setExtras(this.requestSerializer(request));
      Sentry.captureException(error);
    })
  }

  private userSerializer(request: any) {
    return {
      'ip_address': request.ip || (request.connection || {}).remoteAddress,
    };
  }

  private deviceSerializer(userAgent) {
    return {
      name: userAgent.device.family,
      version: userAgent.device.toVersion(),
    };
  }

  private osSerializer(userAgent) {
    return {
      name: userAgent.os.family,
      version: userAgent.os.toVersion(),
    };
  }

  private browerSerializer(userAgent) {
    return {
      name: userAgent.family,
      version: userAgent.toVersion(),
    };
  }

  private requestSerializer(request: any) {
    return {
      method: request.method,
      protocol: (request.protocol === 'https' || request.secure || (request.socket || {}).encrypted) ? 'https' : 'http',
      host: request.hostname || request.host || request.headers.host || '<no host>',
      headers: request.headers || request.header || {},
      url: request.originalUrl || request.url,
      query: request.query || {},
      data: request.body || {},
    };
  }
}
