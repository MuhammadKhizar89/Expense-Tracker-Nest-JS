import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            //justTesting
            datasources: {
                db: {
                    url: process.env.DATABASE_URL,
                },
            },
        });
    }

}
