import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "Hardware & Infrastructure",
    description: "Servers, endpoints, and peripherals designed for uptime and performance.",
  },
  {
    title: "Networking & Connectivity",
    description: "Secure, scalable networks that keep your teams and locations connected.",
  },
  {
    title: "Software Development",
    description: "Custom business applications and integrations tailored to your workflows.",
  },
  {
    title: "CCTV & Surveillance",
    description: "Intelligent video solutions to protect your people, assets, and premises.",
  },
  {
    title: "IT Consulting Services",
    description: "Strategic guidance to modernise, secure, and scale your IT landscape.",
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background via-background to-slate-950/80 px-6 py-10 shadow-sm md:px-10 md:py-14">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.2),_transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-50 [mask-image:radial-gradient(circle_at_top,_black,_transparent_65%)]" />

        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-6">
            <Badge className="border border-cyan-300/40 bg-cyan-500/10 text-cyan-100">
              End-to-end IT solutions in South Africa
            </Badge>
            <div className="space-y-3">
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
                Your full-stack IT partner for modern, secure businesses.
              </h1>
              <p className="text-balance text-sm text-slate-200/80 md:text-base">
                Mediyum ZA (PTY) LTD designs, deploys, and supports integrated IT
                solutions across hardware, networking, software development,
                CCTV, and consulting — so your teams stay online, secure, and
                productive.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/services">View services</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-slate-500/60 bg-slate-900/40 text-slate-100 hover:bg-slate-800/80">
                <Link href="/contact">Contact sales</Link>
              </Button>
            </div>
            <p className="text-xs text-slate-300/70">
              Serving SMEs and enterprises across South Africa with on-site and
              remote support.
            </p>
          </div>

          <div className="grid w-full max-w-md gap-4 md:max-w-sm">
            <Card className="border-slate-700/70 bg-slate-900/80 shadow-lg shadow-cyan-500/10">
              <CardContent className="space-y-3 p-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-300/80">
                  Core capabilities
                </p>
                <ul className="space-y-1.5 text-sm text-slate-200/90">
                  <li>• Network design, Wi‑Fi, and secure remote access</li>
                  <li>• On-prem and cloud infrastructure rollouts</li>
                  <li>• Line-of-business software and integrations</li>
                  <li>• CCTV, access control, and monitoring</li>
                  <li>• Strategic IT consulting and audits</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-slate-800/70 bg-slate-950/60 backdrop-blur">
              <CardContent className="flex items-center justify-between gap-4 p-5 text-xs text-slate-200/90">
                <div>
                  <p className="font-medium text-slate-100">
                    Need hardware or licenses today?
                  </p>
                  <p className="mt-1 text-[11px] text-slate-300/80">
                    Visit our WooCommerce-powered shop for curated equipment and
                    service packages.
                  </p>
                </div>
                <Button asChild size="sm" variant="outline" className="shrink-0 border-cyan-400/60 text-cyan-100 hover:bg-cyan-500/10">
                  <Link href="/shop">Go to shop</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Solutions built for real-world operations
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            From new deployments to modernising legacy environments, Mediyum ZA
            delivers practical, scalable IT that matches how your business
            actually works.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="relative overflow-hidden border-border/70 bg-card/80">
              <div className="pointer-events-none absolute inset-px rounded-2xl border border-white/5 bg-gradient-to-br from-cyan-500/5 via-transparent to-slate-900/60" />
              <CardContent className="relative space-y-2 p-5">
                <h3 className="text-sm font-semibold">{service.title}</h3>
                <p className="text-xs text-muted-foreground md:text-sm">
                  {service.description}
                </p>
                <Button asChild variant="link" className="px-0 text-xs">
                  <Link href="/services">Learn more</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-border/60 bg-muted/40 px-5 py-6 md:px-8 md:py-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <h2 className="text-base font-semibold md:text-lg">
              Ready to stabilise and modernise your IT?
            </h2>
            <p className="max-w-xl text-xs text-muted-foreground md:text-sm">
              Tell us where you are today and where you want to go. Our team
              will propose a practical roadmap across infrastructure, networks,
              software, and security.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="sm">
              <Link href="/contact">Book a consultation</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/about">Learn about Mediyum ZA</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
