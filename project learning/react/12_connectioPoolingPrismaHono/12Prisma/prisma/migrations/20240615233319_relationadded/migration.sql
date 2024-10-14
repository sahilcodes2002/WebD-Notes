-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
