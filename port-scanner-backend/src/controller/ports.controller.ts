import type { Request, Response } from 'express';
import { PortsUsecase } from '../usecase/ports.usecase.js';

export class PortController {
  constructor(private portsUseCase: PortsUsecase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const ports = await this.portsUseCase.execute();
      res.json(ports);
    } catch (error) {
      res.status(500).json({ error: 'Scan ports failed...' });
    }
  }
}