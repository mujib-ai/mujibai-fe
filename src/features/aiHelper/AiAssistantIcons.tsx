import type { SVGProps } from 'react';

export function AiStarsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2.75c.45 4.95 2.3 6.8 7.25 7.25-4.95.45-6.8 2.3-7.25 7.25C11.55 12.3 9.7 10.45 4.75 10 9.7 9.55 11.55 7.7 12 2.75Z"
        fill="currentColor"
      />
      <path
        d="M18.5 15.25c.2 2.2 1.05 3.05 3.25 3.25-2.2.2-3.05 1.05-3.25 3.25-.2-2.2-1.05-3.05-3.25-3.25 2.2-.2 3.05-1.05 3.25-3.25ZM4.5 2.25c.14 1.55.7 2.11 2.25 2.25-1.55.14-2.11.7-2.25 2.25-.14-1.55-.7-2.11-2.25-2.25 1.55-.14 2.11-.7 2.25-2.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SendArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m4 4 17 8-17 8 3-8-3-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M7 12h14" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
