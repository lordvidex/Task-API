import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    value = value?.toUpperCase();
    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`Invalid status "${value}"`);
    }
    return value;
  }
  private isValidStatus(status: any): boolean {
    return this.validStatuses.indexOf(status) !== -1;
  }
  private readonly validStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];
}
