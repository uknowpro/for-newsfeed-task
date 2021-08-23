import { ApiProperty } from '@nestjs/swagger';

export class PageResponse {
  @ApiProperty({ 
    description: `페이지 ID`,
    example: '페이지 ID'
  })
  pageId: string;

  @ApiProperty({ 
    description: `페이지 명`,
    example: '페이지 명'
  })
  name: string;

  @ApiProperty({ 
    description: `페이지 설명`,
    example: '페이지 설명'
  })
  description: string;

  @ApiProperty({ 
    description: `페이지 생성시각(ISOString)`,
    example: '2021-08-01T10:00:00Z'
  })
  createdAt: string;

  @ApiProperty({ 
    description: `(Optional) 확장성을 위한 추가 데이터`,
    example: {}
  })
  extra?: {};
}
