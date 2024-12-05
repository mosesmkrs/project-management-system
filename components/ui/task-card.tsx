/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

/* eslint-disable @next/next/no-async-client-component */
import { Task } from "@/types"
 import { useRouter, useParams } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import CellAction from "@/app/(dashboard)/[storeId]/(routes)/tasks/components/cell-action"
import { TasksColumn } from "@/app/(dashboard)/[storeId]/(routes)/tasks/components/columns"
import { Plus } from "lucide-react"
import { Button } from "./button"



interface TaskCardProps {
    data: Task 
}

export const TaskCard: React.FC<TaskCardProps> = ({
    data
}) => {

  // const router = useRouter();


  // const handleClick = () => {
  //   router.push(`/${data.projectId}/tasks/${data.id}`)
  // }

  return (
    <div>
        <div  className="bg-white dark:bg-black shadow-md dark:border-2 hover:-translate-y-2 hover:animate-pulse dark:hover:border-blue-500 duration-300 group cursor-pointer rounded-xl border p-3 space-y-4 w-full h-full">
                <div className="items-center justify-items-center">
                      <div className="flex w-full">
                      <p className="font-semibold text-lg text-gray-800 dark:text-gray-200 ">
                        {data?.title}
                      </p>
                       <p className="ml-auto">
                        <CellAction data={data as unknown as TasksColumn}/>
                      </p>
                      </div>
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {data?.description}
                      </p>
                    </div>
                    <div className="flex w-full">
                       
                    
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex mr-2 items-center justify-between">
                        <div
                      className={`w-3 h-3 rounded-full ${
                        data?.priority.name === 'High'
                          ? 'bg-red-500'
                          : data?.priority.name === 'Low'
                          ? 'bg-yellow-500'
                          : data?.priority.name === 'Medium'
                          ?'bg-green-500'
                          : 'bg-purple-500'
                      }`}
                    ></div>
                    </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{`${data?.priority.name} priority`}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                    <div className="flex items-center justify-between text-gray-800 text-xs font-semibold dark:text-gray-200">
                        {data?.status.name}
                  </div>
                    <div className="ml-auto text-gray-800 dark:text-gray-200  text-xs font-semibold">
                      {`Due: ${data?.dueDate!.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`}
                  </div>
                    </div>       
        </div>
    </div>
  )
}

interface NewCardProps {
    data: TasksColumn[] 
}

export const NewCard: React.FC<NewCardProps> = ({
    data
}) => {

    const router = useRouter();
      const params = useParams();

  return (
     <div onClick={() => router.push(`/${params.storeId}/tasks/new`)}  className="border-2 border-dashed cursor-pointer rounded-xl  w-full h-full text-center py-24 text-gray-800 text-muted-foreground flex justify-center items-center">
            <Plus className="mr-2 h-4 w-4" />
          Add New Task
        </div>
  )
}   


export const NewCardBtn: React.FC<NewCardProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <Button onClick={() => router.push(`/${params.storeId}/tasks/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Task
            </Button>
  )
}