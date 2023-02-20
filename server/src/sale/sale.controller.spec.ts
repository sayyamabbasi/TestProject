
// import { SaleController } from './sale.controller';
// import { SaleService } from './sale.service';
// import { CreateSale } from './dto/create-sale.input';

// describe('SaleController', () => {
//   let controller: SaleController;
//   let saleSrv: SaleService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [SaleController],
//       providers: [SaleService],
//     }).compile();

//     controller = module.get<SaleController>(SaleController);
//     saleSrv=module.get<SaleService>(SaleService)
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
//   // it('should be defined', () => {
//   //   const createNoteSpy = jest.spyOn(saleSrv, 'create');
//   // const dto = new CreateSale();
//   // saleSrv.create({data:dto});
//   // expect(createNoteSpy).toHaveBeenCalledWith(dto);
//   // });
  
// });



import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../auth/defaultAuth.guard";
import { ACLModule } from "../auth/acl.module";
import { AclFilterResponseInterceptor } from "../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { SaleController } from "./sale.controller";
import { SaleService } from "./sale.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdAt: new Date(),
  updatedAt: new Date(),
  orderId:"clecod1r7000bbyjm4bs6hpy6",
  userId:"clebs5fbk0000bygelw9s2g9k",
  amount:"1400",
  paidAmount:"1500",
  taxAmount:"100",
  taxType:"gst",
  Status:"paid"
};
const CREATE_RESULT = {
  createdAt: new Date(),
  description: "exampleDescription",
  id: "exampleId",
  itemPrice: 42.42,
  name: "exampleName",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    description: "exampleDescription",
    id: "exampleId",
    itemPrice: 42.42,
    name: "exampleName",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  createdAt: new Date(),
  description: "exampleDescription",
  id: "exampleId",
  itemPrice: 42.42,
  name: "exampleName",
  updatedAt: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("Sale", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: SaleService,
          useValue: service,
        },
      ],
      controllers: [SaleController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /sale", async () => {
    await request(app.getHttpServer())
      .post("/sale")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });
  afterAll(async () => {
    await app.close();
  });
});
