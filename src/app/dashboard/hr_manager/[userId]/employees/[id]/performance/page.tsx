export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
        Employee Performance - {params.id}
      </h1>
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
        <p className="text-zinc-600 dark:text-zinc-400">
          This is the Employee Performance page. Content coming soon.
        </p>
      </div>
    </div>
  );
}
