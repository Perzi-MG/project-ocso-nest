import { Body, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
    private jwtservice: JwtService){}
  registerUser(createUserDto: CreateUserDto){
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5)
    return this.userRepository.save(createUserDto)
  }
  async loginUser(loginUserDto: LoginUserDto){
    const user = await this.userRepository.findOne({
      where: {
        userEmail: loginUserDto.userEmail
      }
    });
    if(!user) throw new UnauthorizedException("No estás autorizado");
    const match = await bcrypt.compare(
      loginUserDto.userPassword,
      user.userPassword
    );
    if(!match) throw new UnauthorizedException("No está autorizado");
    const payload = {
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRoles: user.userRoles
    }
    const token = this.jwtservice.sign(payload)
    return token
  }

  async updateUser(userEmail: string, updateUserDto: UpdateUserDto){
    const newUserData = await this.userRepository.preload({
      userEmail,
      ...updateUserDto
    })
    if(!newUserData) throw new NotFoundException()
    this.userRepository.save(newUserData)
    return newUserData
  }

}
