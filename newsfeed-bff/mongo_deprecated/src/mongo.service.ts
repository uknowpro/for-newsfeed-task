import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MongoService {
    constructor(
      // @InjectModel('Page') public readonly pageModel: Model<any>,
      // @InjectModel('User') public readonly userModel: Model<any>,
      // @InjectModel('News') public readonly newsModel: Model<any>,
    ) {}
}
