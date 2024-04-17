import { Injectable } from "@angular/core";
import { VmFilter } from "./vm/vm-filter";

@Injectable({ providedIn: 'root' })
export class FilterService {
    vmFilter: VmFilter = new VmFilter();

    public isDefault(): boolean {
        try {
            const def: VmFilter = new VmFilter();
            if (def.title !== this.vmFilter.title) return false;
            if (def.client.in.length !== this.vmFilter.client.in.length) return false;
            for (let i = 0; i < def.client.in.length; i++)
            if (def.client.in[i] !== this.vmFilter.client.in[i]) return false;
            if (def.client.nul !== this.vmFilter.client.nul) return false;
            if (def.name !== this.vmFilter.name) return false;
            if (def.fm.in.length !== this.vmFilter.fm.in.length) return false;
            for (let i = 0; i < def.fm.in.length; i++)
            if (def.fm.in[i] !== this.vmFilter.fm.in[i]) return false;
            if (def.cpu.from !== this.vmFilter.cpu.from) return false;
            if (def.cpu.to !== this.vmFilter.cpu.to) return false;
            if (def.ram.from !== this.vmFilter.ram.from) return false;
            if (def.ram.to !== this.vmFilter.ram.to) return false;
            if (def.ssd.from !== this.vmFilter.ssd.from) return false;
            if (def.ssd.to !== this.vmFilter.ssd.to) return false;
            if (def.hdd.from !== this.vmFilter.hdd.from) return false;
            if (def.hdd.to !== this.vmFilter.hdd.to) return false;
            if (def.state.running !== this.vmFilter.state.running) return false;
            if (def.state.off !== this.vmFilter.state.off) return false;
            return true;
        } catch (e) { return false }
    }
}
