import { Injectable, Inject, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './interface/news.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel('News') private readonly newsModel: Model<News>,
  ) {}

  async createOne(createNewsDto: CreateNewsDto): Promise<News> {
    const news = this.buildNewsDocument(createNewsDto);
    const newsModel = new this.newsModel(news);
    await newsModel.save();
    return news;
  }

  async findOne(id: string): Promise<News> {
    const news = await this.newsModel.findOne({id});
    if (!news) {
      throw new NotFoundException('No news found.');
    }
    return this.buildNewsInfo(news);
  }

  async updateOne(id: string, updateNewsDto: UpdateNewsDto): Promise<any> {
    const page = await this.newsModel.findOne({id});
    if (!page) {
      throw new NotFoundException('No news found.');
    }
    await this.newsModel.updateOne({id: id}, updateNewsDto);
    return;
  }

  async removeOne(id: string): Promise<any> {
    const news = await this.newsModel.findOne({id});
    if (!news) {
      throw new NotFoundException('No news found.');
    }
    await this.newsModel.remove({id});
    return;
  }

  private buildNewsInfo(news: News): any {
    const newsInfo = {
      newsId: news.id,
      title: news.title,
      content: news.content,
      extra: news.extra || {}
    };
    return newsInfo;
  }

  private buildNewsDocument(news: CreateNewsDto): any {
    const newsDocument = {
      newsId: 'uuid',
      title: news.title,
      content: news.content,
      extra: news.extra || {}
    };
    return newsDocument;
  }
}
