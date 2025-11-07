import TaskForm from '@/components/task-form';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  if (!id) {
    return null;
  }

  return (
    <div className="w-1/2 p-8 mx-auto">
      <TaskForm id={id} />
    </div>
  );
}
