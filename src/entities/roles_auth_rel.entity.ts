import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Roles } from './roles.entity';
import { Auth } from './auth.entity';
//这里不能够用绝对路径，用绝对路径在做迁移生成的时候不生效！！！！

@Entity()
//这里是user表
export class Roles_auth_rel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  rolesId: string;

  @Column({ default: null })
  authId: string;

  @ManyToOne(() => Roles, (roles) => roles.roles_auth_rel)
  @JoinColumn()
  roles: Roles;

  @ManyToOne(() => Auth, (auth) => auth.roles_auth_rel)
  @JoinColumn()
  auth: Auth;
}
