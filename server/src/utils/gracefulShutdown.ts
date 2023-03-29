import { Server, IncomingMessage, ServerResponse } from "http";
import { disconnect } from "./connect";

const gracefulShutdown = (
  signal: string,
  server: Server<typeof IncomingMessage, typeof ServerResponse>
) => {
  process.once(signal, async () => {
    console.log(`Recieved ${signal}, implementing graceful shutdown...`);
    try {
      await Promise.all([
        new Promise<void>((resolve, reject) => {
          server.close((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }),
        disconnect(),
      ]);
      console.log(`Shutdown Completed`);
      process.exit(0);
    } catch (error: any) {
      console.log(`Something went wrong: \n`);
      console.log(error);
      process.exit(1);
    }
  });
};

export default gracefulShutdown;
