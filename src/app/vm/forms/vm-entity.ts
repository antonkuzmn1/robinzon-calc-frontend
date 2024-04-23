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

/**
 * Main entity for table content
 */
export class VmEntity {
    constructor(
        public id: string = "Loading...",
        public clientName: string = "Loading...",
        public name: string = "Loading...",
        public fmName: string = "Loading...",
        public cpu: number = 0,
        public ram: number = 0,
        public ssd: number = 0,
        public hdd: number = 0,
        public state: boolean = false,
    ) { }
}
