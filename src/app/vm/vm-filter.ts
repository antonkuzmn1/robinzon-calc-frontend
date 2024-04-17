export class VmFilter {
    constructor(
        public title: string = "",
        public client: { in: number[], nul: boolean } = { in: [], nul: true },
        public name: string = "",
        public fm: { in: number[] } = { in: [] },
        public cpu: { from: number, to: number } = { from: 0, to: 999 },
        public ram: { from: number, to: number } = { from: 0, to: 999 },
        public ssd: { from: number, to: number } = { from: 0, to: 999 },
        public hdd: { from: number, to: number } = { from: 0, to: 999 },
        public state: { running: boolean, off: boolean } = { running: true, off: true }
    ) { }
}