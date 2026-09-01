import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1 text-sm">
          <p className="font-medium">Mediyum ZA (PTY) LTD</p>
          <p className="max-w-md text-xs text-muted-foreground">
            End-to-end IT solutions for South African businesses – hardware,
            networking, software development, CCTV, and consulting.
          </p>
          <p className="text-[11px] text-muted-foreground">
            © {year} Mediyum ZA (PTY) LTD. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-foreground">Pages</span>
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
            <Link href="/services" className="hover:text-foreground">
              Services
            </Link>
            <Link href="/shop" className="hover:text-foreground">
              Shop
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-medium text-foreground">Legal</span>
            <Link href="/legal/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

