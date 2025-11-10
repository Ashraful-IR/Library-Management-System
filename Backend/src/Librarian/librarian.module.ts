import { Module } from "@nestjs/common";
import { LibrarianController } from "./librarian.controller";
import {LibrarianService } from "./librarian.service";
@Module({
  controllers: [LibrarianController],
  providers: [LibrarianService],
})
export class LibrarianModule {}
