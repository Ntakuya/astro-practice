import { useCallback } from "react";
import { Task } from "../api";

export type TaskItemProps = {
    task: Task
    selectTask: (taskUUID: string) => void
}

export function TaskItem({
    task,
    selectTask
}: TaskItemProps) {
    useCallback(() => {
        console.log(`on init ${task.taskUUID}`)
        return () => {
            console.log(`on destroy ${task.taskUUID}`)
        }
    }, [task.taskUUID])
    return (
        <div onClick={() => selectTask(task.taskUUID)}>
            <div>{task.taskUUID}</div>
            <div>{ task.title }</div>
        </div>
    )
}