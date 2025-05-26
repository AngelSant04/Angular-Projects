import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs';

import { CreateUserDto, LoginDto, RegisterUserDto, UpdateAuthDto } from './dto';

import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData,
      });

      await newUser.save();
      // Renombro el password como _ y la descarto ya que solo retorno el user
      const { password: _, ...user } = newUser.toJSON();

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} already exist!`);
      }

      throw new InternalServerErrorException(
        error.message || 'Something terrible happened!!',
      );
    }
  }

  async register(registerDto: RegisterUserDto): Promise<LoginResponse> {
    // await this.create(registerDto);
    // return await this.login({
    //   email: registerDto.email,
    //   password: registerDto.password,
    // });
    const user = await this.create(registerDto);
    return {
      user: user,
      token: this.getJwToken({ id: user._id! }),
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Not valid credentials - email');
    }
    if (!bcryptjs.compareSync(password, user.password!)) {
      throw new UnauthorizedException('Not valid credentials - password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'The user is not active - isActive: false',
      );
    }

    const { password: _, ...rest } = user.toJSON();

    return {
      user: rest,
      token: this.getJwToken({ id: user.id }),
    };
  }

  findAll() {
    return this.userModel.find();
  }

  async findUserById(id: string) {
    return this.userModel.findById(id).select('-password');
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
