import prismadb from "@/lib/prismadb";
import StatusForm from "./components/statusForm";

const StatusPage = async ({ params }: { params: { statusId: string } }) => {
    const { statusId } = await params;
    const status = await prismadb.status.findUnique({
    where: { id: statusId },
    });

    return (    
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <StatusForm initialData={status} />
            </div>
        </div>
    )
}

export default StatusPage
