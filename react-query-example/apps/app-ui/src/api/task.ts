export type Task = {
    id: number
    taskUUID: string
    title: string
    description: string
    authorId: number
    createdAt: string
}

export const TaskAPI = { 
    findAll: () => fetchWithOptions <Task[]>("http://localhost:3000/tasks").then(r => r?.data),
    findOneByUUID: (taskUUID: string) => fetchWithOptions<Task>(`http://localhost:3000/tasks/${taskUUID}`).then(res => res?.data)
}

export async function fetchWithOptions<T>(url: string) {
    return fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(
        async (response) => {
            if (response.ok) { 
                const result = await response.json() as Promise<T>
                return { data: result, status: response.status } as { data: T, status: number }
            }
            return null
        }
    ).catch(err => {
        console.warn(err)
        throw err
    })
}