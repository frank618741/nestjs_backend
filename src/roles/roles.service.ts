import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../entities/roles.entity';
import { User } from '../entities/user.entity';
import { Auth } from '../entities/auth.entity';
import { Roles_auth_rel } from '../entities/roles_auth_rel.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles) private readonly roleRepository: Repository<Roles>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    const newRole = await this.roleRepository.merge(role, updateRoleDto);
    return await this.roleRepository.save(newRole);
  }

  async remove(id: number) {
    //delete是硬删除会直接删除数据库上的数据 生产上不建议
    //建议使用remove软删除
    //利用remove删除的数据可以在数据库中新建一张表来存储
    const roletemp = await this.findOne(id);
    return await this.roleRepository.remove(roletemp);
  }

  async findRoleAndAuthAll() {
    return await this.roleRepository
      .createQueryBuilder('role')
      .select([
        'role.id as roleId',
        'role.name as roleName',
        'auth.authName as authName',
      ])
      .leftJoin(
        Roles_auth_rel,
        'roles_auth_rel',
        'role.id = roles_auth_rel.rolesId',
      )
      .leftJoin(Auth, 'auth', 'auth.id = roles_auth_rel.authId')
      //上面的三表联查，对应的sql语句如下
      // select u.username, u.id as userid, rel.rolesId, roles.name as roleName from user u left join user_roles_rel rel
      // on u.id = rel.userId left join roles on rel.rolesId = roles.id;

      // .where('user.id = :id', { id })

      .take(10)
      .getRawMany();
  }
}
