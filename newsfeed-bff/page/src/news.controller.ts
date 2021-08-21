import { Body, Controller, Get, Put, Headers, Query, Param, Post, Delete, HttpException, HttpStatus } from '@nestjs/common';
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
  ApiUnauthorizedResponse,
  getSchemaPath 
} from '@nestjs/swagger';
import { Result } from '@newsfeed-bff/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsResponse } from './response/news.response';

@ApiBearerAuth()
@ApiTags('News')
@Controller('pages')
@ApiExtraModels(NewsResponse)
export class NewsController {
  constructor(private readonly newsService: NewsService) {
  }

  @Post(':pageId/news')
  @ApiOperation(
    { 
      summary: '학교 소식을 생성',
      description: `
        * 학교 관리자만 학교 소식을 생성할 수 있습니다.
      `
    }
  )
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
    status: 201,
    description: 'Created.',
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
    // try {
    //   return await this.newsService.remove(id);
    // } catch (err) {
    //   if (err instanceof NotFoundException) {
    //     throw new HttpException(err, HttpStatus.BAD_REQUEST);
    //   }
    //   throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    // }
  }

  @Get(':pageId/news')
  @ApiOperation({ 
    summary: '학교 소식들을 조회',
    description: `
      * 학교 관리자만 학교 소식들을 조회할 수 있습니다.
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
        data: { type: 'array', items: { type: 'object', $ref: getSchemaPath(NewsResponse) } },
        extraData: { type: 'object' }
      },
    },
  })
  async findAll(
    @Headers('Authorization') authorization: string, 
    @Param('pageId') pageId: string
  ): Promise<Result<NewsResponse[]>> {
    // try {
    //   return await this.newsService.remove(id);
    // } catch (err) {
    //   if (err instanceof NotFoundException) {
    //     throw new HttpException(err, HttpStatus.BAD_REQUEST);
    //   }
    //   throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    // }
  }

  @Get(':pageId/news/:newsId')
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
    // try {
    //   return await this.newsService.remove(id);
    // } catch (err) {
    //   if (err instanceof NotFoundException) {
    //     throw new HttpException(err, HttpStatus.BAD_REQUEST);
    //   }
    //   throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    // }
  }

  @Put(':pageId/news/:newsId')
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
    @Param('pageId') pageId: string, 
    @Param('newsId') newsId: string,
    @Body() body: UpdateNewsDto
  ): Promise<Result<NewsResponse>> {
    // try {
    //   return await this.newsService.remove(id);
    // } catch (err) {
    //   if (err instanceof NotFoundException) {
    //     throw new HttpException(err, HttpStatus.BAD_REQUEST);
    //   }
    //   throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    // }
  }

  @Delete(':pageId/news/:newsId')
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
    @Param('pageId') pageId: string, @Param('newsId') newsId: string
  ): Promise<Result> {
    // try {
    //   return await this.newsService.remove(id);
    // } catch (err) {
    //   if (err instanceof NotFoundException) {
    //     throw new HttpException(err, HttpStatus.BAD_REQUEST);
    //   }
    //   throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    // }
  }
}
