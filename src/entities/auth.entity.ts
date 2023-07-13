import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Roles_auth_rel } from './roles_auth_rel.entity';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  authName: string;

  @Column({ default: 0 })
  authLevel: number;

  @OneToMany(() => Roles_auth_rel, (roles_auth_rel) => roles_auth_rel.roles)
  roles_auth_rel: Roles_auth_rel[];
}
