import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    description: '학생 ID',
    example: '학생 ID'
  })
  studentId: string;

  @ApiProperty({
    description: '패스워드',
    example: '패스워드'
  })
  password: string;

  @ApiProperty({
    description: '학생 명',
    example: '학생 명'
  })
  name: string;

  @ApiProperty({
    description: '구독 페이지들',
    default: [],
    example: ['1', '2']
  })
  subscriptionPages?: [];

  @ApiProperty({ 
    description: `(Optional) 확장성을 위한 추가 데이터`,
    default: {},
    example: {}
  })
  extra?: {};
}
