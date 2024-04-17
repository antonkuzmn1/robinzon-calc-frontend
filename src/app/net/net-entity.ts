export class NetEntity {
    constructor(
        public netId: number = 0,
        public clientName: string = "",
        public netDomain: string = "",
        public netSubnet: string = "",
        public netMask: string = "",
        public netDns1: string = "",
        public netDns2: string = "",
        public netCloud: boolean = false,
        public netTitle: string = "",
        public isHovered: boolean = false,
    ) { }
}