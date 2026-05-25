import type { ComponentType } from "react";
import { ShopifyProductTemplatePost } from "./shopify-product-template-variant-tabs-accordion";
import { ShopifyCliGithubCicdPost } from "./shopify-cli-github-cicd-pipeline";

export const postContent: Record<string, ComponentType> = {
  "shopify-product-template-variant-tabs-accordion": ShopifyProductTemplatePost,
  "shopify-cli-github-cicd-pipeline": ShopifyCliGithubCicdPost,
};
