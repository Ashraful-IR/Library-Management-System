import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './Admin/admin.module'; 
import { LibrarianModule } from './Librarian/librarian.module';

@Module({
  imports: [AdminModule, LibrarianModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
