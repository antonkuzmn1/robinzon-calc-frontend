export class FmEntity {
    constructor(
        public fmId: number = 0,
        public clientName: string = "",
        public fmName: string = "",
        public fmIp: string = "",
        public fmPrice: number = 0,
        public fmVm: boolean = false,
        public isHovered: boolean = false,
    ) { }
}