import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { User } from '../entities/user.entity';
import { Logs } from '../entities/logs.entity';
import { Auth } from '../entities/auth.entity';
import { User_roles_rel } from '../entities/user_roles_rel.entity';
import { Roles_auth_rel } from 'src/entities/roles_auth_rel.entity';
import { getUserDto } from './dto/get-user.dto';
import { Roles } from '../entities/roles.entity';
import { Staff } from '../entities/staff.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
  ) {}

  findAll(query: getUserDto) {
    const { limit, page, username, gender, role } = query;
    const take = limit || 10;
    const skip = (page || 1 - 1) * take;

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'role');

    queryBuilder.andWhere(username ? 'user.username = :username' : '1=1', {
      username: username,
    });

    const tempobj = {
      'profile.gender': gender,
      'role.id': role,
    };
    Object.keys(tempobj).forEach((key) => {
      //Object.keys()用于获得由对象属性名组成的数组
      //Object.keys(tempobj)新组成的数组为['profile.gender','role.id']
      //tempobj[key]就是指tempobj['profile.gender'] tempobj['role.id']
      //tempobj['profile.gender']的值为1 tempobj['role.id']的值为admin
      //key的具体值是profile.gender和role.id
      //`${key}`的具体值取的是数组里的字符串profile.gender和rolesk.id。 typeof`${key}`是string

      //[key]在javascript语法中，中括号[]运算符可以用字符串变量的内容作为属性名.实例如下：
      // let test:string = 'testname';
      // let exampleObj = {
      //   [test] : 'kengeng',
      // }
      // console.log(exampleObj.testname)的值就是 kengeng。这里的[test]就是属性名testname

      //同样的道理，这里的[key]就是属性名 profile.gender 或者role.id。[key]这里和`${key}`对应。
      //为了更有说服力 可以将代码
      //改为 queryBuilder.andWhere(`${key} = :${key+'valuename'}`, { [key+'valuename']: tempobj[key] });
      //根据typeorm的语法规则，[key]这里和`${key}`对应相同即可，
      if (tempobj[key]) {
        queryBuilder.andWhere(`${key} = :${key}`, { [key]: tempobj[key] });
      }
    });

    // return this.userRepository.find();
    return queryBuilder.getRawMany();
    // return queryBuilder.getSql();
  }

  getUsers() {
    return this.userRepository.find();
  }

  find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: User) {
    const userTmp = await this.userRepository.create(user);
    return await this.userRepository.save(userTmp);
  }

  async update(id: number, user: Partial<User>) {
    // const userTemp = await this.findProfile(id);
    // const newUser = this.userRepository.merge(userTemp,user);
    // //联合模型 需要使用save方法
    // 一般避免使用联合查询
    // return  this.userRepository.save(newUser);

    const userTemp = await this.findOne(id);
    const newUser = await this.userRepository.merge(userTemp, user);

    return await this.userRepository.save(newUser);

    // return await this.userRepository.update(id, user);
  }

  async remove(id: number) {
    //delete是硬删除会直接删除数据库上的数据 生产上不建议
    //建议使用remove软删除
    //利用remove删除的数据可以在数据库中新建一张表来存储
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }

  findProfile(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
  }

  async findUserAndLogs() {
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.username', 'log.id'])
      .addSelect('log.id')
      // .leftJoinAndSelect(Logs,'log','log.userk = user.id')
      //leftjoinandselect是将logs所有的字段全部查询 用on的方式

      .leftJoin(Logs, 'log', 'log.userk = user.id')
      //leftjoin是可以对应查询logs的对应字段，如log.id 用on的方式 在进行外连接查询的时候必须使用on

      // .leftJoinAndSelect('logs.userk', 'log')
      // .leftJoinAndSelect(Logs, "log", "log.userk = user.id")
      // .where()
      // .where('user.id = :id', { id })

      // .take(10)
      // .getSql();
      .getRawMany();
  }

  async findUserAndRoles(id: number) {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      // leftjoinandSelect里的第一个参数，还是建议写关系，不要写实例。例如上例中写user.roles不写Roles
      // 写关系的做法更通用一点
      // 即使是多对多 写成关系的方式更不容易出错

      .where('user.id = :id', { id })

      .take(10)
      // .getSql();
      .getRawMany();
  }

  async findUserRolesAuthAll() {
    return await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id as userId',
        // 'user.username as roleOwner',
        'roles.name as roleName',
        // 'auth.authName as authorityRange',
      ])
      //直接使用group_concat函数将不同的用户名合并
      .addSelect(
        'GROUP_CONCAT(DISTINCT user.username ORDER BY user.id SEPARATOR ", ") as roleOwner',
      )
      //直接使用group_concat函数将不同的权限名合并
      .addSelect(
        'GROUP_CONCAT(DISTINCT auth.authName ORDER BY auth.id SEPARATOR ", ") as authorityRange',
      )
      .leftJoin(
        User_roles_rel,
        'user_roles_rel',
        'user.id = user_roles_rel.userId',
      )
      .leftJoin(Roles, 'roles', 'roles.id = user_roles_rel.rolesId')
      .leftJoin(
        Roles_auth_rel,
        'roles_auth_rel',
        'roles.id = roles_auth_rel.rolesId',
      )
      .leftJoin(Auth, 'auth', 'auth.id = roles_auth_rel.authId')
      //上面的三表联查，对应的sql语句如下
      // select u.username, u.id as userid, rel.rolesId, roles.name as roleName from user u left join user_roles_rel rel
      // on u.id = rel.userId left join roles on rel.rolesId = roles.id;

      // .where('user.id = :id', { id })
      .groupBy('roles.name') //使用权限名来分组显示
      .take(10)
      .getRawMany();
  }

  async findUserAndStaff() {
    return await this.userRepository
      .createQueryBuilder('user')

      .select(['user.id as userNum', 'user.username as name'])
      .addSelect('roles.name as role')
      .addSelect([
        'staff.deptment as department',
        'staff.email as email',
        'staff.phoneNum as phoneNumber',
        'staff.staffID as userID',
      ])
      // .leftJoinAndSelect(Logs,'log','log.userk = user.id')
      //leftjoinandselect是将logs所有的字段全部查询 用on的方式

      .leftJoin(
        User_roles_rel,
        'user_roles_rel',
        'user.id = user_roles_rel.userId',
      )
      .leftJoin(Roles, 'roles', 'roles.id = user_roles_rel.rolesId')

      .leftJoin(Staff, 'staff', 'staff.staffName = user.username')
      // leftjoinandSelect里的第一个参数，还是建议写关系，不要写实例。例如上例中写user.roles不写Roles
      // 写关系的做法更通用一点
      // 即使是多对多 写成关系的方式更不容易出错

      // .where('user.username = :name',{name: Staff.staffName})

      // .take(10)
      // .getSql();
      .getRawMany();
  }
}
