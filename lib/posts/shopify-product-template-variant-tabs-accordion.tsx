import { Prose } from "@/components/blog/prose";
import { CodeBlock } from "@/components/blog/code-block";
import { FileTree } from "@/components/blog/file-tree";
import { ArchitectureDiagram } from "@/components/blog/architecture-diagram";
import { CompareTable } from "@/components/blog/compare-table";
import { Callout } from "@/components/blog/callout";

const liquidMainProduct = `{{ 'product-template.css' | asset_url | stylesheet_tag }}
<script src="{{ 'product-template.js' | asset_url }}" defer></script>

<section class="modern-product-page" data-section-id="{{ section.id }}">
  <div class="product-container page-width">

    {% render 'product-gallery', product: product %}

    <div class="product-info-wrapper">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="{{ routes.root_url }}">Home</a> /
        <a href="{{ product.type | url_for_type }}">{{ product.type }}</a> /
        <span>{{ product.title }}</span>
      </nav>

      <h1 class="product-title">{{ product.title }}</h1>

      <p class="product-price" id="ProductPrice">
        {{ product.selected_or_first_available_variant.price | money }}
      </p>

      {% render 'variant-tabs', product: product %}
      {% render 'product-accordion', product: product %}

      {% form 'product', product, id: 'AddToCartForm' %}
        <input type="hidden" name="id" id="VariantIdInput"
               value="{{ product.selected_or_first_available_variant.id }}">

        <div class="product-actions">
          <button type="submit" class="add-to-cart-button"
                  {% unless product.available %}disabled{% endunless %}>
            {% if product.available %}Add to Cart{% else %}Sold out{% endif %}
          </button>
          <button type="button" class="buy-now-button">Buy it now</button>
        </div>
      {% endform %}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Modern product",
  "settings": [],
  "presets": [{ "name": "Modern product" }]
}
{% endschema %}`;

const liquidVariantTabs = `<div class="variant-tabs-wrapper">
  <p class="variant-label">{{ product.options.first }}</p>

  <div class="variant-tabs" role="tablist">
    {% for variant in product.variants %}
      <button
        type="button"
        role="tab"
        class="variant-tab {% if variant == product.selected_or_first_available_variant %}is-active{% endif %}"
        data-variant-id="{{ variant.id }}"
        data-price="{{ variant.price | money }}"
        data-available="{{ variant.available }}"
        aria-selected="{% if variant == product.selected_or_first_available_variant %}true{% else %}false{% endif %}"
        {% unless variant.available %}aria-disabled="true"{% endunless %}
      >
        {{ variant.title }}
      </button>
    {% endfor %}
  </div>
</div>`;

const liquidAccordion = `<div class="product-accordions">
  {% for block in section.blocks %}
    <details class="accordion-item" {% if forloop.first %}open{% endif %}>
      <summary class="accordion-header">
        <span>{{ block.settings.title }}</span>
        <span class="accordion-icon" aria-hidden="true">+</span>
      </summary>

      <div class="accordion-content">
        {% if block.type == 'specifications' %}
          <dl class="specification-grid">
            {% for spec in product.metafields.specs.rows.value %}
              <div class="specification-row">
                <dt>{{ spec.label }}</dt>
                <dd>{{ spec.value }}</dd>
              </div>
            {% endfor %}
          </dl>
        {% else %}
          {{ block.settings.content }}
        {% endif %}
      </div>
    </details>
  {% endfor %}
</div>`;

const cssTabs = `.variant-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.variant-tab {
  min-width: 110px;
  height: 48px;
  padding: 0 18px;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-line);
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  transition: background 200ms ease, color 200ms ease, border-color 200ms ease;
}

.variant-tab:hover {
  border-color: var(--color-text);
}

.variant-tab.is-active {
  background: var(--color-text);
  color: var(--color-surface);
  border-color: var(--color-text);
}

.variant-tab[aria-disabled="true"] {
  opacity: 0.4;
  cursor: not-allowed;
  text-decoration: line-through;
}`;

