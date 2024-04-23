/*

Copyright 2024 Anton Kuzmin (http://github.com/antonkuzmn1)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

// noinspection JSUnusedGlobalSymbols
/**
 * Form of raw data from backend
 */
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
