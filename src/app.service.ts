import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {  
  getHello(): string {
    return 'Want to use it ? Open Documentation ->https://docs.google.com/document/d/1G2tg1dA_XINfvfN1Inco4hIFYkwFRhuCmJv2i4iinP4/edit?tab=t.0';
  }
}
