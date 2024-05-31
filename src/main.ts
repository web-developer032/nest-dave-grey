import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./all-exceptions.filter";

// import { MyLoggerService } from "./my-logger/my-logger.service";
// ----------------------
// TO USER GLOBAL LOGGER
// ----------------------
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, {
//     bufferLogs: true,
//   });
//   app.useLogger(app.get(MyLoggerService));
//   app.setGlobalPrefix("api");
//   app.enableCors();
//   await app.listen(3000);
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.setGlobalPrefix("api");
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
