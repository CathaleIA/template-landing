import ListItem from "../atoms/ListItem";

interface BenefitsListProps {
  benefits: string[];
}

export default function BenefitsList({ benefits }: BenefitsListProps) {
  return (
    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <ListItem key={index} text={benefit} />
      ))}
    </ul>
  );
}