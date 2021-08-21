let env = process.env.RUN_TIME_ENV || 'default';

const configs = {
    default: {
        mongoUri: "mongodb://mongo:27017/newsfeed"
    },
    dev: {
        mongoUri: "mongodb://mongo:27017/newsfeed"
    },
    prod: {
        mongoUri: "mongodb://mongo:27017/newsfeed"
    }
}

export default () => configs[env];
