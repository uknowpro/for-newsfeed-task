import { Body, Controller, Get, Put, Patch, Headers, Param, Post, Delete, HttpException, HttpStatus, SetMetadata } from '@nestjs/common';
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
  ApiUnauthorizedResponse, 
  getSchemaPath 
} from '@nestjs/swagger';
import { Result } from '@newsfeed/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PatchStudentDto } from './dto/patch-student.dto';
import { StudentResponse } from './response/student.response';
import { SubscriptionNewsResponse } from './response/subscription-news.response';

@ApiTags('Student')
@Controller('students')
@ApiExtraModels(StudentResponse, SubscriptionNewsResponse)
export class StudentController {
  constructor(private readonly studentService: StudentService) {
  }

  @Post('')
  @SetMetadata('role', 'public')
  @ApiOperation({ 
    summary: '학생 정보를 등록',
    description: `
      * 누구나 자유롭게 학생 정보를 등록할 수 있습니다. 따라서, 등록자가 학생 신분인지를 검증하지 않습니다.
      * 등록시, 구독이 가능한 페이지인지를 검증하지 않습니다.
    `
  })
  @ApiBadRequestResponse({ 
    description: 'Bad request.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiUnauthorizedResponse({ 
    description: 'Forbidden.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiResponse({
    status: 201,
    description: 'Created.',
    schema: {
      type: 'object', properties: {
        data: { type: 'array', items: { type: 'object', $ref: getSchemaPath(StudentResponse) } },
        extraData: { type: 'object' }
      },
    },
  })
  async createOne(
    @Body() body: CreateStudentDto
  ): Promise<any> {
    return await this.studentService.createOne(body);
  }

  @Get(':studentId')
  @ApiBearerAuth()
  @SetMetadata('role', 'user')
  @ApiOperation({ 
    summary: '학생 정보를 조회',
    description: `
      * 학생만 자신의 정보를 조회할 수 있습니다.
    `
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
  @ApiBadRequestResponse({ 
    description: 'Bad request.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiUnauthorizedResponse({ 
    description: 'Forbidden.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Internal error.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    schema: {
      type: 'object', properties: {
        data: { type: 'array', items: { type: 'object', $ref: getSchemaPath(StudentResponse) } },
        extraData: { type: 'object' }
      },
    },
  })
  async findOne(
    @Headers('Authorization') authorization: string, 
    @Param('studentId') studentId: string
  ): Promise<Result<StudentResponse>> {
    return await this.studentService.findOne(studentId);
  }

  @Put(':studentId')
  @SetMetadata('role', 'user')
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: '학생 정보를 수정',
    description: `
      * 학생만 자신의 정보를 수정할 수 있습니다.
    `
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
  @ApiBadRequestResponse({ 
    description: 'Bad request.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiUnauthorizedResponse({ 
    description: 'Forbidden.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Internal error.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiOkResponse({ description: 'Ok.' })
  async updateOne(
    @Headers('Authorization') authorization: string, 
    @Param('studentId') studentId: string,
    @Body() body: UpdateStudentDto
  ): Promise<any> {
    return await this.studentService.updateOne(studentId, body);
  }

  @Patch(':studentId')
  @SetMetadata('role', 'user')
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: '학생 계정의 패스워드 또는 학교 소식 구독정보를 수정',
    description: `
      * 학생만 자신의 패스워드를 수정 또는 학교 소식 구독정보를 수정할 수 있습니다.
      * 구독정보를 수정시, 구독이 가능한 페이지인지를 검증하지 않습니다. 
    `
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
  @ApiBadRequestResponse({ 
    description: 'Bad request.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiUnauthorizedResponse({ 
    description: 'Forbidden.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Internal error.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiOkResponse({ description: 'Ok.' })
  async patchOne(
    @Headers('Authorization') authorization: string, 
    @Param('studentId') studentId: string,
    @Body() body: PatchStudentDto
  ): Promise<any> {
    return await this.studentService.patchOne(studentId, body);
  }

  @Delete(':studentId')
  @SetMetadata('role', 'user')
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: '학생 정보를 삭제',
    description: `
      * 학생만 자신의 정보를 삭제할 수 있습니다.
    `
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
  @ApiBadRequestResponse({ 
    description: 'Bad request.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiUnauthorizedResponse({ 
    description: 'Forbidden.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Internal error.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiOkResponse({ description: 'Ok.' })
  async removeOne(
    @Headers('Authorization') authorization: string, 
    @Param('studentId') studentId: string
  ): Promise<any> {
    return await this.studentService.removeOne(studentId);
  }

  @Get(':studentId/subscription-news')
  @SetMetadata('role', 'user')
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: '학생의 구독중인 학교 소식들을 조회',
    description: `
      * 학생만 자신의 구독중인 학교 소식들을 조회할 수 있습니다.
      * 현재, 페이징이 고려되어 있지 않으며, 페이징 적용시 추가 데이터는 extraData에 반영합니다.
    `
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
  @ApiBadRequestResponse({ 
    description: 'Bad request.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiUnauthorizedResponse({ 
    description: 'Forbidden.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Internal error.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    schema: {
      type: 'object', properties: {
        data: { type: 'array', items: { type: 'object', $ref: getSchemaPath(SubscriptionNewsResponse) } },
        extraData: { type: 'object' }
      },
    },
  })
  async findSubscriptionNewsAll(
    @Headers('Authorization') authorization: string, 
    @Param('studentId') studentId: string
  ): Promise<Result<SubscriptionNewsResponse[]>> {
    return await this.studentService.findSubscriptionNewsAll(studentId);
  }
}
