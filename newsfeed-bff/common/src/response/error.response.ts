import { ApiProperty } from '@nestjs/swagger';
import { exceptionConst, errorMessageConst } from '../constants';

export class ErrorResponse {
  @ApiProperty({
    required: true,
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
    required: true,
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
    required: true,
  })
  errors: [object, string];
}
