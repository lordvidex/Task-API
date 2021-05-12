import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) getTaskFilterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(getTaskFilterDto).length) {
      return this.tasksService.getTasksWithFilter(getTaskFilterDto);
    }
    return this.tasksService.getAllTasks();
  }
  @Get('/:id')
  getTaskById(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.getTaskById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }
  @Delete('/:id')
  deleteTaskById(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.deleteTaskById(id);
  }
  @Patch('/:id/status')
  updateTaskById(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body('status', TaskStatusValidationPipe)
    status: TaskStatus,
  ) {
    return this.tasksService.updateTaskById(id, status);
  }
}
