import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getRoles() {
    return await this.rolesService.findAll();
  }

  @Get('/roleandauthall')
  async getRoleAndUser(): Promise<any> {
    const res = await this.rolesService.findRoleAndAuthAll();

    return res;
  }

  @Get('/:id')
  async getOneRole(@Param('id') id: string) {
    return await this.rolesService.findOne(+id);
  }

  @Post()
  async addRoles(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Patch('/:id')
  async updateRoles(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return await this.rolesService.update(+id, updateRoleDto[0]);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.rolesService.remove(+id);
  }
}
