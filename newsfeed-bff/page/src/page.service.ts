import { Injectable, Inject, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
// import { Result, NotFoundException } from '@newsfeed-bff/common';
import { Page } from './interface/page.interface';
import { User } from './interface/user.interface';
import { Model, Schema } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class PageService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Page') private readonly pageModel: Model<Page>,
  ) {}

  async createOne(createPageDto: CreatePageDto): Promise<Page> {
    const page = this.buildPageDocument(createPageDto);
    const pageModel = new this.pageModel(page);
    await pageModel.save();
    return page;
  }

  async findAll(subscriptorId: string): Promise<Page[]> {
    let pageResults: any;
    if (subscriptorId) {
      const user = await this.userModel.findOne({subscriptorId});
      if (!user) {
        throw new NotFoundException('No subscriptor found.');
      }
      const subscriptionPages = user.subscriptionPages.map(async pageId => {
        return {id: pageId};
      });
      pageResults = await this.pageModel.find({$or: subscriptionPages}).sort({'createdAt': -1});
    } else {
      pageResults = await this.pageModel.find().sort({'createdAt': -1});
    }
    const pages: Page[] = await Promise.all(pageResults.map(result => this.buildPageInfo(result)));
    return pages;
  }

  async findOne(id: string): Promise<Page> {
    const page = await this.pageModel.findOne({id});
    if (!page) {
      throw new NotFoundException('No page found.');
    }
    return this.buildPageInfo(page);
  }

  async updateOne(id: string, updatePageDto: UpdatePageDto): Promise<any> {
    const page = await this.pageModel.findOne({id});
    if (!page) {
      throw new NotFoundException('No page found.');
    }
    await this.pageModel.updateOne({id: id}, updatePageDto);
    return;
  }

  async removeOne(id: string): Promise<any> {
    const page = await this.pageModel.findOne({id});
    if (!page) {
      throw new NotFoundException('No page found.');
    }
    await this.pageModel.remove({id});
    return;
  }

  private buildPageInfo(page: Page): any {
    const pageInfo = {
      pageId: page.id,
      name: page.name,
      description: page.description,
      extra: page.extra || {}
    };
    return pageInfo;
  }

  private buildPageDocument(page: CreatePageDto): any {
    const pageDocument = {
      pageId: 'uuid',
      name: page.name,
      description: page.description,
      extra: page.extra || {}
    };
    return pageDocument;
  }
}
