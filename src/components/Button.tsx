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
    'button-glow group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-extrabold shadow-sm transition duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-civic-yellow/35 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0',
    variant === 'primary' && 'bg-civic-blue text-white hover:bg-civic-sky hover:shadow-blue',
    variant === 'secondary' && 'bg-civic-yellow text-civic-ink hover:bg-[#ffd95a] hover:shadow-yellow',
    variant === 'ghost' && 'bg-white/[0.07] text-white ring-1 ring-white/25 backdrop-blur-md hover:bg-white/[0.14] hover:ring-white/45',
    variant === 'dark' && 'bg-civic-ink text-white hover:bg-civic-navy hover:shadow-dark',
    className,
  );
}
