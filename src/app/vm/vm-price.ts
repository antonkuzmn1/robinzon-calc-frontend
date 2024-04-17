export class VmPrice {
    constructor(
        public cpu: number = 150,
        public ram: number = 100,
        public ssd: number = 50,
        public hdd: number = 150,
        public cpuC: number = 1,
        public ramC: number = 1,
        public ssdC: number = 0.1,
        public hddC: number = 0.02,
        public c: string = '₽',
    ) { }
}