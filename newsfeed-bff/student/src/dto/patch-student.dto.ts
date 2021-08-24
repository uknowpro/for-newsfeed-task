import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class PatchStudentDto {
  @ApiProperty({
    description: '수정 유형',
    example: ['subscription-pages', 'password']
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: '패스워드',
    example: '패스워드'
  })
  @IsString()
  password?: string;

  @ApiProperty({
    description: '구독 페이지들',
    example: ['1', '2']
  })
  @IsArray()
  subscriptionPages?: [];
}
