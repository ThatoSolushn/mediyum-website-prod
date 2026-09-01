import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Shop | Mediyum ZA WooCommerce Store",
  description:
    "Visit the Mediyum ZA WooCommerce store for curated hardware, software licenses, and IT service bundles.",
};

const categories = [
  {
    label: "Business hardware & peripherals",
    description: "Laptops, desktops, servers, UPS, and accessories.",
    href: siteConfig.wooCommerce.categories.hardware,
  },
  {
    label: "Licenses & subscriptions",
    description:
      "Productivity suites, security tools, and line-of-business software.",
    href: siteConfig.wooCommerce.categories.licenses,
  },
  {
    label: "Managed service bundles",
    description: "Support retainers, monitoring, and maintenance packages.",
    href: siteConfig.wooCommerce.categories.services,
  },
];

export default function ShopPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          WooCommerce-powered shop
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          Purchase recommended hardware, software licenses, and service bundles
          directly through our secure WooCommerce store. For complex projects or
          tenders, contact our team for a tailored quote.
        </p>
        <Button asChild size="lg">
          <Link
            href={siteConfig.wooCommerce.baseUrl}
            target="_blank"
            rel="noreferrer"
          >
            Go to shop
          </Link>
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
            <CardContent className="space-y-3 pb-5 text-sm text-muted-foreground">
              <p>{category.description}</p>
              <Button asChild size="sm" variant="outline">
                <Link href={category.href} target="_blank" rel="noreferrer">
                  View on shop
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

