import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
    constructor(private expenseService: ExpenseService) { }

    @Post('create')
    createExpense(@Res() res: Response) {
        // const data = this.expenseService.createExpense();
        return res.status(200).json("sa");
    }
}
