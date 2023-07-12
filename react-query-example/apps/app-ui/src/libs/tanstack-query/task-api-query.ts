import { useQuery } from '@tanstack/react-query';
import { Task, TaskAPI } from '../../api';
import { queryCache } from './query-cache';

const TASK_QUERY_KEYS = {
  all: () => ['tasks'],
  item: (taskUUID: string) => ['tasks', taskUUID],
};

export function useTaskList() {
  const { data: result, refetch } = useQuery(TASK_QUERY_KEYS.all(), {
    queryFn: TaskAPI.findAll,
  });
  return { data: result ?? [], refetch };
}

export function useTaskItem(taskUUID: string) {
  const { data: requestResult } = useQuery(TASK_QUERY_KEYS.item(taskUUID), {
    queryFn: () => TaskAPI.findOneByUUID(taskUUID),
  });

  const cacheDataFromList = (() => {
    const cacheListData = queryCache.find<Task[]>(TASK_QUERY_KEYS.all());
    return cacheListData?.state?.data?.find(
      (item) => item.taskUUID === taskUUID,
    );
  })();

  return { data: requestResult ?? cacheDataFromList };
}
