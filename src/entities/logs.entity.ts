import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  path: string;

  @Column({ default: null })
  methods: string;

  @Column({ default: null })
  data: string;

  @Column({ default: 0 })
  result: number;

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn()
  userk: User;
  //joinColumn()注解表明在user表(一的表)中创建一个特定的字段，与外键构成多对一的映射，建立对应的多对一关联关系
  //会自动的帮我们在多的表中自动创建与一表中对应的字段,也就是创建了外键userkId
  //Entity1(logs) is the owner of the relationship, and stores the id(即userkId) of Entity2(user) on its side of the relation.

  //() => User是一个箭头函数，返回的是一个名为User的class类，主要原因是我们并不关心ManytoOne关系中的userk id是
  //多少，只关心实体类里面的属性
  //表示和谁建立多对一的关系，表示和User表建立多对一关系。多表是本表logs表， 一表就是user表
  //(user) => user.logs表示多表中的外键和一表中的哪个字段建立关系，如上表示多表中的外键userkId和user表中的logs字段建立关联
}
