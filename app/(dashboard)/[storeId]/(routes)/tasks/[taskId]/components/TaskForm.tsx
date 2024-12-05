 /* eslint-disable @typescript-eslint/no-unused-vars */


"use client"

import { Button } from "@/components/ui/button"
import { Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage,} from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Task, Priority, Status } from "@prisma/client"
import {  CalendarIcon, Trash } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { AlertModal } from "@/components/modals/alert-modal"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { format } from 'date-fns';
import React from "react"
import { Calendar } from "@/components/ui/calendar"

interface TaskFormProps {
    initialData: Task | null;
    priorities: Priority[]
    statuses: Status[]
}

const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    priorityId: z.string().min(1),
    statusId: z.string().min(1),
    dueDate: z.date(),
})

type TaskFormValues = z.infer<typeof formSchema>
const ProductForm: React.FC<TaskFormProps> = ({ 
    priorities,
    statuses, 
    initialData 
}) => {
    const params = useParams()
    const router = useRouter()
    console.log(initialData)
    
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
     const [date, setDate] = React.useState<Date>()

    const title = initialData ? 'Edit task' : 'Create task'
    const description = initialData ? 'Edit a task.' : 'Add a new task'
    const toastMessage = initialData ? 'Task updated.' : 'Task created.'
    const action = initialData ? 'Save changes' : 'Create'

    const form = useForm<TaskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
        title: initialData.title,
        description: initialData.description!, 
        priorityId: initialData.priorityId,
        statusId: initialData.statusId,
        dueDate: initialData.dueDate!,
    } : {
        title: '',
        description: '',
        priorityId: '',
        statusId: '',
        dueDate: new Date(),
    },
    })


    const onSubmit = async (data: TaskFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/tasks/${params.taskId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/tasks`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}`)
            toast.success(toastMessage)
        } catch (error) {
            toast.error('Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/tasks/${params.taskId}`)
            router.refresh()
            toast.success('Task deleted.')
            router.push(`/${params.storeId}`)
        } catch (error) {
            toast.error('Something went wrong.')
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }
  return (  
    <>
    <AlertModal
    isOpen={open}
    onClose={() => setOpen(false)}
    onConfirm={() => {onDelete()}}
    loading={loading}
    />
    <div className="flex items-center justify-between">
        <Heading 
        title={title} 
        description={description} />
        {initialData && (
            <Button
            variant="destructive"
            size="icon"
            onClick={() => {setOpen(true)}}
            >
                <Trash className="h-4 w-4" />
            </Button>
        )}
    </div>
    <Separator />
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                 <div className="grid grid-cols-3 gap-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Task title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Task description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="priorityId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <Select 
                            disabled={loading} 
                            onValueChange={field.onChange} 
                            value={field.value} 
                            defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue 
                                        defaultValue={field.value} placeholder="Select priority" 
                                        />   
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {priorities.map((priority) => (
                                        <SelectItem 
                                        key={priority.id} 
                                        value={priority.id}>
                                            {priority.name}
                                            </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="statusId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select 
                            disabled={loading} 
                            onValueChange={field.onChange} 
                            value={field.value} 
                            defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue 
                                        defaultValue={field.value} placeholder="Select task status" 
                                        />   
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {statuses.map((status) => (
                                        <SelectItem 
                                        key={status.id} 
                                        value={status.id}>
                                            {status.name}
                                            </SelectItem>
                                    ))}            
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                                )}
                />
                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, 'yyyy-MM-dd') : <span>Pick a date</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                 onSelect={(selectedDate) => {
                                if (selectedDate) {
                                    setDate(selectedDate);
                                    form.setValue('dueDate', selectedDate);
                                }
                                }}
                                initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
            <Button disabled={loading} className="ml-auto" type="submit">
                {action}
            </Button>
        </form>
    </Form>
   </>
  )
}

export default ProductForm
