import './App.css';

import { TaskList } from './components/TaskList';
import { TaskRefetchButton } from './components/TaskRefetchButton';
import { SelectedTask } from './components/SelectedTask';
import { useCallback, useState } from 'react';
import { QueryClientProvider } from './libs/tanstack-query/core';

function App() {
  const [selectedTaskUUID, selectTask] = useState<string | null>(null);
  const selectTaskOnClick = useCallback((taskUUID: string) => {
    selectTask(taskUUID);
  }, []);

  return (
    <>
      <QueryClientProvider>
        <TaskList selectTask={selectTaskOnClick} />
        {selectedTaskUUID && <SelectedTask taskUUID={selectedTaskUUID} />}
        <TaskRefetchButton />
      </QueryClientProvider>
    </>
  );
}

export default App;
