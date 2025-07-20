import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient {
    constructor(){
        super({
            datasources: {
                db: {
                    url: "postgres://avnadmin:AVNS_70b3Ax9LwT-NMqtiwcl@pg-2b7022e9-ai-agent-19.d.aivencloud.com:23629/defaultdb?sslmode=require" ,
                },
            }
        })

    }

}
