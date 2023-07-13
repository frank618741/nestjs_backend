import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from '../entities/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async create(createRoleDto: CreateStaffDto) {
    const stafftemp = await this.staffRepository.create(createRoleDto);
    return await this.staffRepository.save(stafftemp);
  }

  findAll() {
    return this.staffRepository.find();
  }

  findOne(id: number) {
    return this.staffRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const stafftemp = await this.findOne(id);
    const newStaff = await this.staffRepository.merge(
      stafftemp,
      updateStaffDto,
    );
    return await this.staffRepository.save(newStaff);
  }

  async remove(id: number) {
    //delete是硬删除会直接删除数据库上的数据 生产上不建议
    //建议使用remove软删除
    //利用remove删除的数据可以在数据库中新建一张表来存储
    const stafftemp = await this.findOne(id);
    return await this.staffRepository.remove(stafftemp);
  }
}
