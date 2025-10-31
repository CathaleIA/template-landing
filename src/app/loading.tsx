// app/loading.tsx
// ~L1
export default function Loading() {
  return (
    // ~L5
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-neutral-950">
      {/* Loader Cathaleia */}
      {/* ~L9 */}
      <div className="flex flex-col items-center gap-4">
        {/* Anillo giratorio */}
        {/* ~L12 */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        {/* Marca/Texto */}
        {/* ~L16 */}
        <p className="text-sm tracking-wide text-gray-600 dark:text-gray-300">
          Cargando Cathaleia…
        </p>
      </div>
    </div>
  );
}
