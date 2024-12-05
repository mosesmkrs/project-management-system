"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { TasksColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"


interface TasksClientProps {
    data: TasksColumn[]
}
export const TasksClient: React.FC<TasksClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
        <div className="flex items-center justify-between">
            <Heading title={`Tasks (${data.length})`} description="Manage tasks for your Project" />

            <Button onClick={() => router.push(`/${params.storeId}/tasks/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Task
            </Button>
        </div>
        <Separator/>
        <DataTable searchKey="title" columns={columns} data={data}/>
        </>
    )
}