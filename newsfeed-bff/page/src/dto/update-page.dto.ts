import { ApiProperty } from '@nestjs/swagger';

export class UpdatePageDto {
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
    description: `(Optional) 확장성을 위한 추가 데이터`,
    example: {}
  })
  extra?: object;
}
