# nestjs prismaを利用する

## 1. pnpmを利用してnestjsの環境を構築する

pnpmを利用してnestjsの環境を構築していきます。
directory構成は、以下になることを想定しています。

```
% tree . -L 3 -I ndoe_modules
.
├── README.md
├── apps
│   └── nestjs-prisma
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

### 1-1. pnpmの開発ディレクトリ作成とwork spaceの設定

pnpmの開発ディレクトリ作成とwork spaceの設定を実施していきす。

```terminal
% pnpm init
% touch pnpm-workspace.yaml
% mkdir apps
% cd apps
% pnpm nest new nestjs-prisma -p pnpm
% vi pnpm-workspace.yaml
```

```pnpm-workspace.yaml
packages:
  - "apps/nestjs-prisma"
```

rootでapi serverの機能を実施したいため、package.jsonにscriptを追記します。

```package/json
"serve:dev": "pnpm --parallel --filter \"./apps/**\" start:dev"
```

### 1-2. nestjsの起動

```terminal
% pwd
YOUR_WORKING_DIRECTORY
% pnpm serve:dev
```

## 2. prismaと連携するdatabaseを作成していきます。

今回の章完了後にディレクトリ構成は以下になることを想定しています。

```terminal
% tree . -L 3 -I node_modules
.
├── README.md
├── apps
│   └── nestjs-prisma
├── database
│   └── mysql.dockerfile
├── docker-compose.yaml
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

docker-compose.yaml　ファイルと接続するdatabase(mysql)を作成していきます。
adminterなどについは追加していません。理由は、prisma studioでdatabaseの内容が確認できるためです。

```
% touch docker-compose.yaml
% mkdir database
% touch database/mysql.dockerfile
```

```database/mysql.dockerfile
FROM mysql:8
```

```docker-compose.yaml
version: "3"

services:
  db:
    container_name: db_server
    build:
      context: ./database
      dockerfile: mysql.dockerfile
    tty: true
    restart: always
    ports:
      - 3306:3306
    volumes:
      - db_volume:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: sample

networks:
  local: {}

volumes:
  db_volume: {}
```

dockerの記載が完了したら、dockerを起動していきます。

```terminal
% docker compose up
```

## 3. migrationファイルを作成する

prismaのmigrationコマンドを利用して、databaseのmigrationファイルを作成していきます。

この章を完了した後のディレクトリは以下になることを想定しています。

```terminal
% tree . -L 3 -I node_modules
.
├── README.md
├── apps
│   └── nestjs-prisma
│       ├── README.md
│       ├── dist
│       ├── nest-cli.json
│       ├── package.json
│       ├── .env
│       ├── prisma
│       │   ├── migrations
│       │   ├── schema.prisma
│       ├── src
│       ├── test
│       ├── tsconfig.build.json
│       └── tsconfig.json
├── database
│   └── mysql.dockerfile
├── docker-compose.yaml
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

### 3-1. prismaの環境を構築する

```terminal
% pnpm install -D prisma -F nestjs-prisma
% cd apps/nestjs-prisma
% pnpm prisma init --datasource-provider mysql
```

作成された.envファイルをdockerのmysql向けに変更します。

```apps/nestjs-prisma/.evn
DATABASE_URL="mysql://root:password@localhost:3306/sample"
```

## 3-2. migrationの作成と実施

prismaを利用してmigrationファイルの作成と実施をしていきます。

```terminal
% pwd
YOUR_WORKING_DIRECTORY/apps/nestjs-prisma
% vi prisma/schema.prisma
```

```YOUR_WORKING_DIRECTORY/apps/nestjs-prisma/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  userUUID String @unique @db.VarChar(36) @id
  email String  @unique @db.VarChar(255)
  name  String? @db.VarChar(100)
  posts Post[]
  createdAt DateTime @db.Timestamp()
  updatedAt DateTime @db.Timestamp()
}

