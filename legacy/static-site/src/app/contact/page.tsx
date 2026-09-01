import { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact | Mediyum ZA IT Solutions",
  description:
    "Contact Mediyum ZA (PTY) LTD to discuss your IT requirements across hardware, networking, software, CCTV, and consulting.",
};

export default function ContactPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Talk to our team
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          Share a bit about your environment and immediate priorities. We&apos;ll
          follow up with clarifying questions or a suggested next step within
          one business day.
        </p>
      </section>

      <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <section>
          <ContactForm />
        </section>

        <section className="space-y-4 rounded-xl border bg-card/70 p-5 text-sm text-muted-foreground">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Direct contact
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Replace these placeholders with your real contact details.
            </p>
            <div className="mt-3 space-y-1 text-sm">
              <p>Email: info@mediyumza.co.za</p>
              <p>Phone: +27 (0)00 000 0000</p>
              <p>Hours: Monday – Friday, 08:00–17:00 SAST</p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Service coverage
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              On-site services are available in key South African metros, with
              remote support offered nationwide.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

