import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class registeruserdto {
  @ApiProperty({ example: 'john', description: 'User name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john@email.com',
    description: 'User email (min 5 chars)',
  })
  @MinLength(5)
  email: string;

  @ApiProperty({
    example: 'strongpass',
    description: 'User password (min 6 chars)',
  })
  @MinLength(6)
  password: string;

  @IsOptional()
  fcmtoken?: string;
}
