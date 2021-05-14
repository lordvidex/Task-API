import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(getTaskFilterDto: GetTaskFilterDto) {
    return await this.taskRepository.getTasks(getTaskFilterDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with id "${id} not found!`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto);
  }
  async deleteTaskById(id: number): Promise<string> {
    const result = await this.taskRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
    return `Successfully deleted ${result.affected} items`;
  }
  async updateTaskById(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    task.status = status;
    return await task.save();
  }
}
