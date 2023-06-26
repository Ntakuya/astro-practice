import { useEffect } from "react"
import { TaskItem } from "./TaskItem"
import { useTaskList } from "../libs/tanstack-query/task-api-query"


type Props = {
    selectTask: (taskUUID: string) => void
}

export function TaskList(props: Props) {
    const { data } = useTaskList()
    useEffect(() => {
        console.log("on init")
        return () => {
            console.log("on destory")
        }
    }, [data])
    if (Array.isArray(data)) {
        return (
            <>
                {data.map(item => (
                    <TaskItem selectTask={props.selectTask} key={item.taskUUID} task={item} />
                ))}
            </>
        )
    }
    return (
        <div>sample</div>
    )
}