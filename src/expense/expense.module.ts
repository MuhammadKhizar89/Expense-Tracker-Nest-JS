import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ExpenseService],
  imports: [PrismaModule],
  controllers: [ExpenseController]
})
export class ExpenseModule {}
