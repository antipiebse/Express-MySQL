![](https://velog.velcdn.com/images/antipiebse/post/955dcac3-fee8-4fb0-8df6-1a519fbae327/image.jpeg)
# Express+mysql로 간단한 서버구현하기

---
## 

Express+TypeScript+TypeORM+MySQL을 사용하여 간단하게 서버를 구현하였습니다.


- 유저API는 아직 Express숙련도가 부족하여 로그인, 로그아웃과 같은 인증, 인가 부분을 구현하지 못하였고 추후에 추가할 예정입니다.

- 게시글API는 간단한 CRUD를 구현하였습니다.

- 댓글API은 대댓글 기능을 포함하여 CRUD를 구현하였습니다.

- 추후에 DTO를 사용하여 데이터 검증을 진행할 것입니다.


## 설치 방법
---

- Github에서 클론하기
```
git clone https://github.com/antipiebse/Express-RestAPI.git
```
- 클론후 폴더에 들어가서 필요한 module 설치하기
```
npm install
```

## 실행 방법
---

```
npm run start:dev
```

## API 테스트 방법
---
- POSTMAN을 사용하여 간단하게 테스트 할 수 있습니다. 
![](https://velog.velcdn.com/images/antipiebse/post/f14ead47-84c1-43b8-a6d1-6c563cee5e96/image.png)
<br/>


>  express+mysql.postman_collection.json(이 파일을 다운받아 import하시면 됩니다.)

<br/>
위와 같이 POSTMAN에서 Collection을 import하면 어떤 식으로 값을 넣으면 되는 지 예시가 담겨있습니다

![](https://velog.velcdn.com/images/antipiebse/post/11f5f2d6-c705-4bef-b934-fdb8e2214341/image.png)


## API명세서
- `GET /users` : 모든 유저 목록 API
- `GET /users/:email` : 단일 유저 정보 API
- `POST /users` : 단일 유저 생성 API
- `PUT /users/:email` : 단일 유저 업데이트 API
- `DELETE /users/:email` : 단일 유저 삭제 API
- `GET /boards` : 모든 게시글 목록 API
- `GET /boards/:id` : 단일 게시글 정보 API
- `POST /boards` : 단일 게시글 생성 API
- `PUT /boards/:id` :단일 게시글 업데이트 API
- `DELETE /boards/:id` : 단일 게시글 삭제 API
- `GET /boards/:boardId/comments` : 모든 댓글 목록 API
- `POST /boards/:boardId/comments` : 단일 댓글 생성 API
- `PUT /boards/:boardId/comments/:commentId` : 단일 댓글 업데이트 API
- `DELETE /boards/:boardId/comments/:commentId` : 단일 댓글 삭제 API

## 기술스택
---
`JavaScript`, `TypeScript`, `NodeJS`, `Express`, `TypeORM`, `RESTAPI`, `MySQL`, `Git`

<br/>

## ERD
---
![](https://velog.velcdn.com/images/antipiebse/post/b17e9ad9-105f-44d1-99f3-afd79639b04a/image.png)

link: [ErdCloud](https://www.erdcloud.com/d/nRgQZ2Mo3T9Mvh6jz) 

## DB Schema
---
![](https://velog.velcdn.com/images/antipiebse/post/d0cf9da4-37e0-4367-9e6f-f6c8389ade03/image.png)


## .env 설정
---
```
DB_USERNAME
DB_PASSWORD
DB_DBNAME
DB_HOST
DB_PORT
```
## 폴더 구조
```
.
├── README.md
├── express+mysql.postman_collection.json
├── ormconfig.js
├── package-lock.json
├── package.json
├── src
│   ├── controller
│   │   ├── BoardController.ts
│   │   ├── CommentController.ts
│   │   └── UserController.ts
│   ├── entities
│   │   ├── Board.ts
│   │   ├── Comment.ts
│   │   └── User.ts
│   ├── index.ts
│   └── routes.ts
└── tsconfig.json
```
<br/>
