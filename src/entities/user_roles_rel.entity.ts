import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Roles } from './roles.entity';
//这里不能够用绝对路径，用绝对路径在做迁移生成的时候不生效！！！！

@Entity()
//这里是user表
export class User_roles_rel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  userId: string;

  @Column({ default: null })
  rolesId: string;

  @ManyToOne(() => User, (user) => user.user_roles_rel)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Roles, (roles) => roles.user_roles_rel)
  @JoinColumn()
  roles: Roles;
}
