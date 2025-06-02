import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // PrismaService available everywhere
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Export to other modules
})
export class PrismaModule {}
