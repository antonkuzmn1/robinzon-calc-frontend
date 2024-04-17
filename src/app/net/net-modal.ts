export class NetModal {
    constructor(
        public netId: number = 0,
        public clientId: number = 0,
        public clientName: string = "",
        public netDomain: string = "",
        public netSubnet: string = "",
        public netMask: string = "",
        public netDns1: string = "",
        public netDns2: string = "",
        public netDns3: string = "",
        public netCloud: boolean = false,
        public netTitle: string = "",
        public netDescr: string = "",
    ) { }
}