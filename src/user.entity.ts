import { IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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

  @Column('text', { array: true, default: [] })
  fcmtokens?: string[];
}
