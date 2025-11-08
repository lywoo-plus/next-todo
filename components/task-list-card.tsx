import { countTotalTasksAction, listTasksAction } from '@/action/task';
import { Suspense } from 'react';
import { TaskListItem } from './task-list-item';
import TaskLoading from './task-loading';
import SearchTaskInput from './task-search-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

type Props = {
  title: string;
  description: string;
  varaint: 'todo' | 'completed';
  searchKey: string;
  searchValue?: string;
};

export default function TaskListCard(props: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 h-full">
        <SearchTaskInput searchKey={props.searchKey} searchValue={props.searchValue} />

        <Suspense fallback={<TaskLoading />}>
          <TaskList
            key={`${props.varaint}-${props.searchValue}`}
            varaint={props.varaint}
            searchValue={props.searchValue}
          />
        </Suspense>
      </CardContent>
    </Card>
  );
}

async function TaskList(props: Pick<Props, 'varaint' | 'searchValue'>) {
  const [tasks, todoTasksCount] = await Promise.all([
    await listTasksAction({
      name: props.searchValue,
      done: props.varaint === 'completed',
    }),
    await countTotalTasksAction({ done: false }),
  ]);

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        props.varaint === 'todo' ? (
          <div className="flex flex-col items-center gap-4 p-4">
            <span className="text-9xl">😂</span>
            <p className="font-medium">Lucky me! No tasks to do!</p>
          </div>
        ) : todoTasksCount === 0 ? (
          <div className="flex flex-col items-center gap-4 p-4">
            <span className="text-9xl">🥳</span>
            <p className="font-medium">All tasks completed!</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 p-4">
            <span className="text-9xl">📋</span>
            <p className="font-medium">{todoTasksCount} tasks to be completed!</p>
          </div>
        )
      ) : (
        tasks.map((todo) => <TaskListItem key={todo.id} {...todo} />)
      )}
    </div>
  );
}
