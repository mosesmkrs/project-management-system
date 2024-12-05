export interface Status {
    id: string;
    name: string;
    projectId?: string
};

export interface Priority {
    id: string;
    name: string;  
    projectId?: string 
};

export interface Task {
    id: string;
    title: string;
    projectId?: string;
    description: string | null;
    status: Status;
    priority: Priority;
    dueDate: Date | null;
}; 

export interface Store {
    projectId: string;
    name: string;
    userId: string;
};