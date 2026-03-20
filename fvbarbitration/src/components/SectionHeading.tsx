export default function SectionHeading({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <h2
      className={`font-heading mb-8 text-center text-3xl font-bold italic md:text-4xl ${
        light ? "text-white" : "text-sage-800"
      }`}
    >
      {children}
    </h2>
  );
}
