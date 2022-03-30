import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { Logger as NestLogger } from '@nestjs/common';

const API_DEFAULT_PORT = 4100;
const API_DEFAULT_PREFIX = '/api/v1/'; 
const isProduction = (process.env.NODE_ENV === 'production');

async function bootstrap(): Promise<string> {
  const app = await NestFactory.create(AppModule);
  
  app.use(json());
  app.use(helmet({
    contentSecurityPolicy: isProduction ? false  : false, // false only to enable graphql playground else this should ne undefined
    crossOriginEmbedderPolicy: isProduction ? false : false, // false only to enable graphql playground else this should ne undefined
  }));

  await app.listen(process.env.API_PORT || API_DEFAULT_PORT);
  
  return app.getUrl();
}

/**
 * Any major error that can not be handled by NestJS will be caught in the code
 * below. The default behavior is to display the error on stdout and quit.
 */
(async (): Promise<void> => {
  try {
    const url = await bootstrap();
    NestLogger.log(url, 'Bootstrap');
  } catch (error) {
    NestLogger.error(error, 'Bootstrap');
  }
})();
