import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ 
    description: `제목`,
    example: '제목'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    description: `내용`,
    example: '내용'
  })
  @IsString()
  content?: string;

  @ApiProperty({ 
    description: `(Optional) 확장성을 위한 추가 데이터`,
    example: {}
  })
  @IsObject()
  extra?: object;
}
