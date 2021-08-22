import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PatchStudentDto } from './dto/patch-student.dto';
// import { Result, NotFoundException } from '@newsfeed/common';
import { User } from './interface/user.interface';
import { Model } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}
  
  async createOne(createStudentDto: CreateStudentDto): Promise<User> {
    const user = new this.userModel(this.buildUserInfo(createStudentDto));
    await this.isIdUnique(user.id);
    await user.save();
    return this.buildStudentInfo(user);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({id});
    if (!user) {
      throw new NotFoundException('No student found.');
    }
    return this.buildStudentInfo(user);
  }

  async updateOne(id: string, updateStudentDto: UpdateStudentDto): Promise<any> {
    const user = await this.userModel.findOne({id});
    if (!user) {
      throw new NotFoundException('No student found.');
    }
    await this.userModel.updateOne({id: id}, updateStudentDto);
    return;
  }

  async patchOne(id: string, patchStudentDto: PatchStudentDto): Promise<any> {
    let patchDocument: any;
    if (patchStudentDto.type == 'password') {
      patchDocument = {
        password: patchStudentDto.password
      };
    } else if (patchStudentDto.type == 'subscription-pages') {
      patchDocument = {
        subscriptionPages: patchStudentDto.subscriptionPages
      };
    } else {
      throw new BadRequestException('Invalid type in request body data.');
    }
    const user = await this.userModel.findOne({id});
    if (!user) {
      throw new NotFoundException('No student found.');
    }
    await this.userModel.updateOne({id: id}, patchDocument);
    return;
  }

  async removeOne(id: string): Promise<any> {
    const user = await this.userModel.findOne({id});
    if (!user) {
      throw new NotFoundException('No student found.');
    }
    await this.userModel.remove({id});
    return;
  }

  async findSubscriptionNewsAll(id: string): Promise<any> {
    return;
  }

  private buildUserInfo(student: CreateStudentDto): any {
    const userRegistrationInfo = {
      name: student.name,
      id: student.studentId,
      password: student.password,
      subscriptionPages: student.subscriptionPages || [],
      extra: student.extra || {}
    };
    return userRegistrationInfo;
  }

  private buildStudentInfo(user: User): any {
    const userRegistrationInfo = {
      name: user.name,
      studentId: user.id,
      subscriptionPages: user.subscriptionPages || [],
      creationAt: user.creationAt,
      extra: user.extra || {}
    };
    return userRegistrationInfo;
  }

  private async isIdUnique(id: string) {
    const user = await this.userModel.findOne({id});
    if (user) {
        throw new BadRequestException('Already exists student.');
    }
  }
}