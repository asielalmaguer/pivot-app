import {
  reactExtension,
  Text,
  useCartLineTarget,
  useAppMetafields,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension(
  "purchase.checkout.cart-line-item.render-after",
  () => <ItemMessageExtension />
);

function ItemMessageExtension() {
  const cartLine = useCartLineTarget();

  if (!cartLine) {
    return null;
  }

  const energyRating = useAppMetafields();

  const shippingMessage = energyRating
    .filter((item) => {
      const productId = cartLine.merchandise.product.id.replace(
        "gid://shopify/Product/",
        ""
      );
      return item.metafield && item.target.id === productId;
    })
    .map((item) => item.metafield.value)[0];

  console.log("Shipping message:", shippingMessage);

  if (!shippingMessage) return null;

  return (
    <Text size="small" appearance="subdued">
      {shippingMessage}
    </Text>
  );
}
