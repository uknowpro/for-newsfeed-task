import { Body, Controller, Get, Put, Headers, Query, Param, Post, Delete, HttpException, HttpStatus, SetMetadata } from '@nestjs/common';
import { 
  ApiBearerAuth, 
  ApiOperation, 
  ApiExtraModels, 
  ApiTags,
  ApiHeader,
  ApiResponse, 
  ApiOkResponse, 
  ApiInternalServerErrorResponse, 
  ApiBadRequestResponse, 
  ApiForbiddenResponse,
  getSchemaPath 
} from '@nestjs/swagger';
import { Result, NewsResponse } from '@newsfeed/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@ApiBearerAuth()
@ApiTags('News')
@Controller('pages')
@ApiExtraModels(NewsResponse)
export class NewsController {
  constructor(private readonly newsService: NewsService) {
  }

  @Post(':pageId/news')
  @SetMetadata('role', 'admin')
  @ApiOperation(
    { 
      summary: '학교 소식을 생성',
      description: `
        * 학교 관리자만 학교 소식을 생성할 수 있습니다.
        * 학교 소식 제목은 중복될 수 없습니다.
      `
    }
  )
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
  @ApiBadRequestResponse({ 
    description: 'Bad request.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiForbiddenResponse({ 
    description: 'Forbidden.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Internal error.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object', properties: {
        data: { type: 'array', items: { type: 'object', $ref: getSchemaPath(NewsResponse) } },
        extraData: { type: 'object' }
      },
    },
  })
  async createOne(
    @Headers('Authorization') authorization: string,
    @Param('pageId') pageId: string,
    @Body() body: CreateNewsDto
  ): Promise<any> {
    try {
      return await this.newsService.createOne(pageId, body);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':pageId/news')
  @SetMetadata('role', 'admin')
  @ApiOperation({ 
    summary: '학교 소식들을 조회',
    description: `
      * 학교 관리자만 학교 소식들을 조회할 수 있습니다.
      * 가장 최근에 생성된 소식부터 정렬됩니다.
      * 현재, 페이징이 고려되어 있지 않으며, 페이징 적용시 추가 데이터는 extraData에 반영합니다.
    `
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
  @ApiBadRequestResponse({ 
    description: 'Bad request.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiForbiddenResponse({ 
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
        data: { type: 'array', items: { type: 'object', $ref: getSchemaPath(NewsResponse) } },
        extraData: { type: 'object' }
      },
    },
  })
  async findAll(
    @Headers('Authorization') authorization: string, 
    @Param('pageId') pageId: string
  ): Promise<Result<NewsResponse[]>> {
    try {
      return await this.newsService.findAll(pageId);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Get(':pageId/news/:newsId')
  @SetMetadata('role', 'admin')
  @ApiOperation({ 
    summary: '학교 소식을 조회',
    description: `
      * 학교 관리자만 학교 소식을 조회할 수 있습니다.
    `
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
  @ApiBadRequestResponse({ 
    description: 'Bad request.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiForbiddenResponse({ 
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
        data: { type: 'array', items: { type: 'object', $ref: getSchemaPath(NewsResponse) } },
        extraData: { type: 'object' }
      },
    },
  })
  async findOne(
    @Headers('Authorization') authorization: string, 
    @Param('pageId') pageId: string, 
    @Param('newsId') newsId: string
  ): Promise<Result<NewsResponse>> {
    try {
      return await this.newsService.findOne(pageId, newsId);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Put(':pageId/news/:newsId')
  @SetMetadata('role', 'admin')
  @ApiOperation({ 
    summary: '학교 소식을 수정',
    description: `
      * 학교 관리자만 학교 소식을 수정할 수 있습니다.
    `
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
  @ApiBadRequestResponse({ 
    description: 'Bad request.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiForbiddenResponse({ 
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
    @Param('pageId') pageId: string, 
    @Param('newsId') newsId: string,
    @Body() body: UpdateNewsDto
  ): Promise<Result<NewsResponse>> {
    try {
      return await this.newsService.updateOne(pageId, newsId, body);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':pageId/news/:newsId')
  @SetMetadata('role', 'admin')
  @ApiOperation({ 
    summary: '학교 소식을 삭제',
    description: `
      * 학교 관리자만 학교 소식을 삭제할 수 있습니다.
    `
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
  @ApiBadRequestResponse({ 
    description: 'Bad request.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiForbiddenResponse({ 
    description: 'Forbidden.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Internal error.', 
    schema: { type: 'object', properties: { errorType: { type: 'string' }, errorMessage: { type: 'string' } } } 
  })
  @ApiOkResponse({ description: 'Ok.' })
  async deleteOne(
    @Headers('Authorization') authorization: string, 
    @Param('pageId') pageId: string, @Param('newsId') newsId: string
  ): Promise<Result> {
    try {
      return await this.newsService.deleteOne(pageId, newsId);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
