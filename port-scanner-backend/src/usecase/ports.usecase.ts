import { exec } from 'child_process';
import { promisify } from 'util';
import { PortsEntity } from '../entities/ports.entity.js';
import os from 'os'
import type { portsProps } from '../type/ports-type.js';

const execAsync = promisify(exec);

export class PortsUsecase {
    async execute(): Promise<PortsEntity[]> {
        const plataform = os.platform();

        const command = plataform === 'linux' ? 'ss -tulpn' : 'netstat -ano';

        try {
            const { stdout } = await execAsync(command);
            return this.parseOutput(stdout);
        } catch (error) {
            console.error("Scanning Error: ", error)
            return [];
        }
    }

    private parseOutput(rawOutput: string): PortsEntity[] {
    const lines = rawOutput.split('\n').filter(line => line.trim() !== '');

    return lines.map(line => {
        const columns = line.trim().split(/\s+/);

        if (columns.length < 5) return null;

        const protocol = (columns[0] ?? 'Unknown').toUpperCase();
        const state = (columns[1] ?? 'Unknown');
        
        const address = columns[4] ?? ''; 
  
        const portStr = address ? address.split(':').pop() : '0';
        const portNumber = parseInt(portStr || '0', 10);

        const processInfo = line.match(/"([^"]+)"/); 
        const processName = processInfo?.[1] ?? 'Unknown';

        const entityProps: portsProps = {
            protocol,
            portNumber,
            state,
            processName
        };

        return new PortsEntity(entityProps);
    }).filter((item): item is PortsEntity => item !== null);
}
}