import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    // create the task
    const task: Task = this.create();
    task.title = title;
    task.description = description;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }

  async getTasks(
    getTaskFilterDto: GetTaskFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { search, status } = getTaskFilterDto;
    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });
    if (status) {
      query.andWhere('task.status = :status', { status });
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
