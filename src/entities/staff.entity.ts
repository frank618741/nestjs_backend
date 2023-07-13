import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { User } from './user.entity';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  staffID: string;

  @Column({ default: null })
  staffName: string;

  @Column({ default: null })
  deptment: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  age: string;

  @Column({ default: null })
  gender: string;

  @Column({ default: null })
  phoneNum: string;

  @Column('float')
  kpiScore: number;

  @Column({ default: null })
  address: string;
}
