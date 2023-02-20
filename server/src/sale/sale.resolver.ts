import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SaleService } from './sale.service';
import { Sale } from './entities/sale.entity';
import { CreateSale } from './dto/create-sale.input';

@Resolver(() => Sale)
export class SaleResolver {
  constructor(private readonly saleService: SaleService) {}

  @Mutation(() => Sale)
  createSale(@Args('CreateSal') CreateSal: CreateSale) {
    return this.saleService.create({data:CreateSal});
  }

  @Query(() => [Sale], { name: 'sale' })
  findAll() {
    return this.saleService.findAll();
  }

  @Query(() => Sale, { name: 'sale' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.saleService.findOne(id);
  }


  @Mutation(() => Sale)
  removeSale(@Args('id', { type: () => Int }) id: number) {
    return this.saleService.remove(id);
  }
}
