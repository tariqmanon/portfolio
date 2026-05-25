import { Prose } from "@/components/blog/prose";
import { CodeBlock } from "@/components/blog/code-block";
import { FileTree } from "@/components/blog/file-tree";
import { WorkflowDiagram } from "@/components/blog/workflow-diagram";
import { Callout } from "@/components/blog/callout";

const cliCommands = `# install the Shopify CLI once (Node 18+ required)
npm install -g @shopify/cli @shopify/theme

# log in and link your store
shopify login --store your-store.myshopify.com

# pull the live theme into a local working copy
shopify theme pull --live --path ./theme

# start a hot-reload dev server against an unpublished theme
shopify theme dev --store your-store.myshopify.com

# push a feature branch up as an unpublished staging theme
shopify theme push --unpublished --json --path ./theme

# promote a tested staging theme to live (use with care)
shopify theme publish --theme=THEME_ID`;

const gitWorkflow = `# branch off main for every change
git switch -c feat/product-variant-tabs

# work locally with hot reload
shopify theme dev

# commit small, named units of work
git add snippets/variant-tabs.liquid assets/product-template.css
git commit -m "feat(product): add variant tabs snippet and base styles"

# push and open a pull request
git push -u origin feat/product-variant-tabs
gh pr create --base main --title "Product: variant tabs + accordion"`;

const deployYaml = `# .github/workflows/deploy.yml
name: Deploy Shopify Theme

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read
  pull-requests: write

jobs:
  preview:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install Shopify CLI
        run: npm install -g @shopify/cli @shopify/theme
      - name: Push preview (unpublished) theme
        env:
          SHOPIFY_CLI_THEME_TOKEN: \${{ secrets.SHOPIFY_CLI_THEME_TOKEN }}
          SHOPIFY_FLAG_STORE: \${{ secrets.SHOPIFY_STORE }}
        run: |
          shopify theme push \\
            --unpublished \\
            --json \\
            --path ./theme \\
            --theme="pr-\${{ github.event.pull_request.number }}"

  deploy:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install Shopify CLI
        run: npm install -g @shopify/cli @shopify/theme
      - name: Push to live theme
        env:
          SHOPIFY_CLI_THEME_TOKEN: \${{ secrets.SHOPIFY_CLI_THEME_TOKEN }}
          SHOPIFY_FLAG_STORE: \${{ secrets.SHOPIFY_STORE }}
        run: |
          shopify theme push \\
            --live \\
            --allow-live \\
            --path ./theme`;

