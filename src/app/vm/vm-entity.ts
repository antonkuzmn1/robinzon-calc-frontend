export class VmEntity {
    constructor(
        public id: string = "",
        public clientName: string = "",
        public name: string = "",
        public fmName: string = "",
        public cpu: number = 0,
        public ram: number = 0,
        public ssd: number = 0,
        public hdd: number = 0,
        public state: boolean = false,
    ) { }
}
