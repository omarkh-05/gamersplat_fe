export const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) => (
  <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
    {eyebrow && (
      <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-primary mb-3">
        {eyebrow}
      </span>
    )}
    <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
      {title}
    </h2>
    {description && (
      <p className="mt-3 text-muted-foreground leading-relaxed">{description}</p>
    )}
  </div>
);
