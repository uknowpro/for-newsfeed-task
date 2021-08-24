import { ApiProperty } from '@nestjs/swagger';
import { exceptionConst, errorMessageConst } from '../constants';

export class ErrorResponse {
  @ApiProperty({
    example: [
        exceptionConst.BadRequestException,
        exceptionConst.ForbiddenException,
        exceptionConst.InternalServerErrorException,
        exceptionConst.NotFoundException,
        exceptionConst.UnexpectedException
    ]
  })
  errorType: string;

  @ApiProperty({
    example: [
      errorMessageConst.BadRequest,
      errorMessageConst.Forbidden,
      errorMessageConst.InternalServerError,
      errorMessageConst.NotFound,
      errorMessageConst.Unexpected
    ]
  })
  errorMessage: string;

  @ApiProperty({
  })
  errors: [object, string];
}
