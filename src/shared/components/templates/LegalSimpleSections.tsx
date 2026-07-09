type LegalSimpleSection = {
  title: string;
  content: string;
};

export function LegalSimpleSections({
  sections,
}: {
  sections: Record<string, LegalSimpleSection>;
}) {
  return (
    <div className="mt-10 flex flex-col gap-8">
      {Object.entries(sections).map(([key, section]) => (
        <section key={key}>
          <h2 className="text-xl font-semibold md:text-2xl">{section.title}</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            {section.content}
          </p>
        </section>
      ))}
    </div>
  );
}
