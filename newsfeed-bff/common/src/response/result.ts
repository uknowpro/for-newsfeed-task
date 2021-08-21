export abstract class Result<T> {
  static of<T>(data: T, extraData: any = null) {
    return Object.setPrototypeOf(
      {
        data: {
          data,
          extraData
        },
        message: ""
      }, Result.prototype);
  }
}
