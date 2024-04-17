export class ClientModal {
    constructor(
        public clientId: number,
        public clientName: string,
        public clientInn: string,
        public clientDiscount: number,
        public clientContrNum: string,
        public clientContrDate: Date,
        public clientDescr: string,
    ) { }
}