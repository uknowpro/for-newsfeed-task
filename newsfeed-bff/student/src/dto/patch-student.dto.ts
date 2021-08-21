import { ApiProperty } from '@nestjs/swagger';

export class PatchStudentDto {
  @ApiProperty({
    description: '수정 유형',
    example: ['subscription-pages', 'password']
  })
  type: string;

  @ApiProperty({
    description: '패스워드',
    example: '패스워드'
  })
  password?: string;

  @ApiProperty({
    description: '구독 페이지들',
    example: ['1', '2']
  })
  subscriptionPages?: [];
}
