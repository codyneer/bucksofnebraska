type SectionHeaderProps = {
  title: string
  highlight?: string
  subtitle?: string
}

export function SectionHeader({ title, highlight, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-display text-[clamp(38px,5vw,56px)] text-text leading-none">
        {title} {highlight && <span className="text-red">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="font-nav text-[13px] tracking-[3px] uppercase text-text-muted mt-2">
          {subtitle}
        </p>
      )}
    </div>
  )
}
