import { useCallback } from 'react';
import { useTaskList } from '../libs/tanstack-query/task-api-query';

export function TaskRefetchButton() {
  const { refetch } = useTaskList();
  const requestRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  return <button onClick={requestRefetch}>refetch</button>;
}
