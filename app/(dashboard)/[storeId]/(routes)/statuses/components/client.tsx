"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { StatusColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"


interface StatussClientProps {
    data: StatusColumn[]
}
export const StatusesClient: React.FC<StatussClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
        <div className="flex items-center justify-between">
            <Heading title={`Statuses (${data.length})`} description="Manage statuses for your Project" />

            <Button onClick={() => router.push(`/${params.storeId}/statuses/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Status
            </Button>
        </div>
        <Separator/>
        <DataTable searchKey="label" columns={columns} data={data}/>
        </>
    )
}