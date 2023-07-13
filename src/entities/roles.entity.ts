import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User_roles_rel } from './user_roles_rel.entity';
import { Roles_auth_rel } from './roles_auth_rel.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  name: string;

  @OneToMany(() => User_roles_rel, (user_roles_rel) => user_roles_rel.roles)
  user_roles_rel: User_roles_rel[];

  @OneToMany(() => Roles_auth_rel, (roles_auth_rel) => roles_auth_rel.roles)
  roles_auth_rel: Roles_auth_rel[];
}
