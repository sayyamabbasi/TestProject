import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import * as swagger from "@nestjs/swagger";
import * as common from "@nestjs/common";
import * as defaultAuthGuard from "../auth/defaultAuth.guard";
import { SaleService } from './sale.service';
import { Sale } from './entities/sale.entity';
import { CreateSale } from './dto/create-sale.input';
import * as nestAccessControl from "nest-access-control";
import { AclValidateRequestInterceptor } from "../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../interceptors/aclFilterResponse.interceptor";
import * as errors from "../errors";
@Controller('sale')
@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class SaleController {
  constructor(
    private readonly saleService: SaleService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder) { }


  @common.UseInterceptors(AclValidateRequestInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Sale",
    action: "create",
    possession: "any",
  })
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Sale })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  create(@Body() createSaleDto: CreateSale) {
    return this.saleService.create({data:createSaleDto});
  }

}
