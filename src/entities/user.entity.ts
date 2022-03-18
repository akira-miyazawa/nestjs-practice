import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from '../auth/user-status-enum';
import { Item } from './item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true }) // レスポンスの対象から外す
  password: string;

  @Column()
  status: UserStatus;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
