import { Injectable, Inject, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Result, Page, User, PageResponse } from '@newsfeed/common';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PageService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Page') private readonly pageModel: Model<Page>,
  ) {}

  async createOne(createPageDto: CreatePageDto): Promise<Result<PageResponse[]>> {
    const pageDocument = this.buildPageDocument(createPageDto);
    const page = new this.pageModel(pageDocument);
    await this.isPageNameUnique(page.name);
    await page.save();
    return Result.of([this.buildPageInfo(pageDocument)]);
  }

  async findAll(subscriptorId: string): Promise<Result<PageResponse[]>> {
    let pageResults: any;
    if (subscriptorId) {
      const subscriptor = await this.userModel.findOne({id: subscriptorId});
      if (!subscriptor) {
        throw new NotFoundException('No subscriptor found.');
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
      throw new NotFoundException('No page found.');
    }
    return Result.of([this.buildPageInfo(page)]);
  }

  async updateOne(pageId: string, updatePageDto: UpdatePageDto): Promise<any> {
    const page = await this.pageModel.findOne({id: pageId});
    if (!page) {
      throw new NotFoundException('No page found.');
    }
    await this.pageModel.updateOne({id: pageId}, updatePageDto);
    return;
  }

  async deleteOne(id: string): Promise<any> {
    const page = await this.pageModel.findOne({id});
    if (!page) {
      throw new NotFoundException('No page found.');
    }
    await this.pageModel.deleteOne({id});
    return;
  }

  private buildPageInfo(page: Page): PageResponse {
    const pageInfo = {
      pageId: page.id,
      name: page.name,
      description: page.description,
      extra: page.extra || {}
    };
    return pageInfo;
  }

  private buildPageDocument(page: CreatePageDto): Page {
    const pageDocument = {
      id: uuidv4(),
      name: page.name,
      description: page.description,
      extra: page.extra || {}
    };
    return pageDocument;
  }

  private async isPageNameUnique(name: string) {
    const user = await this.pageModel.findOne({name});
    if (user) {
        throw new BadRequestException('Already exists page name.');
    }
  }
}
