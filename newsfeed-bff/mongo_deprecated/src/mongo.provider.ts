import { Connection } from 'mongoose';
import { PageSchema, NewsSchema, UserSchema } from '@newsfeed/common';

export const mongoProviders = [
  {
    provide: 'PAGE_MODEL',
    useFactory: (connection: Connection) => connection.model('Page', PageSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'NEWS_MODEL',
    useFactory: (connection: Connection) => connection.model('News', NewsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
