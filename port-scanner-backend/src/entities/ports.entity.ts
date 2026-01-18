import type { portsProps } from '../type/ports-type.js';

export class PortsEntity {
    public protocol: string;
    public portNumber: number;
    public state: string;
    public processName: string;

    constructor(props: portsProps) {
        this.protocol = props.protocol;
        this.portNumber = props.portNumber;
        this.state = props.state;
        this.processName = props.processName;
    }
}