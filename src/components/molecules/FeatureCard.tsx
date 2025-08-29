import { FaShieldAlt } from "react-icons/fa";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function FeatureCard({ title, description, icon = <FaShieldAlt className="h-6 w-6 text-primary" /> }: FeatureCardProps) {
  return (
    <div className="flex flex-col p-6 bg-background rounded-lg border shadow-sm">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}