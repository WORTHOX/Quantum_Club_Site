import { cn } from "../../lib/utils";

export default function SectionHeading({ title, className }) {
  return (
    <div className={cn("mb-10 text-center", className)}>
      <h2 className="font-title text-3xl md:text-4xl font-bold mb-3 text-white">
        {title}
      </h2>

    </div>
  );
}
