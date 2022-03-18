import { ItemStatus } from '../items/item-status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  description: string;

  @Column()
  status: ItemStatus;

  @Column()
  createdAt: string;

  @Column()
  updateAt: string;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @Column()
  userId: string;
}
