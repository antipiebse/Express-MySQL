import 'reflect-metadata';
import * as express from 'express';
import { AppDataSource } from './data-source';
import { Routes } from './routes';
import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

// Connect typeORM mysql
AppDataSource.initialize().then(async () => {
  // Create express server
  const app = express();
  // register express routes from defined application routes
  Routes.forEach((route) => {
    (app as any)[route.method](
      route.route,
      (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](
          req,
          res,
          next,
        );
        if (result instanceof Promise) {
          result.then((result) =>
            result !== null && result !== undefined
              ? res.send(result)
              : undefined,
          );
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      },
    );
  });
  app.use(express.json);
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.json({ message: err.message });
  });
  app.listen(app.get('port'), () => console.log('aa'));
});
