import { AcademyNav } from "@/components/academy/AcademyNav";

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="academy-shell">
      <AcademyNav />
      {children}
    </div>
  );
}
