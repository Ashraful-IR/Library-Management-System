import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';

import { LibrarianController } from './librarian.controller';
import { LibrarianService } from './librarian.service';
import { LibrarianEntity, LibrarianProfile } from './librarian.entity';
import { Admin } from '../Admin/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LibrarianEntity, LibrarianProfile, Admin]),
    PassportModule,
    JwtModule.register({
      secret: 'library-secret', 
      signOptions: { expiresIn: '1d' },
    }),
  
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'shahriar.rafi1406315@gmail.com',
          pass: 'khmfxlbzqahzbjyp',
        },
      },
      defaults: {
        from: '"Library" <shahriar.rafi1406315@gmail.com>',
      },
    }),
  ],
  controllers: [LibrarianController],
  providers: [LibrarianService],
  exports: [LibrarianService],
})
export class LibrarianModule {}
