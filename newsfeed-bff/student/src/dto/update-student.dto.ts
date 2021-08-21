import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDto {
  @ApiProperty({
    description: '학생 명',
    example: '학생 명'
  })
  name: string;

  @ApiProperty({ 
    description: `(Optional) 확장성을 위한 추가 데이터`,
    example: {}
  })
  extra?: {};
}
