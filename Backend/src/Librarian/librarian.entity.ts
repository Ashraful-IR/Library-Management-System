import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';

@Entity('librarian')
export class LibrarianEntity {
  @PrimaryColumn('int')  //Change to @PrimaryColumn
  id: number;  //Change to string for custom format

  @Column({ name: 'firstName' })
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true})
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  phone: number;

  @Column()
  designation: string;

  @Column({ default: true })
  isActive: boolean;

 @BeforeInsert()
  generateId() {
    // Generate custom ID format: numeric 6-digit number (100000 - 999999)
    this.id = Math.floor(100000 + Math.random() * 900000);
    console.log('Custom ID generated:', this.id);

    
    if (!this.fullName)
    this.fullName = `${this.firstName} ${this.lastName}`;
    

  }
}
