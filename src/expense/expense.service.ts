import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}
  async createExpense(data: { title: string; amount: number; date: Date; userId: string }) {
    // const newExpense = await this.prisma.expense.create({
    //   data: {
    //     title: data.title,
    //     amount: data.amount,
    //     description:
    //     date: data.date,
    //     user: { connect: { id: data.userId } },
    //   },
    // });

    return {
      status: 201,
      success: true,
      message: 'Expense created successfully',
    //   data: newExpense,
    };
  }
}
