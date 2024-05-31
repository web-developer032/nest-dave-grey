import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

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
  app.setGlobalPrefix("api");
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
