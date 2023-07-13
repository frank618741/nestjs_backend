import { Controller } from '@nestjs/common';
import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from 'src/entities/auth.entity';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    async getLogs() {
      return await this.authService.findAll();
    }
  
    @Post()
    async addUser(@Body() body: Auth) {
      // todo 解析Body参数
      return await this.authService.create(body);
    }
  
    @Get(':id')
    async getOneRole(@Param('id') id: string) {
      return await this.authService.findOne(+id);
    }
  
    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() bodyDto: Auth) {
      // todo 传递参数id
      
      return await this.authService.update(+id, bodyDto[0]);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return await this.authService.remove(+id);
    }

    
}
