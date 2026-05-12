import { Link, LinkProps } from 'react-router-dom';
import { clsx } from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return <button className={buttonClass(variant, className)} {...props} />;
}

export function ButtonLink({ className, variant = 'primary', ...props }: LinkProps & { variant?: ButtonProps['variant'] }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

function buttonClass(variant: ButtonProps['variant'], className?: string) {
  return clsx(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold shadow-sm transition duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-civic-yellow/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0',
    variant === 'primary' && 'bg-civic-blue text-white hover:bg-blue-700 hover:shadow-soft',
    variant === 'secondary' && 'bg-civic-yellow text-civic-ink hover:bg-amber-300 hover:shadow-soft',
    variant === 'ghost' && 'bg-white/10 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20',
    variant === 'dark' && 'bg-civic-ink text-white hover:bg-slate-800',
    className,
  );
}
