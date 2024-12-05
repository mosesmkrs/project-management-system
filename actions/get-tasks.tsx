import prismadb from '@/lib/prismadb'
import { Task } from '@/types'


export const getTasks = async (id: string, statusId: string, priorityId: string): Promise<Task[]> => {
    const tasks = await prismadb.task.findMany({
    where: {
      projectId: id,
      priorityId: priorityId,
      statusId : statusId,
    },
    include: {
      priority: true,
      status: true
    }
   })
  return tasks;
}
