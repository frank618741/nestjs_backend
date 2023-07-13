import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Body, Query, Param } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { getUserDto } from './dto/get-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  // -get:  从服务器段获取数，请求body在地址栏上

  // -post:  向服务器端提交数据，请求数据在保温body里
  //            发送一个修改数据的请求，需求数据要从新创建

  // -put:   向服务器端提交数据，请求数据在报文body里
  //           发送一个修改数据的请求，需求数据更新（全部更新）

  // -patch: 向服务器提交数据，请求数据在报文body里
  //             发送一个修改数据的请求，需求数据更新（部分更新）

  // -delete: 向服务器提交数据，请求数据在报文body里
  //             发送一个删除数据的请求

  @Get()
  async getUsers(@Query() query: getUserDto) {
    return await this.userService.getUsers();
  }

  @Get('/param')
  async getParams(@Query() query: getUserDto) {
    return await this.userService.findAll(query);
    // return this.userService.getUsers();
  }

  @Get('/userandroles')
  async getUserAndRoles(@Query() query): Promise<any> {
    // async deleteUser(@Query() query) {
    //   // todo 传递参数id query就是在Params里填入key和value值
    //   return await this.userService.remove(query.id);
    // }
    const res = await this.userService.findUserAndRoles(query.id);

    return res;
  }

  @Get('/userandstaff')
  async getUserAndStaff(): Promise<any> {
    const res = await this.userService.findUserAndStaff();

    return res;
  }

  @Get('/userrolesauthall')
  async getUserAndRolesAll(): Promise<any> {
    const res = await this.userService.findUserRolesAuthAll();

    return res;
  }

  @Get('/userandlogs')
  async getUserAndLogs(): Promise<any> {
    const res = await this.userService.findUserAndLogs();
    // return res.map((o) => ({
    //   result: o.result,
    //   count: o.count,
    // }));
    return res;
  }

  @Post()
  async addUser(@Body() body: User) {
    // todo 解析Body参数
    return await this.userService.create(body);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() bodyDto: User) {
    // todo 传递参数id
    // todo 异常处理

    //使用bodyDto[0]是因为bodyDto是一个数组[ { username: 'iokkmll', password: 'sssss' } ]
    //bodyDto[0]就是数组里的对象{ username: 'iokkmll', password: 'sssss' }
    //update函数中第二个参数的类型必须为对象
    // console.log(bodyDto);
    // console.log(bodyDto[0]);

    //另外这里还会出现“Property "0" was not found in "User ”的报错，主要原因就是数据的格式不对。换成对象格式就ok

    // 使用“+”一元运算符将字符串id转换为数字
    // 这里不用async await是因为在service里函数封装的时候，会使用async await
    return await this.userService.update(+id, bodyDto[0]);
  }

  //以下代码保留
  // @Param 是取url路径中的参数，@Query 是取查询字符串的参数 在postman的Params的key value值里。
  // @Delete()
  // async deleteUser(@Query() query) {
  //   // todo 传递参数id query就是在Params里填入key和value值
  //   return await this.userService.remove(query.id);
  // }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    // todo 传递参数id query就是在Params里填入key和value值
    return await this.userService.remove(+id);
  }
}
