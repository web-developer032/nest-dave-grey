import { ConsoleLogger, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
const fsPromises = fs.promises;

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logToFile(entry) {
    const formattedEntry = `${Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Asia/Karachi",
    }).format(new Date())}\t${entry}\n`;

    try {
      if (!fs.existsSync(path.join(__dirname, "..", "..", "logs"))) {
        await fsPromises.mkdir(path.join(__dirname, "..", "..", "logs"));
      }
      await fsPromises.appendFile(
        path.join(__dirname, "..", "..", "logs", "myLogFile.log"),
        formattedEntry,
      );
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  log(message: string, context: string = "") {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);
    super.log(message, context);
  }

  error(message: string, stackOrContext: string = "") {
    const entry = `${stackOrContext}\t${message}`;
    this.logToFile(entry);
    super.error(message, stackOrContext);
  }
}
