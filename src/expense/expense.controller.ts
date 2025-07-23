import { Body, Controller, Delete, Get, Patch, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ExpenseService } from './expense.service';
import { ExpenseDTO } from 'src/dto/expense.dto';
import tryCatch from 'src/utils/tryCatch';
import { AuthGuard } from 'src/gaurds/auth.gaurd';

@Controller('expense')
export class ExpenseController {
    constructor(private expenseService: ExpenseService) { }

    @UseGuards(AuthGuard)
    @Post('create')
    createExpense(@Body() body: ExpenseDTO, @Req() req: Request) {
        return tryCatch(() => this.expenseService.createExpense(body, req));
    }

    @UseGuards(AuthGuard)
    @Get('getAll')
    getExpenses(@Req() req: Request) {
        return tryCatch(() => this.expenseService.getExpenses(req));
    }

    @UseGuards(AuthGuard)
    @Delete('delete')
    deleteExpense(@Body() { id }: { id: string }, @Req() req: Request) {
        return tryCatch(() => this.expenseService.deleteExpense(id, req));
    }
    
    @UseGuards(AuthGuard)
    @Patch('update')
    updateExpense(@Body() body: { id: string; title?: string; amount?: number; date?: Date }, @Req() req: Request) {
        return tryCatch(() => this.expenseService.updateExpense(body, req));
    }


    @UseGuards(AuthGuard)
    @Get('summary')
    async getSummary(
        @Req() req: Request,
        @Query('page') page = '1',
        @Query('limit') limit = '10',
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        return tryCatch(() => this.expenseService.getSummary(req, parsedPage, parsedLimit, startDate, endDate));
    }
}
