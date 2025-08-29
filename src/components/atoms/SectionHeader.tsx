interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
}

export default function SectionHeader({ badge, title, description }: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
          {badge}
        </div>
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{title}</h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">{description}</p>
      </div>
    </div>
  );
}