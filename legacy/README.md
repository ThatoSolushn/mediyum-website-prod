# Legacy

## `static-site/`

Snapshot of the **previous production Mediyum ZA website**, taken from
`ThatoSolushn/mediyum-website-prod` @ `main` (last pushed 2026-02-03).

Plain Next.js 15 + Tailwind 4 + shadcn/ui. No CMS — every page is hardcoded
React. This is the code currently serving the live Coolify deployment.

It is kept here **only as the source of truth for content and copy** while that
content is ported into Payload (`Pages`, `Posts`, and the ecommerce collections).
It is not built, not linted, and not part of the pnpm workspace.

### What is worth porting out of it

| From | To |
|---|---|
| `src/app/{page,about,services,shop,contact}/page.tsx` | Payload `Pages` documents |
| `src/app/legal/{privacy,terms}/page.tsx` | Payload `Pages` documents |
| `src/app/blog/page.tsx` | Payload `Posts` |
| `src/lib/site-config.ts` | Payload globals / env config |
| `src/components/site-{header,footer}.tsx` | `src/Header`, `src/Footer` |

### Known defects in this snapshot — do not carry them forward

1. `src/app/globals.css` — the `.dark` block is self-referential
   (`--background: var(--background)`), which is invalid at computed-value time.
   Every design token resolves to empty on the live site, so the whole palette is
   dead. See the design review for the fix.
2. `src/lib/site-config.ts` — WooCommerce URLs are still the
   `your-woocommerce-store.example.com` placeholder, so every shop CTA on the
   live site is a dead link.
3. `package.json` is still named `"portfolio"` from the create-next-app scaffold.

**Delete this directory once the content has been migrated.**
