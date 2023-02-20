import { Module,forwardRef } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleResolver } from './sale.resolver';
import { SaleController } from './sale.controller';
import { MorganModule } from "nest-morgan";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";


@Module({
  providers: [SaleResolver, SaleService],
  controllers: [SaleController],
  imports: [SaleModule,ACLModule,forwardRef(() => AuthModule),MorganModule],

  exports: [ACLModule, AuthModule, MorganModule],
})
export class SaleModule {}
