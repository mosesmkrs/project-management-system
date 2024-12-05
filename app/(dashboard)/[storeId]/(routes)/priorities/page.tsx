import prismadb from "@/lib/prismadb"
import { PrioritiesClient } from "./components/client"
import { PriorityColumn } from "./components/columns"
import { format } from "date-fns"

const PrioritiesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const { storeId } = await params;
  const priorities = await prismadb.priority.findMany({
    where: {
      projectId:storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

const formattedPriorities: PriorityColumn[] = priorities.map((item) => ({
  id: item.id,
  label: item.name,
  createdAt: format(item.createdAt, "MMMM do, yyyy")
}))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PrioritiesClient data={formattedPriorities} />
      </div>
    </div>
  )
}

export default PrioritiesPage
