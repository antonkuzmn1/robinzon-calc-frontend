export class VpnEntity {
    constructor(
        public vpnId: number = 0,
        public clientName: string = "",
        public vpnLogin: string = "",
        public vpnIp: string = "",
        public vpnType: string = "",
        public vpnServer: string = "",
        public vpnTitle: string = "",
        public isHovered: boolean = false,
    ) { }
}