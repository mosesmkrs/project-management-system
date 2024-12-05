import prismadb from "@/lib/prismadb"
import { StatusesClient } from "./components/client"
import { StatusColumn } from "./components/columns"
import { format } from "date-fns"

const StatusesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const { storeId } = await params;
  const statuses = await prismadb.status.findMany({
    where: {
      projectId:storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

const formattedStatuses: StatusColumn[] = statuses.map((item) => ({
  id: item.id,
  label: item.name,
  createdAt: format(item.createdAt, "MMMM do, yyyy")
}))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <StatusesClient data={formattedStatuses} />
      </div>
    </div>
  )
}

export default StatusesPage
