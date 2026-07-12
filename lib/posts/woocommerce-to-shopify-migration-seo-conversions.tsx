import { Prose } from "@/components/blog/prose";
import { CodeBlock } from "@/components/blog/code-block";
import { CompareTable } from "@/components/blog/compare-table";
import { WorkflowDiagram } from "@/components/blog/workflow-diagram";
import { Callout } from "@/components/blog/callout";

const redirectCsv = `# url_redirects.csv — bulk import via Matrixify or Shopify's native
# URL Redirects importer (Online Store → Navigation → URL Redirects)
Redirect from,Redirect to
/shop,/collections/all
/product/merino-base-layer,/products/merino-base-layer
/product-category/mens,/collections/mens
/product-category/mens/jackets,/collections/mens-jackets
/?product=gift-card,/products/gift-card
/my-account,/account
/cart,/cart
/checkout,/checkout`;

const canonicalCheck = `# after launch, confirm every important URL resolves the way you expect
# 301 = permanent redirect (good), 200 = live page (good), 404 = you missed one

for url in \\
  "https://store.com/shop" \\
  "https://store.com/product/merino-base-layer" \\
  "https://store.com/product-category/mens"; do
  echo "$url -> $(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$url")"
done`;

export function WooToShopifyMigrationPost() {
  return (
    <Prose>
      <p>
        The two things a store migration can quietly destroy are the rankings you
        spent years earning and the conversion rate that pays the bills. I led a
        WooCommerce-to-Shopify migration for{" "}
        <a href="https://statesidedistribution.com" target="_blank" rel="noopener noreferrer">
          Stateside Distribution
        </a>{" "}
        at Tuliptech that came out the other side with a 20% increase in
        conversion rate and no ranking collapse. This is the process I use to get
        that result — the parts that matter, and the parts people skip and regret.
      </p>

      <h2>Why migrations lose traffic and sales</h2>
      <p>
        WooCommerce and Shopify structure URLs differently. If you replatform
        without a redirect map, every product, category and blog URL Google has
        indexed becomes a 404 overnight. Rankings drop, and the sessions that do
        arrive land on error pages instead of products. The conversion hit is
        separate: a new theme means a new checkout path, new trust signals and
        new performance characteristics, and any of those can move the needle the
        wrong way. Treat SEO and conversion as two distinct workstreams and neither
        gets dropped.
      </p>

      <WorkflowDiagram
        title="The migration path"
        steps={[
          { label: "Audit", sub: "URLs, rankings, top pages" },
          { label: "Export", sub: "products, customers, orders" },
          { label: "Map URLs", sub: "old → new, 301s" },
          { label: "Import", sub: "staging store" },
          { label: "QA", sub: "data + redirects + speed" },
          { label: "Launch", sub: "DNS + resubmit sitemap" },
        ]}
      />

      <h2>1. Audit before you touch anything</h2>
      <p>
        You cannot redirect URLs you did not record. Before the migration starts,
        capture the full picture of what exists and what earns:
      </p>
      <ul>
        <li>
          <strong>Every indexed URL</strong> — crawl the live site (Screaming
          Frog) and export the full URL list: products, categories, pages, blog
          posts, pagination.
        </li>
        <li>
          <strong>What actually ranks</strong> — pull top landing pages and
          queries from Google Search Console and GA4. These are the URLs where a
          broken redirect costs real money.
        </li>
        <li>
          <strong>A performance baseline</strong> — record current Core Web
          Vitals, conversion rate and AOV. Without a baseline you can&apos;t prove
          the migration helped, and you can&apos;t catch a regression.
        </li>
      </ul>

      <Callout label="Rule of thumb">
        Sort your URL export by organic traffic and protect the top 20% ruthlessly.
        A long-tail product that gets three visits a month can 404 without anyone
        noticing; your best-ranking category page cannot.
      </Callout>

      <h2>2. Migrate the data — products, customers, orders</h2>
      <p>
        For anything past a handful of products, do this with{" "}
        <strong>Matrixify</strong> (formerly Excelify) rather than by hand. Export
        from WooCommerce to a spreadsheet, clean it, then import into a{" "}
        <em>development / staging</em> store — never straight into a live store you
        haven&apos;t validated. Migrate in this order so relationships resolve:
      </p>
      <ul>
        <li><strong>Products & variants</strong> — including images, SKUs, inventory and metafields.</li>
        <li><strong>Collections</strong> — map WooCommerce categories to Shopify collections (smart or manual).</li>
        <li><strong>Customers</strong> — note that password hashes don&apos;t transfer; customers reset on first login.</li>
        <li><strong>Historical orders</strong> — import for reporting and customer history, even though they&apos;re closed.</li>
      </ul>

      <Callout label="Data" tone="warn">
        Reconcile counts after every import. Products in vs products out,
        variants, images. A migration that silently drops 4% of variants looks
        fine in a spot check and shows up three weeks later as &quot;why is this
        size missing?&quot; tickets.
      </Callout>

      <h2>3. The redirect map is the whole game for SEO</h2>
      <p>
        Shopify uses fixed, non-negotiable URL prefixes. You can change the
        handle, but not the <code>/products/</code>, <code>/collections/</code> or{" "}
        <code>/blogs/</code> segment. That means almost every WooCommerce URL
        needs a 301 to its new Shopify equivalent.
      </p>

      <CompareTable
        caption="URL structure — WooCommerce vs Shopify"
        headerA="WooCommerce"
        headerB="Shopify"
        rows={[
          { criterion: "Product", a: "/product/{slug}", b: "/products/{handle}" },
          { criterion: "Category", a: "/product-category/{slug}", b: "/collections/{handle}" },
          { criterion: "Shop / all", a: "/shop", b: "/collections/all" },
          { criterion: "Blog post", a: "/{yyyy}/{mm}/{slug}", b: "/blogs/news/{handle}" },
          { criterion: "Cart", a: "/cart", b: "/cart" },
          { criterion: "Account", a: "/my-account", b: "/account" },
        ]}
      />

      <p>
        Build the map as a CSV keyed off your crawl, then bulk-import it. Shopify
        has a native URL Redirects importer, and Matrixify handles it too. Keep
        the file in version control so the map is documented, not a one-off you
        can never reconstruct.
      </p>

      <CodeBlock filename="url_redirects.csv" language="CSV">
        {redirectCsv}
      </CodeBlock>

      <Callout label="Don't forget">
        Redirect the <em>naked</em> forms and query-string URLs too —{" "}
        <code>/?product=…</code>, trailing-slash variants, and old paginated
        category pages. And point your <code>robots.txt</code> and sitemap at the
        new store: after go-live, resubmit <code>sitemap.xml</code> in Google
        Search Console so re-crawling starts immediately instead of on Google&apos;s
        schedule.
      </Callout>

      <h2>4. Verify redirects like you mean it</h2>
      <p>
        Don&apos;t trust the importer&apos;s success message. Take the top-traffic
        URLs from your audit and confirm each returns a{" "}
        <strong>301</strong> to the correct destination — not a 404, and not a
        soft redirect to the homepage (which Google treats almost as badly as a
        404).
      </p>

      <CodeBlock filename="terminal" language="bash">
        {canonicalCheck}
      </CodeBlock>

      <h2>5. Protect the conversion rate</h2>
      <p>
        SEO keeps the traffic; these keep the sales. Where the 20% lift on
        Stateside actually came from:
      </p>
      <ul>
        <li>
          <strong>A faster storefront</strong> — I rebuilt the theme with a clean
          asset pipeline, cut render-blocking resources and improved LCP. Speed is
          a conversion lever, not just an SEO one.
        </li>
        <li>
          <strong>A shorter checkout path</strong> — Shopify Checkout is already
          high-converting; the job is to not get in its way. Accelerated wallets
          (Shop Pay, Apple Pay, Google Pay) on the product and cart pages remove
          friction for returning buyers.
        </li>
        <li>
          <strong>Trust signals carried over</strong> — reviews, badges, shipping
          and returns messaging migrated with the content, so the new store never
          looked less credible than the old one.
        </li>
        <li>
          <strong>Automations that protect margin</strong> — I wired up{" "}
          <a href="/blog/shopify-flow-block-fraudulent-orders">
            Shopify Flow to block fraudulent orders
          </a>
          , so the conversion gains weren&apos;t eaten by chargebacks.
        </li>
      </ul>

      <h2>6. Launch checklist</h2>
      <ul>
        <li>Redirect map imported and spot-checked against top-traffic URLs.</li>
        <li>Analytics and Search Console verified on the new store; new sitemap submitted.</li>
        <li>Payment providers, taxes and shipping zones live-tested with a real order.</li>
        <li>Transactional and marketing email (e.g. Klaviyo) reconnected and sending.</li>
        <li>Core Web Vitals measured against the pre-migration baseline.</li>
        <li>404 report watched daily for the first two weeks; new gaps redirected as they surface.</li>
      </ul>

      <h2>The result</h2>
      <p>
        Done in this order — audit, migrate, map, verify, then optimise — a
        replatform stops being a gamble. For Stateside it meant no ranking cliff
        and a 20% lift in conversion rate, because the SEO work held the traffic
        steady while the rebuild made that traffic convert harder. The migration
        wasn&apos;t the risk; skipping the redirect map would have been.
      </p>
    </Prose>
  );
}