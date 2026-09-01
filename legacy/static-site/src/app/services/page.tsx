import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    slug: "hardware",
    title: "Hardware & Infrastructure",
    summary:
      "Servers, storage, endpoints, and peripherals planned, supplied, and supported as a cohesive stack.",
  },
  {
    slug: "networking",
    title: "Networking & Connectivity",
    summary:
      "LAN, WAN, Wi‑Fi, VPN, and secure remote access designed for stability, visibility, and performance.",
  },
  {
    slug: "software-development",
    title: "Software Development",
    summary:
      "Custom web and desktop applications, integrations, and automation aligned to your business workflows.",
  },
  {
    slug: "cctv",
    title: "CCTV & Surveillance",
    summary:
      "IP cameras, NVRs, monitoring, and retention policies that help protect your teams and assets.",
  },
  {
    slug: "consulting",
    title: "IT Consulting Services",
    summary:
      "IT audits, roadmaps, and project leadership to make technology investments more predictable and effective.",
  },
];

export const metadata: Metadata = {
  title: "Services | Mediyum ZA IT Solutions",
  description:
    "Explore Mediyum ZA's IT services across hardware, networking, software development, CCTV, and consulting.",
};

export default function ServicesPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <Badge className="bg-primary/10 text-primary">Services</Badge>
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Holistic IT solutions under one roof.
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            Whether you are building from the ground up or modernising an
            existing environment, Mediyum ZA provides the engineering and
            consulting expertise to deliver reliable outcomes.
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.slug} className="flex flex-col border-border/70">
            <CardHeader className="space-y-1 pb-3">
              <CardTitle className="text-base font-semibold">
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between space-y-3 pb-5 text-sm text-muted-foreground">
              <p>{service.summary}</p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="text-xs font-medium text-primary underline-offset-2 hover:underline"
                >
                  Discuss this service
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

