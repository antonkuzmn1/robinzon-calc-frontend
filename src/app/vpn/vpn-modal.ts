export class VpnModal {
    constructor(
        public vpnId: number = 0,
        public clientId: number = 0,
        public clientName: string = "",
        public vpnLogin: string = "",
        public vpnPass: string = "",
        public vpnIp: string = "",
        public vpnType: string = "",
        public vpnServer: string = "",
        public vpnKey: string = "",
        public vpnTitle: string = "",
        public vpnDescr: string = "",
    ){}
}