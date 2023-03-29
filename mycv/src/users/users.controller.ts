import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { Session } from '@nestjs/common/decorators';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import AuthService from './auth.service';
import CreateUserDto from './dtos/create-user.dto';
import UpdateUserDto from './dtos/update-user.dto';
import UserDto from './dtos/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get('/')
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
