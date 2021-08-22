// export * from './config/app.config';
import auth from './config/auth.config';
import db from './config/db.config';
import log from './config/log.config';
export * from './response/result';
export * from './schema/user.schema';
export * from './schema/page.schema';
export * from './schema/news.schema';
export * from './guard/roles.guard';

export default [auth, db, log]
