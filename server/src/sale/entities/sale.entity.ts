import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  IsDate,
  ValidateNested,
  IsInt,
} from "class-validator";
import { Type } from "class-transformer";
@ObjectType()
export class Sale {
  @Field(() => String, {
    nullable: true,
  })
  orderId! :String
  @Field(() => String, {
    nullable: true,
  })
  userId! :String;
  @Field(() => String, {
    nullable: true,
  })
  amount! :String;
  @Field(() => String, {
    nullable: true,
  })
  paidAmount! :String;
  @Field(() => String, {
    nullable: true,
  })
  taxAmount! :String
  @Field(() => String, {
    nullable: true,
  })
  taxType! :String
  @Field(() => String, {
    nullable: true,
  })
  Status! :String

  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
