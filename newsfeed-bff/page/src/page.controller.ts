import { Body, Controller, Get, Put, Headers, Query, Param, Post, Delete, HttpException, HttpStatus, SetMetadata } from '@nestjs/common';
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
import { Result, PageResponse, ErrorResponse, errorResponseConst, errorMessageConst } from '@newsfeed/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@ApiBearerAuth()
@ApiTags('Page')
@Controller('pages')
@ApiExtraModels(PageResponse, ErrorResponse)
export class PageController {
  constructor(private readonly pageService: PageService) {
  }

  @Post('')
  @SetMetadata('role', 'admin')
  @ApiOperation({ 
    summary: '학교 페이지를 생성',
    description: `
      * 학교 관리자만 학교 페이지를 생성할 수 있습니다.
      * 학교 페이지명은 중복될 수 없습니다.
    `
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
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
        data: { type: 'array', items: { type: 'object', $ref: getSchemaPath(PageResponse) } },
        extraData: { type: 'object' }
      },
    },
  })
  async createOne(
    @Headers('Authorization') authorization: string,
    @Body() body: CreatePageDto
  ): Promise<any> {
    try {
      return await this.pageService.createOne(body);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('')
  @SetMetadata('role', ['admin', 'user'])
  @ApiOperation({ 
    summary: '학교 페이지들 또는 학생이 구독중인 페이지들을 조회',
    description: `
      * 학교 관리자 또는 학생만 학교 페이지들을 조회할 수 있습니다.
      * 구독자(학생) ID를 사용하면, 구독중인 학교 페이지들을 조회할 수 있습니다.
      * 가장 최근의 생성된 페이지순으로 정렬됩니다.
      * 현재, 페이징이 고려되어 있지 않으며, 페이징 적용시 추가 데이터는 extraData에 반영합니다.
    `
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
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
  @ApiQuery({ name: 'subscriptorId', required: false, type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    schema: {
      type: 'object',
      required: ['data', 'extraData'],
      properties: {
        data: { type: 'array', items: { type: 'object', $ref: getSchemaPath(PageResponse) } },
        extraData: { type: 'object' }
      },
    },
  })
  async findAll(
    @Headers('Authorization') authorization: string, 
    @Query('subscriptorId') subscriptorId: string
  ): Promise<Result<PageResponse[]>> {
    try {
      return await this.pageService.findAll(subscriptorId);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':pageId')
  @SetMetadata('role', ['admin', 'user'])
  @ApiOperation({ 
    summary: '학교 페이지를 조회',
    description: `
      * 학교 관리자 또는 학생만 학교 페이지를 조회할 수 있습니다.
    `
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
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
        data: { type: 'array', items: { type: 'object', $ref: getSchemaPath(PageResponse) } },
        extraData: { type: 'object' }
      },
    },
  })
  async findOne(
    @Headers('Authorization') authorization: string, 
    @Param('pageId') pageId: string
  ): Promise<Result<PageResponse>> {
    try {
      return await this.pageService.findOne(pageId);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':pageId')
  @SetMetadata('role', 'admin')
  @ApiOperation({ 
    summary: '학교 페이지를 수정',
    description: `
      * 학교 관리자만 학교 페이지를 수정할 수 있습니다.
    `
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
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
  async updateOne(
    @Headers('Authorization') authorization: string, 
    @Param('pageId') pageId: string,
    @Body() body: UpdatePageDto
  ): Promise<any> {
    try {
      return await this.pageService.updateOne(pageId, body);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':pageId')
  @SetMetadata('role', 'admin')
  @ApiOperation({ 
    summary: '학교 페이지를 삭제',
    description: `
      * 학교 관리자만 학교 페이지를 삭제할 수 있습니다.
    `
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
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
  async deleteOne(
    @Headers('Authorization') authorization: string, 
    @Param('pageId') pageId: string
  ): Promise<any> {
    try {
      return await this.pageService.deleteOne(pageId);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
