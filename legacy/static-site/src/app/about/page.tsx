import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `About | ${siteConfig.legalName}`,
  description:
    "Learn about Mediyum ZA (PTY) LTD, our mission, values, and how we deliver reliable IT solutions across South Africa.",
};

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          About Mediyum ZA (PTY) LTD
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          Mediyum ZA (PTY) LTD is an IT solutions partner dedicated to helping
          South African organisations design, deploy, and support stable, secure
          technology environments. We combine hands-on engineering expertise
          with practical consulting to meet you where you are today and help you
          grow.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-3">
        <div className="space-y-2 rounded-xl border bg-card/70 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Mission
          </h2>
          <p className="text-sm text-muted-foreground">
            To provide reliable, secure, and scalable IT solutions that enable
            South African businesses to operate with confidence and focus on
            what they do best.
          </p>
        </div>
        <div className="space-y-2 rounded-xl border bg-card/70 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Vision
          </h2>
          <p className="text-sm text-muted-foreground">
            To be a trusted long-term technology partner for organisations
            across the region, known for our engineering quality, responsiveness
            and honest advice.
          </p>
        </div>
        <div className="space-y-2 rounded-xl border bg-card/70 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What we do
          </h2>
          <p className="text-sm text-muted-foreground">
            We design infrastructure, build and integrate software, secure
            networks, deploy CCTV and monitoring, and advise on IT strategy and
            governance.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          How we work
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground md:max-w-3xl md:text-base">
          <p>
            Every environment is different. We start by understanding your
            current infrastructure, applications, security posture, and business
            processes. From there, we design solutions that are realistic for
            your budget and operational constraints while still moving you
            towards a more modern, secure stack.
          </p>
          <p>
            Our team is comfortable working alongside internal IT and other
            vendors. We focus on clear communication, documentation, and
            handover so that you&apos;re never locked into a single provider.
          </p>
        </div>
      </section>
    </div>
  );
}

