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
};

export default function PracticeAreaCard({
  title,
  icon,
  description,
}: {
  title: string;
  icon: string;
  description: string;
}) {
  const Icon = iconMap[icon] || Shield;

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
