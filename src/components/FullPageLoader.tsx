// components/FullPageLoader.tsx
// ~L1
type FullPageLoaderProps = {
  message?: string;
};

// ~L5
export default function FullPageLoader({ message = "Cargando…" }: FullPageLoaderProps) {
  return (
    // ~L8
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* ~L12 */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        {/* ~L15 */}
        <span className="text-sm text-gray-700 dark:text-gray-200">{message}</span>
      </div>
    </div>
  );
}
