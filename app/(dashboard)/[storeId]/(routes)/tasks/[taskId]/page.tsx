import prismadb from "@/lib/prismadb";
import TaskForm from "./components/TaskForm";

const ProductPage = async ({
     params 
    }: {
         params: {
             taskId: string 
             storeId: string
            } 
        }) => {
    const { taskId, storeId } = await params;
    const task = await prismadb.task.findUnique({
    where: { 
        id: taskId 
    },
    });

    const priorities = await prismadb.priority.findMany({
        where: {
            projectId: storeId
        }
    })

    const statuses = await prismadb.status.findMany({
        where: {
            projectId: storeId
        }
    })

    return (    
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <TaskForm 
                priorities={priorities} 
                statuses={statuses}
                initialData={task} 
                />
            </div>
        </div>
    )
}

export default ProductPage
