/* eslint-disable @typescript-eslint/no-unused-vars */


"use client"

import { Button } from "@/components/ui/button"
import { Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage,} from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Priority } from "@prisma/client"
import { Trash } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { AlertModal } from "@/components/modals/alert-modal"
import ImageUpload from "@/components/ui/image-upload"

interface PriorityFormProps {
    initialData: Priority | null
}

const formSchema = z.object({
    name: z.string().min(1),
})

type PriorityFormValues = z.infer<typeof formSchema>
const PriorityForm: React.FC<PriorityFormProps> = ({ initialData }) => {
    const params = useParams()
    const router = useRouter()
    
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? 'Edit priority' : 'Create priority'
    const description = initialData ? 'Edit a priority.' : 'Add a new priority'
    const toastMessage = initialData ? 'Priority updated.' : 'Priority created.'
    const action = initialData ? 'Save changes' : 'Create'

 const form = useForm<PriorityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: initialData?.name || '', 
    },
})


    const onSubmit = async (data: PriorityFormValues) => {
        try {
            setLoading(true)
           if (initialData) {
             await axios.patch(`/api/${params.storeId}/priorities/${params.priorityId}`, data)
           } else {
             await axios.post(`/api/${params.storeId}/priorities`, data)
           }
            router.refresh()
            router.push(`/${params.storeId}/priorities`)
            toast.success(toastMessage)
        } catch (error) {
            toast.error('Something went wrong.')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/priorities/${params.priorityId}`)
            router.refresh()
            toast.success('Priority deleted.')
            router.push(`/${params.storeId}/priorities`)
        } catch (error) {
            toast.error('Make sure you removed all tasks in this priority first.')
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Priority name" {...field} />
                            </FormControl>
                            <span className="text-sm">
                                Reccommended priorities: <span className="text-red-500">Low</span>, <span className="text-yellow-500">Medium</span>, <span className="text-green-500">High</span>
                            </span>
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

export default PriorityForm
