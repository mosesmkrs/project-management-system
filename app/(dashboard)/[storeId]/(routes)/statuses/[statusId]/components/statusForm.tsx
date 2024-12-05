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
import { Status } from "@prisma/client"
import { Trash } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { AlertModal } from "@/components/modals/alert-modal"
import ImageUpload from "@/components/ui/image-upload"

interface StatusFormProps {
    initialData: Status | null
}

const formSchema = z.object({
    name: z.string().min(1),
})

type StatusFormValues = z.infer<typeof formSchema>
const StatusForm: React.FC<StatusFormProps> = ({ initialData }) => {
    const params = useParams()
    const router = useRouter()
    
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? 'Edit status' : 'Create status'
    const description = initialData ? 'Edit a status.' : 'Add a new status'
    const toastMessage = initialData ? 'Status updated.' : 'Status created.'
    const action = initialData ? 'Save changes' : 'Create'

 const form = useForm<StatusFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: initialData?.name || '', 
    },
})


    const onSubmit = async (data: StatusFormValues) => {
        try {
            setLoading(true)
           if (initialData) {
             await axios.patch(`/api/${params.storeId}/statuses/${params.statusId}`, data)
           } else {
             await axios.post(`/api/${params.storeId}/statuses`, data)
           }
            router.refresh()
            router.push(`/${params.storeId}/statuses`)
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
            await axios.delete(`/api/${params.storeId}/statuses/${params.statusId}`)
            router.refresh()
            toast.success('Status deleted.')
            router.push(`/${params.storeId}/statuses`)
        } catch (error) {
            toast.error('Make sure you removed all tasks in this status first.')
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
                                <Input disabled={loading} placeholder="Status name" {...field} />
                            </FormControl>
                            <span className="text-xs text-muted-foreground">
                                    Reccommended status:
                                    <span className="font-semibold text-green-500">  Pending  </span>
                                    <span className="font-semibold  text-blue-500">In-Progress  </span>
                                    <span className="font-semibold text-red-500"> Done</span>
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

export default StatusForm
