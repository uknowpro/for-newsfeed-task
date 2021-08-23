export abstract class Result<Array> {
  static of<Array>(data: Array, extraData: any = null) {
    return Object.setPrototypeOf(
      {
        data: data,
        extraData: extraData || {}
      }, Result.prototype);
  }
}