model Post {
  postUUID  String   @unique @id @db.VarChar(36)
  title     String   @db.VarChar(100)
  content   String?  @db.Text
  published Boolean  @default(false)
  author    User?    @relation(fields: [authorId], references: [userUUID])
  authorId  String?  @db.VarChar(36)
  createdAt DateTime @db.Timestamp()
  updatedAt DateTime @db.Timestamp()

  @@index([authorId])
}
```

### 3-3. migrationファイルの作成と実施

```terminal
% pwd
YOUR_WORKING_DIRECTORY/apps/nestjs-prisma
% pnpm prisma migrate dev --name create_user_and_post
```

実施が完了したら、prsima studio経由で確認を実施してみます。

```terminal
% pwd
YOUR_WORKING_DIRECTORY/apps/nestjs-prisma
% pnpm prisma studio
```

[localhost 5555](http://localhost:5555/)にアクセスをして、作成されたModelがあるか確認します。

## 4. 開発環境向けにSeedファイルを作成する

### 4-1. seedを実施するための前準備

```terminal
% pwd
YOUR_WORKING_DIRECTORY/apps/nestjs-prisma
% pnpm install @faker-js/faker -D
% mkdir seeds
% touch seeds/main.ts && touch seeds/create-user-and-post.ts && touch seeds/client.ts
% vi package.json
```

```apps/nestjs-prisma/package.json
"prisma": {
  "seed": "ts-node ./prisma/seeds/main.ts"
},
```

```apps/nestjs-prisma/prisma/seeds/client.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
```

```apps/nestjs-prisma/prisma/seeds/main.ts
import { prisma } from './client';
import { upsertUsers } from './create-user-and-post';

async function main() {
  await upsertUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

```

```apps/nestjs-prisma/prisma/seeds/create-user-and-post.ts
import { prisma } from './client';
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

export async function upsertUsers() {
  return await Promise.all(
    [...Array(2)].map(() => {
      const email = faker.internet.email();

      return prisma.user.upsert({
        where: { email },
        update: {},
        create: buildCreateUserInput({ email }),
      });
    }),
  );
}

function buildCreateUserInput(input?: Partial<Prisma.UserCreateInput>) {
  const email = faker.internet.email();
  const name = faker.person.fullName();
  const uuid = randomUUID();

  return {
    userUUID: uuid,
    email,
    name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    posts: {
      createMany: { data: [buildCreatePostInput()] },
    },
    ...input,
  };
}

function buildCreatePostInput(input?: Partial<Prisma.PostCreateInput>) {
  const uuid = randomUUID();
  const title = faker.lorem.word({ length: { max: 100, min: 1 } });
  const content = faker.lorem.word({ length: { max: 190, min: 1 } });
  return {
    postUUID: uuid,
    title,
    content,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...input,
  };
}
```

### 4-2. seedを実行していく

```terminal
% pwd
YOUR_WORKING_DIRECTORY/apps/nestjs-prisma
% pnpm prisma db seed
```

一応完了したかを確認するため、[localhost 5555](http://localhost:5555/)にアクセスをして確認します。

## 5. prismaとnestjsを接続する

最後にprismaとnestjsの接続を実施していきます。

```terminal
% pwd
YOUR_WORKING_DIRECTORY/apps/nestjs-prisma
% pnpm nest g module shared
% pnpm nest g service shared/services/prisma --flat
```

```shared/services/prisma/prisma.service.ts
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
```

```shared/services/prisma/shared.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class SharedModule {}
```

```main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './shared/services/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap();
```

```application.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './shared/services/prisma.service'

@Controller('')
export class UsersController {
  @Get('users')
  getAllUsers() {
    return this.prisma.user.findMany();
  }

  constructor(private readonly prisma: PrismaService) {}
}

```

上記で接続ができるか確認を実施して表示できれば、完了です。
typeormの時に存在していたEntity(序盤はtsファイルを読み込めなくてめんどくさかった)をprismaでどのようにあつかうか、angularと同じ場合はserice層が1layerだと辛くなる問題もあると知らないこともあるので、いろいろ試せそう。