
import Container from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import NoResults from "@/components/ui/no-results"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prismadb"
import MobileFilters from "./components/mobile-filters"
import Filter from "./components/filter"
import { getTasks } from "@/actions/get-tasks"
import {NewCard, NewCardBtn, TaskCard} from "@/components/ui/task-card"
import { TasksColumn } from "./tasks/components/columns"

interface DashboardPageProps {
    data: TasksColumn[],
    params: {
        storeId: string
    },
    searchParams: {
        priorityId: string
        statusId: string
    }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  data,
  params,
  searchParams
}) => {


  const { storeId } = await params
  const { priorityId, statusId } = await searchParams
  const storeName = await prismadb.store.findFirst({
    where: {
      id: storeId
    }
  })

   const status = await prismadb.status.findMany({
    where: {
      projectId: storeId
      }
   })
   const priority = await prismadb.priority.findMany({
    where: {
      projectId: storeId
      }
   })
   const statusCount = await prismadb.status.count({
    where: {
      projectId: storeId
      }
   })
   const priorityCount = await prismadb.priority.count({
    where: {
      projectId: storeId
      }
   })
   const tasks = await prismadb.task.count({
    where: {
      projectId: storeId
      }
   })

  const mytasks = await getTasks(storeId, statusId, priorityId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title={`Welcome to ${storeName?.name}`} description="Manage your project tasks here" />
          {priorityCount > 0 && statusCount > 0 && (
            <NewCardBtn data={data} />
          )}
        </div>
        <Separator />
        <Container >
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8"> 

                        <MobileFilters 
                        status={status} 
                        priority={priority} 
                        />
                        <div className="hidden lg:block">
                            <Filter 
                            valueKey="statusId"
                            name="Status"
                            data={status}
                            />
                            <Filter 
                            valueKey="priorityId"
                            name="Priority"   
                            data={priority}
                            />
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0 ">
                            {priorityCount < 0 && statusCount < 0 ? (
                              <div className="text-center text-gray-500">
                                Add your priorities and statuses first to start creating tasks for your project
                              </div>
                            ): (
                              <>
                              {mytasks.length === 0 && <NoResults />}
                            <p className="mb-4 font-semibold text-lg">{mytasks.length != 0 && `${mytasks.length} tasks`}</p>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                   {mytasks.map((item) => (
                                  <TaskCard key={item.id} data={item} 
                                  />
                              ))}
                            {mytasks.length === tasks && <NewCard data={data} />}
                            </div>
                              </>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
      </div>
    </div>
  )
} 

export default DashboardPage
