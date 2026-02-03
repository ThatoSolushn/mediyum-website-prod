import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            MZ
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight md:text-base">
              Mediyum ZA
            </span>
            <span className="text-[11px] text-muted-foreground md:text-xs">
              IT Solutions (PTY) LTD
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-4">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Button asChild size="sm">
            <Link href="/contact">Contact sales</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Button asChild size="sm" variant="outline">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

