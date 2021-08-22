import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionNewsResponse {
  @ApiProperty({
    description: '소식 ID',
    example: '소식 ID'
  })
  newsId: string;

  @ApiProperty({
    description: '제목',
    example: '제목'
  })
  title: string;

  @ApiProperty({
    description: '내용',
    example: '내용'
  })
  content: string;

  @ApiProperty({ 
    description: `소식 생성시각(ISOString)`,
    example: '2021-08-01T10:00:00Z'
  })
  creationAt: string;

  @ApiProperty({ 
    description: `(Optional) 확장성을 위한 추가 데이터`,
    example: {}
  })
  extra?: {};
}
