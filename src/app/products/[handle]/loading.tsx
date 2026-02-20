export default function ProductLoading() {
  return (
    <div className="pt-[40px] pb-20 px-10 max-w-[1060px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Image skeleton */}
        <div className="bg-offWhite animate-pulse" style={{ aspectRatio: '1 / 1.15' }} />

        {/* Info skeleton */}
        <div className="space-y-4">
          <div className="h-10 bg-offWhite animate-pulse w-3/4" />
          <div className="h-4 bg-offWhite animate-pulse w-1/3" />
          <div className="h-8 bg-offWhite animate-pulse w-1/4" />
          <div className="h-20 bg-offWhite animate-pulse" />
          <div className="h-40 bg-offWhite animate-pulse" />
          <div className="h-14 bg-offWhite animate-pulse" />
        </div>
      </div>
    </div>
  )
}
