-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "taskUUID" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("taskUUID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_taskUUID_key" ON "Task"("taskUUID");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
