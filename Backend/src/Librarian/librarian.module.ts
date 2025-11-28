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
      secret: 'library-secret', // keep same as your app
      signOptions: { expiresIn: '1d' },
    }),
    // Mailer config (same style as your sir’s slide)
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'your-gmail-account@gmail.com',
          pass: 'your-app-password',
        },
      },
      defaults: {
        from: '"Library" <no-reply@library.com>',
      },
    }),
  ],
  controllers: [LibrarianController],
  providers: [LibrarianService],
  exports: [LibrarianService],
})
export class LibrarianModule {}
