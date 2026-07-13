import Image from "next/image";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
  alt?: string;
};

const sizeClasses = {
  sm: "h-14 w-14",
  md: "h-28 w-28 sm:h-32 sm:w-32",
  lg: "h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72",
  xl: "h-[280px] w-[280px] md:h-[380px] md:w-[380px] lg:h-[460px] lg:w-[460px]",
};

/**
 * Crops watermark padding from logo.jpg by zooming into the circular emblem.
 */
export function BrandLogo({
  size = "md",
  className = "",
  priority = false,
  alt = "ACT Healing logo",
}: BrandLogoProps) {
  return (
    <div className={`relative overflow-hidden rounded-full bg-white ${sizeClasses[size]} ${className}`}>
      <Image
        src="/images/logo.jpg"
        alt={alt}
        fill
        sizes={
          size === "xl"
            ? "(max-width: 768px) 280px, (max-width: 1024px) 380px, 460px"
            : size === "lg"
              ? "(max-width: 768px) 192px, 288px"
              : size === "sm"
                ? "56px"
                : "128px"
        }
        priority={priority}
        className="object-cover object-center"
        style={{ transform: "scale(1.42)" }}
      />
    </div>
  );
}
