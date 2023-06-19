## 1. docker mysql環境を作成

`docker/mysql.dockerfile`と`docker-compose.yaml`を作成する

```terminal
% mkdir sample-project
% cd sample-project
% mkdir docker
% touch docker/mysql.dockerfile
```

```mysql.docker
FROM mysql:8
```

```docker-compose.yaml
version: "3"

services:
  db:
    container_name: database
    build:
     context: ./docker
     dockerfile: mysql.dockerfile
    tty: true
    restart: always
    networks:
      - local
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: example
      MYSQL_USER: example
      MYSQL_PASSWORD: example
    volumes:
      - db_volume:/var/lib/mysql
  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
    networks:
      - local

volumes:
  db_volume: {}

networks:
  local: {}
```

できあがったら、ミスはないかの確認のためdockerを立ち上げる。

```terminal
% docker compose up
```

## 2. pnpmでprismaの環境を作成する

guide通りに進めるが適宜mysqlに置き換える。

```terminal
% pnpm init
% pnpm add -D typescript ts-node @types/node prisma
% pnpm tsc --init
% pnpm prisma init --datasource-provider mysql
```

## 3. Prismaとmysqlを接続する

prisma migrationを利用してmigration fileの作成を実施するために、databaseへの接続情報を変更する。

```.env
DATABASE_URL="mysql://root:root_password@localhost:3306/example"
```

```schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

migrationを実施する。

```terminal
% pnpm risma migrate dev --name init
```

実行したmigrationが実施されているか確認する。

```terminal
select * from _prisma_migrations;
id	checksum	finished_at	migration_name	logs	rolled_back_at	started_at	applied_steps_count
eab75887-851b-4993-be0a-6bdf5fb33603	098b90dcb4c749fde070be27a01a1a03060770625b7e6953076f1463c8ada32e	2023-06-15 13:48:56.855	20230615134856_init	NULL	NULL	2023-06-15 13:48:56.706	1
```

## 4. Prisma経由でmysqlに接続する

```terminal
% touch script.ts
```

```script.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

```terminal
% pnpm ts-node script.ts
{ id: 1, email: 'alice@prisma.io', name: 'Alice' }
```

refs

[planetscale-mysql-database-on-prisma-platform](https://planetscale.com/blog/planetscale-mysql-database-on-prisma-platform)

[prisma getting started](https://www.prisma.io/docs/getting-started/quickstart)