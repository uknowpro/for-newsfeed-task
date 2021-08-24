import { ApiProperty } from '@nestjs/swagger';
import { exceptionConst } from '../constants';

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
    example: 'Unexpected exception arise.'
  })
  errorMessage: string;

  @ApiProperty({
  })
  errors: [object, string];
}
