export default function ShopLoading() {
  return (
    <div className="py-20 px-10 max-w-[1300px] mx-auto">
      <div className="text-center mb-12">
        <div className="h-12 bg-offWhite animate-pulse w-48 mx-auto mb-3" />
        <div className="h-4 bg-offWhite animate-pulse w-64 mx-auto" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-offWhite animate-pulse" style={{ aspectRatio: '1 / 1.4' }} />
        ))}
      </div>
    </div>
  )
}
