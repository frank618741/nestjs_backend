import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Logs } from './logs.entity';
// import { Roles } from 'src/entities/roles.entity';
//这里不能够用绝对路径，用绝对路径在做迁移生成的时候不生效！！！！
import { Profile } from './profile.entity';
import { User_roles_rel } from './user_roles_rel.entity';

@Entity()
//这里是user表
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  username: string;

  @Column({ default: null })
  password: string;

  @Column({ default: null })
  courseName: string;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: Profile;

  // typescript -> 数据库 关联关系 Mapping
  @OneToMany(() => Logs, (logs) => logs.userk)
  logs: Logs[];
  //这里的OneToMany表示一个User对应多个logs
  //() => Logs表示:1.和谁建立oneToMany的关系，和Logs表建立; 2.箭头函数表示返回回来的数据类型是Logs的实体类;3.由于
  //user表是1对多,因此返回的是Logs类的数组
  //(logs) => logs.userk 表示和多表中的哪个字段建立关系，表示和logs表中的userk字段建立关系，也就是外键为userk

  @OneToMany(() => User_roles_rel, (user_roles_rel) => user_roles_rel.user)
  user_roles_rel: User_roles_rel[];
}
