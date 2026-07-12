import type { ComponentType } from "react";
import { ShopifyProductTemplatePost } from "./shopify-product-template-variant-tabs-accordion";
import { ShopifyCliGithubCicdPost } from "./shopify-cli-github-cicd-pipeline";
import { WooToShopifyMigrationPost } from "./woocommerce-to-shopify-migration-seo-conversions";
import { ShopifyFlowFraudPost } from "./shopify-flow-block-fraudulent-orders";

export const postContent: Record<string, ComponentType> = {
  "shopify-product-template-variant-tabs-accordion": ShopifyProductTemplatePost,
  "shopify-cli-github-cicd-pipeline": ShopifyCliGithubCicdPost,
  "woocommerce-to-shopify-migration-seo-conversions": WooToShopifyMigrationPost,
  "shopify-flow-block-fraudulent-orders": ShopifyFlowFraudPost,
};