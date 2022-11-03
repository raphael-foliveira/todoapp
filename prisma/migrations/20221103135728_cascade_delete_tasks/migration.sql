-- DropForeignKey
ALTER TABLE "ToDo" DROP CONSTRAINT "ToDo_authorId_fkey";

-- AddForeignKey
ALTER TABLE "ToDo" ADD CONSTRAINT "ToDo_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
