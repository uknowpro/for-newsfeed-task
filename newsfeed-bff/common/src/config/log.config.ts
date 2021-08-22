let env = process.env.RUN_TIME_ENV || 'default';

const configs = {
  default: {
    log: {
      isColorEnabled: true,
      levels: [
        "error",
        "warn",
        "log",
        "debug",
        "verbose"
      ]
    }
  },
  dev : {
    log: {
      isColorEnabled: false,
      levels: [
        "error",
        "warn",
        "log",
        "debug",
        "verbose"
      ]
    }
  },
  prod: {
    log: {
      isColorEnabled: false,
      levels: [
        "error",
        "warn",
        "log",
      ]
    }
  },
}

export default () => (configs[env]);
