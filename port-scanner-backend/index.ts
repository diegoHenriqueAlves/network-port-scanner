import express from 'express';
import cors from 'cors';
import { PortsUsecase } from './src/usecase/ports.usecase.js';
import { PortController } from './src/controller/ports.controller.js';

const app = express();
const port = 3000;

app.use(cors());

const portsUseCase = new PortsUsecase();
const portsController = new PortController(portsUseCase);

// Rota
app.get('/api/doors', (req, res) => {
    portsController.handle(req, res);
});

app.listen(port, () => {
    console.log(`🚀 Backend rodando em http://localhost:${port}`);
});