export function ShopifyCliGithubCicdPost() {
  return (
    <Prose>
      <p>
        Editing themes through Shopify&apos;s online code editor is the fastest
        way to break a store at 4pm on a Friday. There&apos;s no diff, no review,
        no rollback. The modern workflow — and the one I use across every client
        store at Tuliptech — is Shopify CLI for local dev, GitHub for version
        control, and GitHub Actions for safe, automated deploys. This post is the
        end-to-end setup, including the <code>deploy.yml</code> I actually run.
      </p>

      <h2>The full pipeline at a glance</h2>
      <p>
        Every change flows through the same six-step pipeline. Local CLI runs
        hot-reload against an unpublished theme; GitHub holds the source of
        truth; pull requests get reviewed; only a merge to <code>main</code>{" "}
        ships to live.
      </p>

      <WorkflowDiagram
        title="Branch → Review → Deploy"
        steps={[
          { label: "Local dev", sub: "shopify theme dev" },
          { label: "Feature branch", sub: "feat/*" },
          { label: "Pull request", sub: "preview theme via CI" },
          { label: "Review", sub: "diff + visual QA" },
          { label: "Merge to main", sub: "protected branch" },
          { label: "Auto deploy", sub: "shopify theme push --live" },
        ]}
      />

      <h2>1. Shopify CLI — the developer experience</h2>
      <p>
        The Shopify CLI is the official tool for working on themes outside the
        browser. It gives you a hot-reload dev server, theme push / pull, schema
        validation and the ability to spin up unpublished themes for previews. A
        handful of commands cover 90% of day-to-day work:
      </p>

      <CodeBlock filename="terminal" language="bash">
        {cliCommands}
      </CodeBlock>

      <Callout label="Auth">
        For local development use <code>shopify login</code> — it opens a browser
        and stores a session. For CI, generate a Theme Access token from the
        Shopify admin (<em>Apps → Theme access</em>) and expose it as the{" "}
        <code>SHOPIFY_CLI_THEME_TOKEN</code> environment variable. Never commit
        the token; never reuse it across stores.
      </Callout>

      <h2>2. GitHub — branching strategy that scales</h2>
      <p>
        The pattern that holds up across solo work and 5-developer teams is
        trunk-based with short-lived feature branches. <code>main</code> is
        always deployable; every change is a branch and a PR; preview themes are
        created automatically per pull request so designers can review on a real
        Shopify URL.
      </p>

      <CodeBlock filename="terminal" language="bash">
        {gitWorkflow}
      </CodeBlock>

      <FileTree
        title="Repo layout — theme + CI"
        root={{
          name: "shopify-theme-repo",
          children: [
            {
              name: ".github",
              children: [
                {
                  name: "workflows",
                  children: [
                    { name: "deploy.yml", note: "CI/CD pipeline" },
                    { name: "lint.yml", note: "shopify theme check" },
                  ],
                },
              ],
            },
            {
              name: "theme",
              children: [
                { name: "sections", note: "page-level Liquid blocks" },
                { name: "snippets", note: "reusable partials" },
                { name: "templates", note: "JSON templates" },
                { name: "assets", note: "css, js, images" },
                { name: "config", note: "settings_schema.json" },
                { name: "locales" },
              ],
            },
            { name: ".gitignore" },
            { name: "README.md" },
          ],
        }}
      />

      <h2>3. CI/CD — the GitHub Actions workflow I actually use</h2>
      <p>
        Two jobs, one file. On a <strong>pull request</strong>, push the branch
        as an unpublished preview theme so reviewers can click through it on the
        real store. On a <strong>merge to main</strong>, push to the live theme.
        Everything keyed off branch protection and secrets — no manual deploys.
      </p>

      <CodeBlock filename=".github/workflows/deploy.yml" language="YAML">
        {deployYaml}
      </CodeBlock>

      <h3>The secrets you need</h3>
      <p>
        Set these in <em>GitHub → Repo → Settings → Secrets and variables →
        Actions</em>. They&apos;re scoped to the repository and only injected
        into Actions runs, never visible in logs.
      </p>
      <ul>
        <li>
          <code>SHOPIFY_CLI_THEME_TOKEN</code> — generated from{" "}
          <em>Shopify admin → Apps → Theme access</em>.
        </li>
        <li>
          <code>SHOPIFY_STORE</code> — your store handle, e.g.{" "}
          <code>your-store.myshopify.com</code>.
        </li>
      </ul>

      <Callout label="Guardrails" tone="warn">
        Protect <code>main</code> in GitHub:{" "}
        <em>require pull requests</em>,{" "}
        <em>require status checks to pass</em> (the preview job above), and{" "}
        <em>require at least one review</em>. The CI then becomes a hard gate
        between &quot;merged&quot; and &quot;live&quot;, which is exactly what
        you want for a revenue-generating storefront.
      </Callout>

      <h2>4. Best practices that pay off in month two</h2>
      <ul>
        <li>
          <strong>Two stores</strong> — keep a long-lived staging store
          (development plan) wired to a <code>staging</code> branch with its
          own deploy job. QA there before main.
        </li>
        <li>
          <strong>Never push directly to <code>main</code></strong> — disable
          direct pushes in branch protection. Everything goes through a PR.
        </li>
        <li>
          <strong>Pin the CLI version</strong> in CI (
          <code>npm install -g @shopify/cli@3.x</code>) so a CLI release
          can&apos;t silently change deploy behaviour.
        </li>
        <li>
          <strong>Add <code>shopify theme check</code></strong> as a separate
          lint job — it catches deprecated filters, missing translations and
          performance smells before review.
        </li>
        <li>
          <strong>Tag releases</strong> — when a PR ships, tag the commit (
          <code>v2026.05.25</code>). Rolling back becomes one command.
        </li>
        <li>
          <strong>Backup before risky changes</strong> — duplicate the live
          theme from the Shopify admin before any architectural change. It costs
          nothing and saves Fridays.
        </li>
      </ul>

      <h2>The result</h2>
      <p>
        With this setup, &quot;ship a change to a Shopify store&quot; becomes:
        branch, commit, open PR, review the preview theme on a real Shopify URL,
        merge, done. No more cowboy edits in the online editor, no more
        guessing what the last deploy changed, no more &quot;who edited that
        snippet at 11pm?&quot; — the diff and the deploy log answer it for you.
      </p>
      <p>
        It&apos;s the same workflow modern engineering teams use for every other
        codebase. Shopify themes finally get to join the club.
      </p>
    </Prose>
  );
}
