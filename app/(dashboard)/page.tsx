import TaskForm from '@/components/task-form';
import TaskListCard from '@/components/task-list-card';

export default async function Page(props: {
  searchParams: Promise<{
    tt?: string;
    ct?: string;
  }>;
}) {
  const { tt, ct } = await props.searchParams;

  return (
    <div className="mx-auto grid grid-cols-1 p-8 md:grid-cols-3 2xl:container gap-6 items-start">
      <TaskForm />

      <TaskListCard
        varaint="todo"
        title="Todo Tasks"
        description="Todo tasks will be listed here"
        searchKey="tt"
        searchValue={tt}
      />

      <TaskListCard
        varaint="completed"
        title="Completed Tasks"
        description="Completed tasks will be listed here"
        searchKey="ct"
        searchValue={ct}
      />
    </div>
  );
}
