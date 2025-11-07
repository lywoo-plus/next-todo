import EditTaskFormModal from '@/components/edit-task-form-modal';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  if (!id) {
    return null;
  }

  return <EditTaskFormModal id={id} />;
}
