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
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
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
};

export default function PracticeAreaCard({
  title,
  icon,
  description,
  variant = "icon",
}: {
  title: string;
  icon: string;
  description: string;
  variant?: "icon" | "block";
}) {
  const Icon = iconMap[icon] || Shield;

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
    <div className="group text-center">
      <div className="bg-navy-700 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl transition group-hover:bg-navy-600">
        <Icon className="h-7 w-7 text-white" />
      </div>
      <h3 className="text-navy-800 mb-2 text-sm font-bold uppercase tracking-wide">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}
