import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import os from 'os';

const app = express();
const port = 8081;

app.use(cors());

app.get('/api/ports', (req, res) => {
    const plataform = os.platform();

    const command = plataform === 'linux' ? 'ss -tulpn' : 'netstat -ano';

    exec(command, (stdout, error) =>{
        if(error) return res.status(500).json({ error: 'error' });
        res.json({ output: stdout })
    })
})

app.listen(port, () =>{
    console.log(`🚀 Servidor Mitnick rodando em http://localhost:${port}`)
})