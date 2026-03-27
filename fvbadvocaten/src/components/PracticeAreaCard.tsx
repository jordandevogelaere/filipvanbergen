import {
  Shield,
  Briefcase,
  Building2,
  Users,
  Scale,
  Home,
  TrendingDown,
  Gavel,
  Truck,
  ShieldCheck,
  Banknote,
  FileText,
  Landmark,
  MapPin,
  Building,
} from "lucide-react";

export const iconMap: Record<string, React.ElementType> = {
  Shield,
  Briefcase,
  Building2,
  Users,
  Scale,
  Home,
  TrendingDown,
  Gavel,
  Truck,
  ShieldCheck,
  Banknote,
  FileText,
  Landmark,
  MapPin,
  Building,
};

export default function PracticeAreaCard({
  title,
  icon,
  description,
  details,
  variant = "icon",
}: {
  title: string;
  icon: string;
  description: string;
  details?: string[];
  variant?: "icon" | "block";
}) {
  const Icon = iconMap[icon] || Shield;
  const hasDetails = details && details.length > 0;

  if (variant === "block") {
    return (
      <div className="bg-navy-800 group flex items-start gap-6 rounded-2xl p-8 shadow-lg">
        <div className="bg-accent flex h-14 w-14 shrink-0 items-center justify-center rounded-xl">
          <Icon className="h-7 w-7 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold tracking-wide text-white">
            {title}
          </h3>
          <p className="mt-2 leading-relaxed text-white/70">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group flex w-full flex-col items-center rounded-xl bg-white p-6 shadow-sm transition-all ${hasDetails ? "cursor-pointer hover:shadow-md" : ""}`}
    >
      <div className="flex flex-1 flex-col items-center text-center">
        <div className="bg-navy-700 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl transition group-hover:bg-navy-600">
          <Icon className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-navy-800 text-sm font-bold uppercase tracking-wide">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}
