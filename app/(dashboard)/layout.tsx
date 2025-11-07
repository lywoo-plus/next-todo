export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <section className="border-t-2 border-green-300">
      {children}
      {modal}
    </section>
  );
}
