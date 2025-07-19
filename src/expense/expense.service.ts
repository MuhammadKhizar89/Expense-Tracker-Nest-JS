import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpenseService {
    createExpense() {
        return { success: true, messages: ['Expense created successfully'] };
    }
}