const jsVariants = `// assets/product-template.js
const tabs = document.querySelectorAll('.variant-tab');
const priceEl = document.getElementById('ProductPrice');
const variantInput = document.getElementById('VariantIdInput');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (tab.getAttribute('aria-disabled') === 'true') return;

    tabs.forEach((t) => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });

    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');

    variantInput.value = tab.dataset.variantId;
    priceEl.textContent = tab.dataset.price;

    // keep the URL in sync so refresh/share preserves the choice
    const url = new URL(window.location.href);
    url.searchParams.set('variant', tab.dataset.variantId);
    window.history.replaceState({}, '', url);
  });
});`;

export function ShopifyProductTemplatePost() {
  return (
    <Prose>
      <p>
        Most Shopify product pages still ship with a size dropdown and a wall of
        unstructured copy. That worked in 2015. In 2026, the brands that convert —
        Apple, Tesla, Herman Miller, the better Shopify themes — have moved to{" "}
        <strong>variant tabs</strong> and a tight{" "}
        <strong>specification accordion</strong>. This post is the architecture I use
        when I build one of those product pages on Shopify, end-to-end: Liquid, CSS,
        JavaScript, and the file structure that keeps it maintainable.
      </p>

      <h2>The architecture in one picture</h2>
      <p>
        Before any code, the structure matters. Liquid handles{" "}
        <strong>data</strong>, CSS handles <strong>design</strong>, JavaScript handles{" "}
        <strong>interaction</strong>. The single biggest mistake on beginner themes
        is one enormous Liquid file that does all three. Professional themes split
        responsibilities into three folders:
      </p>

      <ArchitectureDiagram
        title="Shopify theme — product page structure"
        blocks={[
          {
            title: "Sections",
            subtitle: "Page-level building blocks",
            items: ["main-product.liquid"],
          },
          {
            title: "Snippets",
            subtitle: "Reusable Liquid partials",
            items: [
              "product-gallery.liquid",
              "variant-tabs.liquid",
              "product-accordion.liquid",
            ],
          },
          {
            title: "Assets",
            subtitle: "Styles & behaviour",
            items: ["product-template.css", "product-template.js"],
          },
        ]}
      />

      <FileTree
        title="Recommended project structure"
        root={{
          name: "theme",
          children: [
            {
              name: "sections",
              children: [{ name: "main-product.liquid", note: "page composition" }],
            },
            {
              name: "snippets",
              children: [
                { name: "product-gallery.liquid", note: "image grid + thumbs" },
                { name: "variant-tabs.liquid", note: "size / colour tabs" },
                { name: "product-accordion.liquid", note: "spec & policy blocks" },
              ],
            },
            {
              name: "assets",
              children: [
                { name: "product-template.css" },
                { name: "product-template.js" },
              ],
            },
            { name: "templates", children: [{ name: "product.json" }] },
          ],
        }}
      />

      <h2>1. The section — main-product.liquid</h2>
      <p>
        The section file is the page composition. It loads its own assets, renders
        the snippets, and exposes a <code>{`{% schema %}`}</code> so merchants can
        add blocks from the theme editor. Note the use of <code>{`{% form 'product' %}`}</code>
        — that&apos;s the Shopify-native way to submit add-to-cart, and it preserves
        analytics, line item properties and selling-plan support out of the box.
      </p>

      <CodeBlock filename="sections/main-product.liquid" language="Liquid">
        {liquidMainProduct}
      </CodeBlock>

      <h2>2. The snippet — variant tabs</h2>
      <p>
        Variants live on <code>product.variants</code>. Each one has{" "}
        <code>id</code>, <code>title</code>, <code>price</code>,{" "}
        <code>available</code> and (when set) <code>image</code>. Looping over them
        gives you a tab per variant. The two things most tutorials skip:{" "}
        <strong>aria-selected</strong> on the active tab, and{" "}
        <strong>aria-disabled</strong> on sold-out variants. Both are non-negotiable
        for accessibility and Shopify checkout assistive tech.
      </p>

      <CodeBlock filename="snippets/variant-tabs.liquid" language="Liquid">
        {liquidVariantTabs}
      </CodeBlock>

      <h3>Styling the tabs</h3>
      <p>
        Use CSS variables tied to the theme&apos;s tokens so the tabs follow brand
        colours automatically when the merchant changes them. Keep the active state
        a flat inverted swatch — busy gradients age badly.
      </p>

      <CodeBlock filename="assets/product-template.css" language="CSS">
        {cssTabs}
      </CodeBlock>

      <h3>Wiring the tabs to the form</h3>
      <p>
        Click a tab, switch the hidden <code>id</code> input, update the visible
        price, and sync the URL so refreshing or sharing the link preserves the
        chosen variant. That last step is what most themes forget — and it&apos;s
        the difference between a polished store and a fragile one.
      </p>

      <CodeBlock filename="assets/product-template.js" language="JavaScript">
        {jsVariants}
      </CodeBlock>

      <Callout label="Production tip">
        For products with two or more option types (size <em>and</em> colour),
        render one tab group per option and resolve the matching variant in JS by
        matching all selected option values against{" "}
        <code>product.variants[i].options</code>. The same pattern scales; only the
        lookup changes.
      </Callout>

      <h2>3. The snippet — specification accordion</h2>
      <p>
        Specifications, shipping and warranty are perfect accordion content: useful
        to a buyer ready to convert, noise to a browser scanning above the fold.
        Use the native <code>&lt;details&gt;</code> /{" "}
        <code>&lt;summary&gt;</code> elements — they&apos;re keyboard-accessible by
        default and don&apos;t need a single line of JavaScript to expand and
        collapse. Drive the spec rows from a Shopify metafield so merchants can
        edit them without touching code.
      </p>

      <CodeBlock filename="snippets/product-accordion.liquid" language="Liquid">
        {liquidAccordion}
      </CodeBlock>

      <h2>Tabs vs. dropdowns — why this matters</h2>
      <p>
        The dropdown is the default because it&apos;s easy to ship, not because it
        converts. Tabs give buyers all options at a glance, larger tap targets, and
        a single click to switch — fewer steps before add-to-cart.
      </p>

      <CompareTable
        caption="Variant UX on a product page"
        headerA="Dropdown (legacy)"
        headerB="Variant tabs (modern)"
        rows={[
          {
            criterion: "Discovery",
            a: "Hidden — buyer must open the select",
            b: "All options visible at a glance",
          },
          {
            criterion: "Tap target",
            a: "Small, varies by OS",
            b: "Large, consistent across devices",
          },
          {
            criterion: "Sold-out signal",
            a: "Awkward — needs disabled options",
            b: "Strikethrough tab reads instantly",
          },
          {
            criterion: "Clicks to switch",
            a: "Two (open, choose)",
            b: "One",
          },
          {
            criterion: "Brand feel",
            a: "Generic, form-like",
            b: "Premium, controlled, on-brand",
          },
        ]}
      />

      <h2>The accordion checklist</h2>
      <p>
        Use accordions for content that&apos;s <em>useful but not urgent</em>:
      </p>
      <ul>
        <li>Specifications and materials</li>
        <li>Shipping and delivery windows</li>
        <li>Returns and warranty policy</li>
        <li>Care instructions</li>
        <li>Size guide</li>
        <li>Product-specific FAQ</li>
      </ul>
      <p>
        Open the most-requested block by default — usually specifications — so a
        buyer doesn&apos;t have to click before they get value.
      </p>

      <h2>Next-level upgrades, once the base ships</h2>
      <ul>
        <li>
          <strong>Variant image switching</strong> — listen for the tab click and
          swap <code>main-product-image</code> when the matching variant has an
          image set.
        </li>
        <li>
          <strong>Sticky add-to-cart on mobile</strong> — a thin bar that appears
          after the hero scrolls past, holding the price and the CTA.
        </li>
        <li>
          <strong>Shopify Metaobjects</strong> for richer spec content (icons,
          links, grouped categories).
        </li>
        <li>
          <strong>Color swatches</strong> rendered from{" "}
          <code>variant.metafields.colour.hex</code> instead of text tabs.
        </li>
        <li>
          <strong>Swiper / Embla</strong> for the gallery on mobile, with full
          keyboard and screen-reader support.
        </li>
      </ul>

      <h2>What to take away</h2>
      <p>
        A modern Shopify product page isn&apos;t a CSS trick — it&apos;s a
        discipline. Sections compose the page, snippets keep markup reusable, and
        assets carry styling and interaction. Variant tabs replace the dropdown.
        Native <code>&lt;details&gt;</code> drives the accordion. Metafields drive
        the spec content. Get that foundation right and every product on the store
        — current and future — inherits a premium product page for free.
      </p>
    </Prose>
  );
}
