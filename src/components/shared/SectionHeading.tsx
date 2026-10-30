interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, className = "", centered = false }: SectionHeadingProps) {
  return (
    <div className={`${centered ? "text-center" : ""} mb-6 ${className}`}>
      <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-2 text-sm text-muted-foreground ${centered ? "max-w-xl mx-auto" : "max-w-lg"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
