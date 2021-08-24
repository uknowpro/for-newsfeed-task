import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject, IsArray } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    description: '학생 ID',
    example: '학생 ID'
  })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({
    description: '패스워드',
    example: '패스워드'
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: '학생 명',
    example: '학생 명'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '구독 페이지들',
    default: [],
    example: ['1', '2']
  })
  @IsArray()
  subscriptionPages?: [];

  @ApiProperty({ 
    description: `(Optional) 확장성을 위한 추가 데이터`,
    default: {},
    example: {}
  })
  @IsObject()
  extra?: {};
}
