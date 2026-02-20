export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-border border-t-red rounded-full animate-spin mx-auto mb-4" />
        <span className="font-nav text-[12px] tracking-[2px] uppercase text-text-muted">
          Loading
        </span>
      </div>
    </div>
  )
}
