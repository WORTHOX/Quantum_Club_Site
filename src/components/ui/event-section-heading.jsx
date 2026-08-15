import { cn } from "../../lib/utils";

export default function EHeading({ title, className }) {
  return (
    <div className={cn("mb-3 text-center", className)}>
      <h2 className="font-title text-3xl md:text-4xl font-bold text-white">
        {title}
      </h2>
    </div>
  );
}
