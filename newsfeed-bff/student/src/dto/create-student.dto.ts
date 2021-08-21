import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    description: '학생 명',
    example: '학생 명'
  })
  name: string;

  @ApiProperty({
    description: '패스워드',
    example: '패스워드'
  })
  password: string;

  @ApiProperty({
    description: '구독 페이지들',
    example: ['1', '2']
  })
  subscriptionPages: [];

  @ApiProperty({ 
    description: `(Optional) 확장성을 위한 추가 데이터`,
    example: {}
  })
  extra?: {};
}
