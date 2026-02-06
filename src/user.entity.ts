import { IsNotEmpty, MinLength } from 'class-validator';
import { min } from 'rxjs';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class user {
  @PrimaryGeneratedColumn()
  id: number;
  @MinLength(3)
  @IsNotEmpty()
  @Column()
  name: string;
  @MinLength(3)
  @IsNotEmpty()
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
}
