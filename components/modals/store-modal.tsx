/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Modal } from "../ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import toast from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(1),
})

export const StoreModal = () => {
    const storeModal = useStoreModal()

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try { 
        setLoading(true);
        
        const response = await fetch("/api/stores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values), // Convert form values to JSON string
        });

        // Parse the JSON response
        const data = await response.json();

        toast.success("Project created")
        window.location.assign(`/${data.id}`);
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        } 
    }

    return (
        <Modal
            title="Create Project"
            description="Add a new project to manage and assign tasks to team members"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="Enter project name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    disabled={loading}
                                    variant="outline"
                                    onClick={storeModal.onClose}
                                >
                                    Cancel            
                                </Button>
                                <Button 
                                disabled={loading}
                                type="submit">
                                    Continue                
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}