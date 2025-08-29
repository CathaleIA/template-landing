interface ListItemProps {
  text: string;
}

export default function ListItem({ text }: ListItemProps) {
  return (
    <li className="flex items-start">
      <span className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
        <div className="h-2 w-2 rounded-full bg-primary"></div>
      </span>
      <span className="text-sm">{text}</span>
    </li>
  );
}