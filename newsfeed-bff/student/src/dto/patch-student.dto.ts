import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class PatchStudentDto {
  @ApiProperty({
    description: 'subscription-pages: 구독 페이지들변경, password: 패스워드변경',
    example: 'subscription-pages'
    })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: '패스워드',
    example: '패스워드',
    nullable: true
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    description: '구독 페이지들',
    example: ['1', '2'],
    nullable: true
  })
  @IsOptional()
  @IsArray()
  subscriptionPages?: [];
}
