import prismadb from "@/lib/prismadb"
import { TasksClient } from "./components/client"
import { TasksColumn } from "./components/columns"
import { format } from "date-fns"

const TaskPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const { storeId } = await params;
  const tasks = await prismadb.task.findMany({
    where: {
      projectId: storeId
    },
    include: {
      priority: true,
      status: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

const formattedTasks: TasksColumn[] = tasks.map((item) => ({
  id: item.id,
  title: item.title,
  priority: item.priority.name,
  status: item.status.name,
  dueDate: format(item.dueDate!, "MMMM do, yyyy"),
  createdAt: format(item.createdAt, "MMMM do, yyyy")
}))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TasksClient data={formattedTasks} />
      </div>
    </div>
  )
}

export default TaskPage
