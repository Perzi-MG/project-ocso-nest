import { Controller, Get, Post, Body, Patch, Param, Delete, Res, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TOKEN_NAME } from './constants/jwt.constants';
import { Cookies } from './Decorators/cookies.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register/employee/[id]")
  registerEmployee(@Body() createUserDto: CreateUserDto, @Param("id") id: string) {
    if (createUserDto.userRoles.includes("Admin") || createUserDto.userRoles.includes("Manager")) throw new BadRequestException("Rol Inválido")
    return this.authService.registerEmployee(id, createUserDto)
  }

  @Post("register/manager")
  registerManager(@Body() createUserDto: CreateUserDto, @Param("id") id: string) {
    if (createUserDto.userRoles.includes("Admin") || createUserDto.userRoles.includes("Employee")) throw new BadRequestException("Rol Inválido")
    return this.authService.registerManager(id, createUserDto)
  }

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response, @Cookies() cookies: any) {
    const token = await this.authService.loginUser(loginUserDto)
    let expireDate = new Date()
    expireDate.setDate(expireDate.getDay() + 7)
    response.cookie(TOKEN_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: expireDate,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    return;
  }
  @Patch("/:email")
  updateUser(@Param('email') userEmail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(userEmail, updateUserDto)
  }
}
