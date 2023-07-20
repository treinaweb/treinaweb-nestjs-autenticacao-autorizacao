import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  tipo: number;

  @Column({ nullable: false })
  senha: string;
}
