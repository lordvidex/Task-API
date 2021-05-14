import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isIn } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    value = value?.toUpperCase();
    if (!isIn(value, Object.values(TaskStatus))) {
      throw new BadRequestException(
        `Invalid status "${value}", not in [${Object.values(TaskStatus).join(
          '|',
        )}]`,
      );
    }
    return value;
  }
}
