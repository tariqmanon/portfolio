import { Prose } from "@/components/blog/prose";
import { CodeBlock } from "@/components/blog/code-block";
import { WorkflowDiagram } from "@/components/blog/workflow-diagram";
import { Callout } from "@/components/blog/callout";

const conditionLogic = `Trigger:  Order created

Condition (ANY of the following is true → treat as suspicious):
  • order.riskLevel  is  HIGH
  • order.billingAddress.countryCode  ≠  order.shippingAddress.countryCode
  • customer.numberOfOrders  is  0
    AND  order.totalPrice  is greater than  300
  • order.shippingAddress  matches an entry tagged  "blocked-address"`;

const tagTemplate = `{% comment %}
  Flow "Add order tags" action — Liquid is allowed in the tag field.
  Tag the order so staff can filter the admin and so downstream
  automations (fulfillment holds, Klaviyo) can react.
{% endcomment %}
review-fraud
{% if order.riskLevel == "HIGH" %}risk-high{% endif %}
{% if order.billingAddress.countryCode != order.shippingAddress.countryCode %}address-mismatch{% endif %}`;

const emailTemplate = `Subject: ⚠️ Order {{ order.name }} held for fraud review

Order {{ order.name }} was flagged and fulfillment is on hold.

  Customer:  {{ order.customer.displayName }} ({{ order.email }})
  Total:     {{ order.totalPrice }} {{ order.presentmentCurrencyCode }}
  Risk:      {{ order.riskLevel }}
  Billing:   {{ order.billingAddress.city }}, {{ order.billingAddress.countryCode }}
  Shipping:  {{ order.shippingAddress.city }}, {{ order.shippingAddress.countryCode }}

Review in admin, then release the hold or cancel + refund.`;

export function ShopifyFlowFraudPost() {
  return (
    <Prose>
      <p>
        Chargebacks quietly tax a growing store: you ship the goods, lose the
        product, refund the money and pay a dispute fee on top. On{" "}
        <a href="https://statesidedistribution.com" target="_blank" rel="noopener noreferrer">
          Stateside Distribution
        </a>{" "}
        I built a{" "}
        <a href="https://help.shopify.com/en/manual/shopify-flow" target="_blank" rel="noopener noreferrer">
          Shopify Flow
        </a>{" "}
        automation that catches high-risk and mismatched-address orders the moment
        they&apos;re placed and holds them for review — before anything ships. No
        app subscription, no custom code, just Shopify&apos;s native automation
        engine. Here&apos;s the exact logic.
      </p>

      <h2>Why Flow, and not a manual check</h2>
      <p>
        Manually reviewing every order doesn&apos;t scale and it&apos;s
        inconsistent — the one order that slips through at 2am is the one that
        charges back. Flow runs on <em>every</em> order, instantly, with the same
        rules every time. It&apos;s free on the Shopify and Advanced plans, it
        reads the same risk analysis Shopify already runs, and it can take
        real action: tag, hold fulfillment, notify staff, or cancel outright.
      </p>

      <WorkflowDiagram
        title="Order → assess → act"
        steps={[
          { label: "Order created", sub: "Flow trigger fires" },
          { label: "Evaluate risk", sub: "risk level + address + history" },
          { label: "Tag & hold", sub: "flag, pause fulfillment" },
          { label: "Notify staff", sub: "internal email" },
          { label: "Human decision", sub: "release or cancel" },
        ]}
      />

      <h2>1. The trigger</h2>
      <p>
        Start the workflow on <strong>Order created</strong>. It fires once per
        order, before fulfillment, which is exactly the window where blocking is
        cheap. (If you want to lean on Shopify&apos;s fraud analysis specifically,
        the <em>Order risk analyzed</em> trigger gives you the assessment result
        to branch on instead.)
      </p>

      <h2>2. The conditions — what &quot;suspicious&quot; means</h2>
      <p>
        A single signal produces too many false positives. I combine a few so the
        workflow flags orders that are genuinely worth a human&apos;s time:
      </p>

      <CodeBlock filename="Flow condition logic" language="pseudocode">
        {conditionLogic}
      </CodeBlock>

      <ul>
        <li>
          <strong>Risk level HIGH</strong> — Shopify&apos;s own fraud analysis
          already scores this; Flow just reacts to it.
        </li>
        <li>
          <strong>Billing ≠ shipping country</strong> — a classic
          stolen-card pattern worth a second look.
        </li>
        <li>
          <strong>First-time customer + high total</strong> — a large order from
          a brand-new account is a common fraud shape.
        </li>
        <li>
          <strong>Known-bad addresses</strong> — repeat offenders. Keep a list
          (a metafield or a tagged reference) so an address that charged back once
          is caught automatically next time.
        </li>
      </ul>

      <h2>3. The actions</h2>
      <p>
        When a condition matches, do three things. First, <strong>tag the
        order</strong> so it&apos;s filterable in the admin and other automations
        can key off it. Flow accepts Liquid in the tag field:
      </p>

      <CodeBlock filename="Add order tags (Liquid)" language="liquid">
        {tagTemplate}
      </CodeBlock>

      <p>
        Second, <strong>hold fulfillment</strong> so nothing can ship while the
        order is flagged. Third, <strong>send an internal email</strong> so a
        human actually looks — a flag no one sees is not a control:
      </p>

      <CodeBlock filename="Send internal email (Liquid)" language="liquid">
        {emailTemplate}
      </CodeBlock>

      <Callout label="Hold — don't auto-cancel" tone="warn">
        Resist wiring the workflow straight to <em>Cancel order</em>. Fraud
        heuristics produce false positives, and auto-cancelling a legitimate
        high-value order is its own kind of lost revenue — plus an angry
        customer. Hold and review is the safe default; reserve automatic
        cancellation for exact matches against your known-bad list.
      </Callout>

      <h2>4. Make it better over time</h2>
      <ul>
        <li>
          <strong>Feed the loop</strong> — every real chargeback should add its
          address to the blocked list, so the same actor can&apos;t repeat.
        </li>
        <li>
          <strong>Tier the response</strong> — one flagged signal → tag and
          review; two or more → hold fulfillment as well. It keeps low-risk orders
          moving.
        </li>
        <li>
          <strong>Track the false-positive rate</strong> — if staff release most
          held orders untouched, the conditions are too aggressive. Tune them.
        </li>
        <li>
          <strong>Reassure good customers</strong> — a held order can send a
          short &quot;verifying your order&quot; email so legitimate buyers
          aren&apos;t left wondering.
        </li>
      </ul>

      <h2>The result</h2>
      <p>
        The same-day fraudulent orders that used to become next-month chargebacks
        now stop at the door: flagged, held and reviewed before a box is packed.
        It runs on every order without anyone thinking about it, it cost nothing
        beyond the plan the store was already on, and it&apos;s the kind of
        margin protection that quietly compounds — which is why it shipped
        alongside the{" "}
        <a href="/blog/woocommerce-to-shopify-migration-seo-conversions">
          WooCommerce-to-Shopify migration
        </a>{" "}
        rather than as an afterthought.
      </p>
    </Prose>
  );
}