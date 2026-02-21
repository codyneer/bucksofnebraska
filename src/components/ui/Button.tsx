import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'outline-dark'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-red text-white border-2 border-red hover:bg-red-dark hover:border-red-dark',
  outline:
    'bg-transparent text-white border-2 border-white hover:bg-white hover:text-brand-black',
  'outline-dark':
    'bg-transparent text-brand-black border-2 border-brand-black hover:bg-brand-black hover:text-white',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-2 px-4 text-[11px] tracking-[2px]',
  md: 'py-3 px-6 text-[12px] tracking-[2.5px]',
  lg: 'py-4 px-8 text-[14px] tracking-[3px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, loading = false, children, className = '', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`font-nav uppercase cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
