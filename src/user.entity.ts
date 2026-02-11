import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';

@Entity()
export class user {
  @ApiProperty({ example: 1, description: 'Unique user ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'john', description: 'Username (min 3 characters)' })
  @MinLength(3)
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiProperty({
    example: 'strongpassword',
    description: 'User password (min 3 characters)',
  })
  @MinLength(3)
  @IsNotEmpty()
  @Column()
  password: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Unique email address',
  })
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  @IsOptional()
  fcmToken?: string;
}
