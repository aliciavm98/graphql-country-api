import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Country {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  code: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  emoji: string;

  @Field(() => String)
  @Column()
  continent: string;
}
