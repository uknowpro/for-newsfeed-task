import { ApiProperty } from '@nestjs/swagger';

export class UpdateNewsDto {
  @ApiProperty({ 
    description: `제목`,
    example: '제목'
  })
  title: string;

  @ApiProperty({ 
    description: `내용`,
    example: '내용'
  })
  content?: string;

  @ApiProperty({ 
    description: `(Optional) 확장성을 위한 추가 데이터`,
    example: {}
  })
  extra?: object;
}
