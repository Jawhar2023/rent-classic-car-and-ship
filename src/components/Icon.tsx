import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  label?: string;
}

export default function Icon({ name, label, viewBox = "0 0 256 256", ...props }: IconProps) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} {...props}>
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
}
