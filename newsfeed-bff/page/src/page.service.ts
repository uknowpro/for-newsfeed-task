import { Injectable, Inject, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Result, Page, News, User, PageResponse } from '@newsfeed/common';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PageService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Page') private readonly pageModel: Model<Page>,
    @InjectModel('News') private readonly newsModel: Model<News>,
  ) {}

  async createOne(createPageDto: CreatePageDto): Promise<Result<PageResponse[]>> {
    const pageDocument = this.buildPageDocument(createPageDto);
    const page = new this.pageModel(pageDocument);
    await this.isPageUnique(page.schoolName, page.region, page.name);
    await page.save();
    return Result.of([this.buildPageInfo(pageDocument)]);
  }

  async findAll(subscriptorId: string): Promise<Result<PageResponse[]>> {
    let pageResults: any;
    if (subscriptorId) {
      const subscriptor = await this.userModel.findOne({id: subscriptorId});
      if (!subscriptor) {
        throw new BadRequestException('No subscriptor exist.');
      }
      const subscriptionPages = subscriptor.subscriptionPages.map(async pageId => {
        return {id: pageId};
      });
      pageResults = await this.pageModel.find({$or: subscriptionPages}).sort({'createdAt': -1});
    } else {
      pageResults = await this.pageModel.find().sort({'createdAt': -1});
    }
    const pages: PageResponse[] = await Promise.all(pageResults.map(result => this.buildPageInfo(result)));
    return Result.of(pages);
  }

  async findOne(pageId: string): Promise<Result<PageResponse[]>> {
    const page = await this.pageModel.findOne({id: pageId});
    if (!page) {
      throw new BadRequestException('No page found.');
    }
    return Result.of([this.buildPageInfo(page)]);
  }

  async updateOne(pageId: string, updatePageDto: UpdatePageDto): Promise<any> {
    const page = await this.pageModel.findOne({id: pageId});
    if (!page) {
      throw new BadRequestException('No page found.');
    }
    await this.pageModel.updateOne({id: pageId}, updatePageDto);
    return;
  }

  async deleteOne(pageId: string): Promise<any> {
    const page = await this.pageModel.findOne({id: pageId});
    if (!page) {
      throw new BadRequestException('No page found.');
    }
    await this.pageModel.deleteOne({id: pageId});
    await this.newsModel.deleteMany({pageId});
    return;
  }

  private buildPageInfo(page: Page): PageResponse {
    const pageInfo = {
      pageId: page.id,
      schoolName: page.schoolName,
      region: page.region,
      name: page.name,
      description: page.description,
      extra: page.extra || {}
    };
    return pageInfo;
  }

  private buildPageDocument(page: CreatePageDto): Page {
    const pageDocument = {
      id: uuidv4(),
      schoolName: page.schoolName,
      region: page.region,
      name: page.name,
      description: page.description || '',
      extra: page.extra || {}
    };
    return pageDocument;
  }

  private async isPageUnique(schoolName: string, region: string, name: string) {
    const user = await this.pageModel.findOne({schoolName, region, name});
    if (user) {
        throw new BadRequestException('Already page exist.');
    }
  }
}
