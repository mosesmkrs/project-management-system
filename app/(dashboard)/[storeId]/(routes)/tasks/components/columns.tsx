"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TasksColumn = {
  id: string
  title: string
  priority: string
  status: string
  dueDate: string
  createdAt: string
}

export const columns: ColumnDef<TasksColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }, 
]
