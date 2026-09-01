import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Shop | Mediyum ZA",
  description:
    "Hardware, software licenses, and IT service bundles supplied by Mediyum ZA. Request a quote for your requirements.",
};

const categories = [
  {
    label: "Business hardware & peripherals",
    description: "Laptops, desktops, servers, UPS, and accessories.",
  },
  {
    label: "Licenses & subscriptions",
    description:
      "Productivity suites, security tools, and line-of-business software.",
  },
  {
    label: "Managed service bundles",
    description: "Support retainers, monitoring, and maintenance packages.",
  },
];

export default function ShopPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          What we supply
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          We source and supply business hardware, software licenses, and service
          bundles alongside our project work. Tell us what you need and we will
          come back with availability and pricing.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Request a quote</Link>
        </Button>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.label} className="border-border/70">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                {category.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-5 text-sm text-muted-foreground">
              <p>{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
