import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSale {
  @Field(() => String, {
    nullable: false,
  })
  orderId!: string;
  @Field(() => String, {
    nullable: false,
  })
  userId!: string;
  @Field(() => String, {
    nullable: true,
  })
  amount?:string  | null;
  @Field(() => String, {
    nullable: true,
  })
  paidAmount?:string  | null;
  @Field(() => String, {
    nullable: true,
  })
  taxAmount?:string  | null;
  @Field(() => String, {
    nullable: true,
  })
  taxType?:string  | null;
  @Field(() => String, {
    nullable: true,
  })
  Status?:string  | null;
}