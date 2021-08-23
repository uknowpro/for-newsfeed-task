import { Injectable, Inject, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Result, News, Page, NewsResponse } from '@newsfeed/common';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel('News') private readonly newsModel: Model<News>,
    @InjectModel('Page') private readonly pageModel: Model<Page>,
  ) {}

  async createOne(pageId: string, createNewsDto: CreateNewsDto): Promise<Result<NewsResponse[]>> {
    const page = this.pageModel.findOne({pageId});
    if (!page) {
      throw new NotFoundException('No page found.');
    }
    await this.isNewsTitleUnique(createNewsDto.title);
    const newsDocument = this.buildNewsDocument(pageId, createNewsDto);
    const news = new this.newsModel(newsDocument);
    try {
      await news.save();
      return Result.of([this.buildNewsInfo(newsDocument)]);
    } catch(err) {
      throw new BadRequestException(err);
    }
  }

  async findAll(pageId: string): Promise<Result<NewsResponse[]>> {
    const page = this.pageModel.findOne({pageId});
    if (!page) {
      throw new NotFoundException('No page found.');
    }

    const newsResults = await this.newsModel.find({pageId: {$eq: pageId}}).sort({'createdAt': -1});
    const news: News[] = await Promise.all(newsResults.map(result => this.buildNewsInfo(result)));
    return Result.of(news);
  }

  async findOne(pageId: string, newsId: string): Promise<Result<NewsResponse[]>> {
    const news = await this.newsModel.findOne({pageId, id: newsId});
    if (!news) {
      throw new NotFoundException('No news found.');
    }
    return Result.of([this.buildNewsInfo(news)]);
  }

  async updateOne(pageId: string, newsId: string, updateNewsDto: UpdateNewsDto): Promise<any> {
    const news = await this.newsModel.findOne({pageId, id: newsId});
    if (!news) {
      throw new NotFoundException('No news found.');
    }
    await this.newsModel.updateOne({id: newsId}, updateNewsDto);
    return;
  }

  async deleteOne(pageId: string, newsId: string): Promise<any> {
    const news = await this.newsModel.findOne({pageId, id: newsId});
    if (!news) {
      throw new NotFoundException('No news found.');
    }
    await this.newsModel.deleteOne({pageId, id: newsId});
    return;
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

  private buildNewsDocument(pageId: string, news: CreateNewsDto): News {
    const newsDocument = {
      id: uuidv4(),
      pageId: pageId,
      title: news.title,
      content: news.content,
      extra: news.extra || {}
    };
    return newsDocument;
  }

  private async isNewsTitleUnique(title: string) {
    const user = await this.newsModel.findOne({title});
    if (user) {
        throw new BadRequestException('Already exists news title.');
    }
  }
}
