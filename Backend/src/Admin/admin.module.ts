import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin, AdminProfile } from './admin.entity';
import { LibrarianEntity } from '../Librarian/librarian.entity';
import { JwtStrategy } from './admin.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, AdminProfile, LibrarianEntity]),
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
        from: '"Library" <<shahriar.rafi1406315@gmail.com>>',
      },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtStrategy],
  exports: [AdminService],
})
export class AdminModule {}
