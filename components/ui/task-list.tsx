
import { Task } from "@/types";
import TaskCard from "./task-card";

interface ProductListProps {
    items: Task[]
}
const TaskList: React.FC<ProductListProps> = ({
    items
}) => {
    return (
        <div className='space-y-4 w-full h-full bg-black'>
             {items.length === 0 && <p className="text-sm text-muted-foreground">No tasks.</p>} 
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item) => (
                    <TaskCard key={item.id} data={item} 
                    />
                ))}

             </div>
        </div>
    )
}

export default TaskList