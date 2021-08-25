import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreatePageDto {
  @ApiProperty({ 
    description: `학교 명`,
    example: '학교 명'
  })
  @IsString()
  @IsNotEmpty()
  schoolName: string;

  @ApiProperty({ 
    description: `지역 명`,
    example: '지역 명'
  })
  @IsString()
  @IsNotEmpty()
  region: string;

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
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({ 
    description: `(Optional) 확장성을 위한 추가 데이터`,
    example: {}
  })
  @IsObject()
  extra?: object;
}
