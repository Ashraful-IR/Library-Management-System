import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Admin } from '../Admin/admin.entity';

// One-to-one table: extra info about librarian
@Entity('librarian_profiles')
export class LibrarianProfile {
  @PrimaryColumn('int')
  id: number;

  @Column({ nullable: true, length: 255 })
  address?: string;

  @Column({ nullable: true, length: 255 })
  bio?: string;
}

@Entity('librarians')
export class LibrarianEntity {
  @PrimaryColumn('int')
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 200, nullable: true })
  fullName?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 20 })
  phone: string;

  @Column('int')
  age: number;

  @Column({ length: 50, default: 'Librarian' })
  designation: string;

  @Column({ default: true })
  isActive: boolean;

  // One-to-one relation with profile
  @OneToOne(() => LibrarianProfile, { cascade: true, eager: true, nullable: true })
  @JoinColumn()
  profile?: LibrarianProfile;

  // Many librarians supervised by one admin (One-to-Many from Admin side)
  @ManyToOne(() => Admin, (admin) => (admin as any).librarians, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  supervisor?: Admin;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateIdAndFullName() {
    // custom 6-digit numeric id
    if (!this.id) {
      this.id = Math.floor(100000 + Math.random() * 900000);
    }
    // full name auto build
    if (!this.fullName) {
      this.fullName = `${this.firstName} ${this.lastName}`;
    }
  }
}
