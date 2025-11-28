import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Admin } from './admin.entity';

@Entity('admin_profiles')
export class AdminProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  bio?: string;

  @OneToOne(() => Admin, (admin) => admin.profile)
  @JoinColumn()
  admin: Admin;
}
