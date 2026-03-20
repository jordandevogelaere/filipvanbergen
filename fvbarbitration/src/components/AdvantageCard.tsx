export default function AdvantageCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg bg-white p-6 text-center shadow-sm">
      <h3 className="text-sage-800 font-heading mb-2 text-lg font-bold">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}
