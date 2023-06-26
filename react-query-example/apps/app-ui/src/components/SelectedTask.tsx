import { useTaskItem } from "../libs/tanstack-query/task-api-query"


export type SelectedTaskProps = {
    taskUUID: string
}

export function SelectedTask(props: SelectedTaskProps) {
    const { data } = useTaskItem(props.taskUUID)
    return (
        <div>sample</div>
    )
}