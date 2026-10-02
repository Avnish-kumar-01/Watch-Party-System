import 'dotenv/config';
import { createServer } from 'http';
import next from 'next';
import { initSocketServer } from './server/socketServer';

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT ?? '3000', 10);

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  await initSocketServer(httpServer);

  httpServer.listen(port, '0.0.0.0', () => {
    console.log(
      `> Ready on http://0.0.0.0:${port} [${dev ? 'dev' : 'production'}]`
    );
  });
});
