import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class UpdatePageDto {
  @ApiProperty({ 
    description: `페이지 명`,
    example: '페이지 명'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    description: `페이지 설명`,
    example: '페이지 설명'
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({ 
    description: `(Optional) 확장성을 위한 추가 데이터`,
    example: {}
  })
  @IsOptional()
  @IsObject()
  extra?: object;
}
