import {
  reactExtension,
  Text,
  useCartLineTarget,
  useApi,
  BlockStack,
} from "@shopify/ui-extensions-react/checkout";
import { useEffect, useState } from "react";

export default reactExtension(
  "purchase.checkout.cart-line-item.render-after",
  () => <ItemMessageExtension />
);

function ItemMessageExtension() {
  const cartLine = useCartLineTarget();
  const { query } = useApi();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!cartLine) return;

    const productId = cartLine?.merchandise?.product?.id;

    async function fetchMetafield() {
      const response = await query(
        `query GetProductMetafields($ids: [ID!]!) {
          nodes(ids: $ids) {
            ... on Product {
              id
              metafields(first: 10, namespace: "custom") {
                edges {
                  node {
                    key
                    value
                  }
                }
              }
            }
          }
        }`,
        {
          variables: {
            ids: [productId],
          },
        }
      );

      const productNode = response?.data?.nodes?.[0];
      const metafieldEdge = productNode?.metafields?.edges?.find(
        (edge: any) => edge.node.key === "shipping_message"
      );

      if (metafieldEdge) {
        setMessage(metafieldEdge.node.value);
      }
    }

    fetchMetafield();
  }, [cartLine]);

  if (!message) return null;

  return (
    <BlockStack spacing="none">
      <Text size="small" appearance="subdued">
        {message}
      </Text>
    </BlockStack>
  );
}
