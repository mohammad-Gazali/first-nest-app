import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';



@Global()  // this decorator is for making this Module global, and we don't have to import it in every module in the app
@Module({
  providers: [PrismaService],
  // exports is for making this service is accessible by all modules
  exports: [PrismaService],
})
export class PrismaModule {}
