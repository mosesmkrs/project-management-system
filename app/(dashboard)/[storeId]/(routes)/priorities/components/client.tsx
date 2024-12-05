"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { PriorityColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"


interface PrioritiesClientProps {
    data: PriorityColumn[]
}
export const PrioritiesClient: React.FC<PrioritiesClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
        <div className="flex items-center justify-between">
            <Heading title={`Priorities (${data.length})`} description="Manage priorities for your Project" />

            <Button onClick={() => router.push(`/${params.storeId}/priorities/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add priority
            </Button>
        </div>
        <Separator/>
        <DataTable searchKey="label" columns={columns} data={data}/>
        </>
    )
}