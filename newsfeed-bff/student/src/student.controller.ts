import { Req, Body, Controller, Get, Put, Patch, Headers, Param, Post, Delete, HttpException, HttpStatus, SetMetadata } from '@nestjs/common';
import { 
  ApiBearerAuth, 
  ApiOperation, 
  ApiExtraModels, 
  ApiTags,
  ApiHeader,
  ApiQuery,
  ApiResponse, 
  ApiOkResponse, 
  ApiInternalServerErrorResponse, 
  ApiBadRequestResponse, 
  ApiForbiddenResponse, 
  getSchemaPath 
} from '@nestjs/swagger';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PatchStudentDto } from './dto/patch-student.dto';
import { 
  Result, 
  StudentResponse, 
  SubscriptionNewsResponse, 
  ErrorResponse, 
  errorResponseConst, 
  errorMessageConst, 
  apiHeaderConst 
} from '@newsfeed/common';

@ApiTags('Student')
@Controller('students')
@ApiExtraModels(StudentResponse, SubscriptionNewsResponse, ErrorResponse)
export class StudentController {
  constructor(private readonly studentService: StudentService) {
  }

  @Post('')
  @SetMetadata('roles', ['public'])
  @ApiOperation({ 
    summary: '학생 정보를 등록',
    description: `
      * 누구나 자유롭게 학생 정보를 등록할 수 있습니다. 따라서, 등록자가 학생 신분인지를 검증하지 않습니다.
      * 등록시, 구독이 가능한 페이지인지를 검증하지 않습니다.
      * 학생 ID는 중복될 수 없습니다.
    `
  })
  @ApiBadRequestResponse({ 
    description: errorMessageConst.BadRequest, 
    schema: { type: 'object', properties: errorResponseConst } 
  })
  @ApiForbiddenResponse({ 
    description: errorMessageConst.Forbidden, 
    schema: { type: 'object', properties: errorResponseConst }
  })
  @ApiInternalServerErrorResponse({ 
    description: errorMessageConst.InternalServerError, 
    schema: { type: 'object', properties: errorResponseConst } 
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      required: ['data', 'extraData'],
      properties: {
        data: { type: 'array', items: { type: 'object', $ref: getSchemaPath(StudentResponse) } },
        extraData: { type: 'object' }
      },
    },
  })
  async createOne(
    @Body() body: CreateStudentDto
  ): Promise<any> {
    try {
      return await this.studentService.createOne(body);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':studentId')
  @ApiBearerAuth()
  @SetMetadata('roles', ['user'])
  @ApiOperation({ 
    summary: '학생 정보를 조회',
    description: `
      * 학생만 자신의 정보를 조회할 수 있습니다.
    `
  })
  @ApiHeader(apiHeaderConst)
  @ApiBadRequestResponse({ 
    description: errorMessageConst.BadRequest, 
    schema: { type: 'object', properties: errorResponseConst } 
  })
  @ApiForbiddenResponse({ 
    description: errorMessageConst.Forbidden, 
    schema: { type: 'object', properties: errorResponseConst }
  })
  @ApiInternalServerErrorResponse({ 
    description: errorMessageConst.InternalServerError, 
    schema: { type: 'object', properties: errorResponseConst } 
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    schema: {
      type: 'object',
      required: ['data', 'extraData'],
      properties: {
        data: { type: 'array', items: { type: 'object', $ref: getSchemaPath(StudentResponse) } },
        extraData: { type: 'object' }
      },
    },
  })
  async findOne(
    @Headers('Authorization') authorization: string, 
    @Param('studentId') studentId: string
  ): Promise<Result<StudentResponse>> {
    try {
      const token: string = authorization.replace('Bearer ', '');
      const account: string[] = (Buffer.from(token, 'base64').toString('utf8')).split(':');
      return await this.studentService.findOne(account[0], studentId);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':studentId')
  @SetMetadata('roles', ['user'])
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: '학생 정보를 수정',
    description: `
      * 학생만 자신의 정보를 수정할 수 있습니다.
    `
  })
  @ApiHeader(apiHeaderConst)
  @ApiBadRequestResponse({ 
    description: errorMessageConst.BadRequest, 
    schema: { type: 'object', properties: errorResponseConst } 
  })
  @ApiForbiddenResponse({ 
    description: errorMessageConst.Forbidden, 
    schema: { type: 'object', properties: errorResponseConst }
  })
  @ApiInternalServerErrorResponse({ 
    description: errorMessageConst.InternalServerError, 
    schema: { type: 'object', properties: errorResponseConst } 
  })
  @ApiOkResponse({ description: 'Ok.' })
  async updateOne(
    @Headers('Authorization') authorization: string, 
    @Param('studentId') studentId: string,
    @Body() body: UpdateStudentDto
  ): Promise<any> {
    try {
      const token: string = authorization.replace('Bearer ', '');
      const account: string[] = (Buffer.from(token, 'base64').toString('utf8')).split(':');
      return await this.studentService.updateOne(account[0], studentId, body);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':studentId')
  @SetMetadata('roles', ['user'])
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: '학생 계정의 패스워드 또는 학교 소식 구독정보를 수정',
    description: `
      * 학생만 자신의 패스워드를 수정 또는 학교 소식 구독정보를 수정할 수 있습니다.
      * 구독정보를 수정시, 구독이 가능한 페이지인지를 검증하지 않습니다. 
    `
  })
  @ApiHeader(apiHeaderConst)
  @ApiBadRequestResponse({ 
    description: errorMessageConst.BadRequest, 
    schema: { type: 'object', properties: errorResponseConst } 
  })
  @ApiForbiddenResponse({ 
    description: errorMessageConst.Forbidden, 
    schema: { type: 'object', properties: errorResponseConst }
  })
  @ApiInternalServerErrorResponse({ 
    description: errorMessageConst.InternalServerError, 
    schema: { type: 'object', properties: errorResponseConst } 
  })
  @ApiOkResponse({ description: 'Ok.' })
  async patchOne(
    @Headers('Authorization') authorization: string, 
    @Param('studentId') studentId: string,
    @Body() body: PatchStudentDto
  ): Promise<any> {
    try {
      const token: string = authorization.replace('Bearer ', '');
      const account: string[] = (Buffer.from(token, 'base64').toString('utf8')).split(':');
      return await this.studentService.patchOne(account[0], studentId, body);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':studentId')
  @SetMetadata('roles', ['user'])
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: '학생 정보를 삭제',
    description: `
      * 학생만 자신의 정보를 삭제할 수 있습니다.
    `
  })
  @ApiHeader(apiHeaderConst)
  @ApiBadRequestResponse({ 
    description: errorMessageConst.BadRequest, 
    schema: { type: 'object', properties: errorResponseConst } 
  })
  @ApiForbiddenResponse({ 
    description: errorMessageConst.Forbidden, 
    schema: { type: 'object', properties: errorResponseConst }
  })
  @ApiInternalServerErrorResponse({ 
    description: errorMessageConst.InternalServerError, 
    schema: { type: 'object', properties: errorResponseConst } 
  })
  @ApiOkResponse({ description: 'Ok.' })
  async deleteOne(
    @Headers('Authorization') authorization: string, 
    @Param('studentId') studentId: string
  ): Promise<any> {
    try {
      const token: string = authorization.replace('Bearer ', '');
      const account: string[] = (Buffer.from(token, 'base64').toString('utf8')).split(':');
      return await this.studentService.deleteOne(account[0], studentId);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':studentId/subscription-news')
  @SetMetadata('roles', ['user'])
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: '학생의 구독중인 학교 소식들을 조회',
    description: `
      * 학생만 자신의 구독중인 학교 소식들을 조회할 수 있습니다.
      * 가장 최근에 생성된 소식부터 정렬됩니다.
      * 현재, 페이징이 고려되어 있지 않으며, 페이징 적용시 추가 데이터는 extraData에 반영합니다.
    `
  })
  @ApiHeader(apiHeaderConst)
  @ApiBadRequestResponse({ 
    description: errorMessageConst.BadRequest, 
    schema: { type: 'object', properties: errorResponseConst } 
  })
  @ApiForbiddenResponse({ 
    description: errorMessageConst.Forbidden, 
    schema: { type: 'object', properties: errorResponseConst }
  })
  @ApiInternalServerErrorResponse({ 
    description: errorMessageConst.InternalServerError, 
    schema: { type: 'object', properties: errorResponseConst } 
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    schema: {
      type: 'object',
      required: ['data', 'extraData'],
      properties: {
        data: { type: 'array', items: { type: 'object', $ref: getSchemaPath(SubscriptionNewsResponse) } },
        extraData: { type: 'object' }
      },
    },
  })
  async findSubscriptionNewsAll(
    @Headers('Authorization') authorization: string, 
    @Param('studentId') studentId: string
  ): Promise<Result<SubscriptionNewsResponse[]>> {
    try {
      const token: string = authorization.replace('Bearer ', '');
      const account: string[] = (Buffer.from(token, 'base64').toString('utf8')).split(':');
      return await this.studentService.findSubscriptionNewsAll(account[0], studentId);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    } 
  }
}
