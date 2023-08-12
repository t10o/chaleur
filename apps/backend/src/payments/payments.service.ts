import { Injectable } from '@nestjs/common';
import { Payment, PrismaClient } from '@prisma/client';

@Injectable()
export class PaymentsService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getPayments(): Promise<Payment[]> {
    return this.prisma.payment.findMany();
  }
}
