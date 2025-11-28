import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { LibrarianEntity } from '../Librarian/librarian.entity';
import { AdminProfile } from './admin.profile.entity';

export enum AdminStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  age: number;

  @Column({ default: 'admin' })
  role: string;

  @Column({
    type: 'enum',
    enum: AdminStatus,
    default: AdminStatus.ACTIVE,
  })
  status: AdminStatus;

  @OneToOne(() => AdminProfile, (profile) => profile.admin, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  profile?: AdminProfile;

  @OneToMany(() => LibrarianEntity, (l) => l.supervisor)
  librarians: LibrarianEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
export { AdminProfile };

