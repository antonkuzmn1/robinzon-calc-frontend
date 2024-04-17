export class VmModal {
    constructor(
        public vmId: string = "",
        public vmName: string = "",
        public clientId: number = 0,
        public clientName: string = "",
        public fmName: string = "",
        public vmCpu: number = 0,
        public vmRam: number = 0,
        public vmSsd: number = 0,
        public vmHdd: number = 0,
        public vmState: boolean = false,
        public vmVer: number = 0,
        public vmVerDate: Date = new Date(),
        public vmTitle: string = "",
        public vmDesc: string = "",
    ) { }
}