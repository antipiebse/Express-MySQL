import 'reflect-metadata';
import * as express from 'express';
import { Routes } from './routes';
import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { createConnection } from 'typeorm';

// Connect typeORM mysql
createConnection().then(async () => {
  // Create express server
  const app = express();

  // json middleware
  app.use(express.json());

  // register express routes from defined application routes
  Routes.forEach(
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    async (route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: NextFunction) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next,
          );
          if (result instanceof Promise) {
            result
              .then((result) =>
                result !== null && result !== undefined
                  ? res.send(result)
                  : undefined,
              )
              .catch(next);
          } else if (result !== null && result !== undefined) {
            res.json(result);
            next();
          }
        },
      );
    },
  );

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({
      success: false,
      message: err.message,
      path: req.path,
      timestamp: new Date().toISOString(),
    });
  });
  app.listen(3000, () => console.log('server started'));
});
