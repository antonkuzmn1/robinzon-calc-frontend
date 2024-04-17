export class VmRaw {
  constructor(
  public id: string,
  public timestamp: string,
  public deleted: boolean,
  public title: string,
  public description: string,
  public clientEntity: any,
  public name: string,
  public cpu: number,
  public ram: number,
  public ssd: number,
  public hdd: number,
  public running: boolean,
  public fmEntity: {
    id: number,
    timestamp: string,
    deleted: boolean,
    title: string,
    description: string,
    client: any,
    name: string,
    ip: string,
    specifications: string,
    price: number,
    vm: boolean
  }
  ) {
  }
}
