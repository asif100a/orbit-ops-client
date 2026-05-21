export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs tracking-widest uppercase text-violet-400 mb-3">
      {children}
    </span>
  );
}
 
export function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-extrabold tracking-tight text-white leading-tight text-3xl md:text-4xl lg:text-5xl ${className}`}>
      {children}
    </h2>
  );
}