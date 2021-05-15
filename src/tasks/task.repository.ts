import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    // create the task
    const task: Task = this.create();
    task.title = title;
    task.description = description;
    return await task.save();
  }

  async getTasks(getTaskFilterDto: GetTaskFilterDto): Promise<Task[]> {
    const { search, status } = getTaskFilterDto;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.where('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }
    return await query.getMany();
  }
}
