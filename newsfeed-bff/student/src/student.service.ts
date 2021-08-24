import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PatchStudentDto } from './dto/patch-student.dto';
import { Result, User, News, UserResponse, NewsResponse } from '@newsfeed/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('News') private readonly newsModel: Model<News>,
  ) {}
  
  async createOne(createStudentDto: CreateStudentDto): Promise<Result<UserResponse[]>> {
    const user = new this.userModel(this.buildUserInfo(createStudentDto));
    await this.isIdUnique(user.id);
    await user.save();
    return Result.of([this.buildStudentInfo(user)]);
  }

  async findOne(userId: string, studentId: string): Promise<Result<UserResponse[]>> {
    if (userId != studentId) {
      throw new BadRequestException('Can not see other student info.');
    }
    const user = await this.userModel.findOne({id: studentId});
    if (!user) {
      throw new BadRequestException('No student exist.');
    }
    return Result.of([this.buildStudentInfo(user)]);
  }

  async updateOne(userId: string, studentId: string, updateStudentDto: UpdateStudentDto): Promise<any> {
    if (userId != studentId) {
      throw new BadRequestException('Can not modify other student info.');
    }
    const user = await this.userModel.findOne({id: studentId});
    if (!user) {
      throw new BadRequestException('No student exist.');
    }
    await this.userModel.updateOne({id: studentId}, updateStudentDto);
    return;
  }

  async patchOne(userId: string, studentId: string, patchStudentDto: PatchStudentDto): Promise<any> {
    if (userId != studentId) {
      throw new BadRequestException('Can not modify other student info.');
    }
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
    const user = await this.userModel.findOne({id: studentId});
    if (!user) {
      throw new BadRequestException('No student exist.');
    }
    await this.userModel.updateOne({id: studentId}, patchDocument);
    return;
  }

  async deleteOne(userId: string, studentId: string): Promise<any> {
    if (userId != studentId) {
      throw new BadRequestException('Can not delete other student info.');
    }
    const user = await this.userModel.findOne({id: studentId});
    if (!user) {
      throw new BadRequestException('No student exist.');
    }
    await this.userModel.deleteOne({id: studentId});
    return;
  }

  async findSubscriptionNewsAll(userId: string, studentId: string): Promise<Result<NewsResponse[]>> {
    if (userId != studentId) {
      throw new BadRequestException('Can not see other student info.');
    }
    const student = await this.userModel.findOne({id: studentId});
    if (!student) {
      throw new BadRequestException('No student exist.');
    }
    const subscriptionPages = student.subscriptionPages.map(async pageId => {
      return {pageId: pageId};
    });
    const newsResults = await this.newsModel.find({$or: subscriptionPages}).sort({'createdAt': -1});
    const news: NewsResponse[] = await Promise.all(newsResults.map(result => this.buildNewsInfo(result)));
    return Result.of(news);
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
      createdAt: user.createdAt,
      extra: user.extra || {}
    };
    return userRegistrationInfo;
  }

  private buildNewsInfo(news: News): NewsResponse {
    if (!news) {
      return;
    }
    const newsInfo = {
      newsId: news.id,
      title: news.title,
      content: news.content,
      createdAt: news.createdAt,
      extra: news.extra || {}
    };
    return newsInfo;
  }

  private async isIdUnique(id: string) {
    const user = await this.userModel.findOne({id});
    if (user) {
        throw new BadRequestException('Already exists student.');
    }
  }
}