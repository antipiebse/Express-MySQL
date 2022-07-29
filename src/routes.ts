import { CommentController } from './controller/CommentController';
import { BoardController } from './controller/BoardController';
import { UserController } from './controller/UserController';

export const Routes = [
  //-----------------------------------------
  // User API
  //-----------------------------------------
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/users/:email',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/users/:email',
    controller: UserController,
    action: 'remove',
  },
  {
    method: 'put',
    route: '/users/:email',
    controller: UserController,
    action: 'update',
  },
  //-----------------------------------------
  // Board API
  //-----------------------------------------
  {
    method: 'get',
    route: '/boards',
    controller: BoardController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/boards/:id',
    controller: BoardController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/boards',
    controller: BoardController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/boards/:id',
    controller: BoardController,
    action: 'remove',
  },
  {
    method: 'put',
    route: '/boards/:id',
    controller: BoardController,
    action: 'update',
  },
  // -----------------------------------------
  // Comment API
  // -----------------------------------------
  {
    method: 'post',
    route: '/boards/:boardId/comments',
    controller: CommentController,
    action: 'save',
  },
  {
    method: 'get',
    route: '/boards/:boardId/comments',
    controller: CommentController,
    action: 'all',
  },
  {
    method: 'delete',
    route: '/boards/:boardId/comments/:commentId',
    controller: CommentController,
    action: 'remove',
  },
  {
    method: 'put',
    route: '/boards/:boardId/comments/:commentId',
    controller: CommentController,
    action: 'update',
  },
];
