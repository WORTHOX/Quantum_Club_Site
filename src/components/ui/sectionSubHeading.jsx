import { cn } from "../../lib/utils";

export default function SubSectionHeading({ title, className }) {
  return (
    <div className={cn("mb-10 text-center", className)}>
      <h2 className="font-title text-2xl md:text-3xl font-bold mb-3 text-purple-400">
        {title}
      </h2>
      <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
    </div>
  );
}
