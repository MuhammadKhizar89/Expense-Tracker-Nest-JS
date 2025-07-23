import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExpenseDTO } from 'src/dto/expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) { }

  async createExpense(body: ExpenseDTO, req: Request) {
    const userId = req['userId'];
    const newExpense = await this.prisma.expense.create({
      data: {
        ...body,
        userId: userId,
      },
    });
    if (!newExpense) {
      throw new HttpException('Failed to create expense', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {
      success: true,
      message: 'Expense created successfully',
      data: newExpense,
    };
  }

  async getExpenses(req: Request) {
    const userId = req['userId'];
    const rawExpenses = await this.prisma.expense.findMany({
      where: { userId: userId },
    });

    const expenses = rawExpenses.map(({ userId, ...rest }) => rest);

    if (!expenses) {
      throw new HttpException('No expenses found', HttpStatus.NOT_FOUND);
    }
    return {
      success: true,
      message: 'Expenses retrieved successfully',
      data: expenses,
    };
  }

  async deleteExpense(id: string, req: Request) {
    const userId = req['userId'];
    if (!id) {
      throw new HttpException('Expense ID is required', HttpStatus.BAD_REQUEST);
    }
    const expense = await this.prisma.expense.findUnique({
      where: {
        id,
        userId,
      },
    });


    if (!expense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.expense.delete({
      where: { id },
    });

    return {
      success: true,
      message: `${expense.title} deleted successfully`,
    };
  }

  async getSummary(
    req: Request,
    page: number = 1,
    limit: number = 10,
    startDate?: string,
    endDate?: string
  ) {
    if (page < 1 || limit < 1) {
      throw new HttpException('Page and limit must be greater than 0', HttpStatus.BAD_REQUEST);
    }
    const skip = (page - 1) * limit;
    const userId = req['userId'];
    const where: any = {
      userId,
    };

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const [expenses, totalCount, totalAmount] = await Promise.all([
      this.prisma.expense.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
      }),
      this.prisma.expense.count({ where }),
      this.prisma.expense.aggregate({
        where,
        _sum: { amount: true },
      }),
    ]);

    if (!expenses || expenses.length === 0) {
      throw new HttpException('No expenses found for the given criteria', HttpStatus.NOT_FOUND);
    }

    return {
      success: true,
      data: expenses,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      totalAmount: totalAmount._sum.amount || 0,
      currentPage: page,
    };
  }

  async updateExpense(body: { id: string; title?: string; amount?: number; date?: Date }, req: Request) {
    const userId = req['userId'];
    if (!body.id) {
      throw new HttpException('Expense ID is required', HttpStatus.BAD_REQUEST);
    }
    if (!body.title && !body.amount && !body.date) {
      throw new HttpException('At least one field must be provided for update', HttpStatus.BAD_REQUEST);
    }
    const { id, ...updateData } = body;

    const existingExpense = await this.prisma.expense.findUnique({
      where: { id, userId },
    });

    if (!existingExpense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    const updatedExpense = await this.prisma.expense.update({
      where: { id },
      data: {
        ...updateData,
      },
    });

    return {
      success: true,
      message: 'Expense updated successfully',
      data: {
        id: updatedExpense.id,
        title: updatedExpense.title,
        amount: updatedExpense.amount,
        date: updatedExpense.date,
      },
    };
  }

}
