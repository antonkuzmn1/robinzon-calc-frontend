export class FmModal {
    constructor(
        public fmId: number = 0,
        public clientId: number = 0,
        public clientName: string = "",
        public fmName: string = "",
        public fmIp: string = "",
        public fmSpecs: string = "",
        public fmDesc: string = "",
        public fmPrice: number = 0,
        public fmVm: boolean = false,
    ) { }
}