import prismadb from "@/lib/prismadb";
import PriorityForm from "./components/priorityForm";

const PriorityPage = async ({ params }: { params: { priorityId: string } }) => {
    const { priorityId } = await params;
    const priority = await prismadb.priority.findUnique({
    where: { 
        id: priorityId,
         
    },
    });

    return (    
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <PriorityForm initialData={priority} />
            </div>
        </div>
    )
}

export default PriorityPage
