import { Controller, Get } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';

@Controller('computer')
export class ComputerController {
  constructor(
    private cupService: CpuService,
    private diskService: DiskService,
  ) {}

  @Get()
  run() {
    return [this.cupService.compute(1, 2), this.diskService.getData()];
  }
}
