export const metadata = {
  title: "Blog | Mediyum ZA Insights",
  description:
    "Articles and updates from Mediyum ZA on infrastructure, networking, software, security, and surveillance.",
};

export default function BlogPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
        Insights &amp; updates
      </h1>
      <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
        In future, this space will host articles, case studies, and security
        advisories from the Mediyum ZA team. For now, reach out directly if
        you&apos;d like to discuss a particular challenge or upcoming project.
      </p>
    </div>
  );
}

