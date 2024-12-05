"use client"

import {Button} from "@/components/ui/button"
import { Dialog, DialogPanel } from "@headlessui/react"
import { Plus, X } from "lucide-react"
import { useState } from "react"
import Filter from "./filter"
import IconButton from "@/components/ui/icon-button"
import { Priority, Status } from "@prisma/client"

interface MobileFiltersProps {
    status: Status[],
    priority: Priority[]
}
const MobileFilters: React.FC<MobileFiltersProps> = ({
    status,
    priority
}) => {

    const [isOpen, setIsOpen] = useState(false)

    const onOpen = () => setIsOpen(true)
    const onClose = () => setIsOpen(false)
    return (
        <>
        <Button 
        className="flex items-center gap-x-2 lg:hidden" 
        onClick={onOpen}
        >
            Filters
            <Plus size={20} />
        </Button>

        <Dialog
        open={isOpen}
        onClose={onClose}
        >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
            <div className="fixed inset-0 z-40 flex">
                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-black py-4 pb-6 shadow-xl">
                    <div className="flex items-center justify-end px-4">
                        <IconButton 
                        onClick={onClose}
                        icon={<X size={15} />}
                        className="dark:text-white dark:bg-black"
                        />
                    </div>
                    <div className="p-4">
                        <Filter 
                        data={status}
                        name="Status"
                        valueKey="statusId"
                        />
                        <Filter 
                        data={priority}
                        name="Priority"
                        valueKey="priorityId"
                        />            
                    </div>
                </DialogPanel> 
            </div>
        </Dialog>
        </>
    )
}

export default MobileFilters