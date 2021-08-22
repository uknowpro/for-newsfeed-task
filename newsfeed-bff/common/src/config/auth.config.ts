let env = process.env.RUN_TIME_ENV || 'default';

const configs = {
  default: {
    adminAuth: {
        id: 'admin',
        password: 'admin12~!'
    }
  },
  dev : {
    adminAuth: {
        id: 'admin',
        password: 'admin12~!'
    }
  },
  prod: {
    adminAuth: {
        id: 'admin',
        password: 'admin12~!'
    }
  }
}

export default () => (configs[env]);
