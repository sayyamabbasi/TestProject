import { Injectable } from '@nestjs/common';
import { CreateSale } from './dto/create-sale.input';
import { Sale } from './entities/sale.entity';
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, Product, Order } from "@prisma/client";

@Injectable()
export class SaleService {
  constructor(protected readonly prisma:PrismaService){

  }

  async create<T extends Prisma.SaleCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SaleCreateArgs>
  ){
    return await this.prisma.sale.create(args);
  }

  async findAll() {
    return await this.prisma.sale.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }


  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
