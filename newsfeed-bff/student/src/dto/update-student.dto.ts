import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class UpdateStudentDto {
  @ApiProperty({
    description: '학생 명',
    example: '학생 명'
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    description: `(Optional) 확장성을 위한 추가 데이터`,
    example: {}
  })
  @IsOptional()
  @IsObject()
  extra?: {};
}
