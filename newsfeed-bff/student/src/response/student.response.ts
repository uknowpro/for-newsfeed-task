import { ApiProperty } from '@nestjs/swagger';

export class StudentResponse {
  @ApiProperty({
    description: '학생 ID',
    example: '학생 ID'
  })
  studentId: string;

  @ApiProperty({
    description: '학생 명',
    example: '학생 명'
  })
  name: string;

  @ApiProperty({ 
    description: `학생 정보 생성시각(ISOString)`,
    example: '2021-08-01T10:00:00.000Z'
  })
  creationAt: string;

  @ApiProperty({ 
    description: `(Optional) 확장성을 위한 추가 데이터`,
    example: {}
  })
  extra?: {};
}
