# Checkout UI Extension

#IMPORTANT TO READ
I wasn’t able to fully complete the exercise because the product metafields aren’t directly available
through the cartLine object when using useCartLineTarget() in a checkout UI extension.

The cartLine.merchandise.product only gives you basic product info like the ID, vendor, and product type,
but it doesn’t include any metafields. This is just how Shopify handles data in checkout extensions
they don’t load everything by default to keep things fast and secure.

What I was planning to do instead was use the product ID to make a Storefront API call,
get the metafields from there, and then show the message
(from the metafield with namespace custom and key shipping_message) under the product in the checkout.

UPDATE:

Yesterday, my initial approach was to use the Storefront API to fetch the metafields based on the product ID, since useCartLineTarget() doesn’t expose product metafields directly. However, I opted for a different solution: I used useAppMetafields() to load the relevant metafields that i needed and filtered them by product ID to retrieve the appropriate value for each cart line item. While this may not be the most optimized solution in terms of data loading, it avoids additional API calls and worked effectively for this use case.

TO get that i used this configuration on my shopify.extension.toml file

[[extensions.targeting]]
module = "./src/Checkout.tsx"
target = "purchase.checkout.cart-line-item.render-after"

[[extensions.targeting.metafields]]
namespace = "custom"
key = "shipping_message"
type = "single_line_text_field"
description = "Indicate a delay on the shipping"

####################################################
Checkout UI extensions let app developers build custom functionality that merchants can install at defined targets in the checkout flow. You can learn more about checkout UI extensions in Shopify’s [developer documentation](https://shopify.dev/api/checkout-extensions/checkout).

## Prerequisites

Before you start building your extension, make sure that you’ve created a [development store](https://shopify.dev/docs/apps/tools/development-stores) with the [checkout extensibility developer preview](https://shopify.dev/docs/api/release-notes/developer-previews#previewing-new-features).

## Your new Extension

Your new extension contains the following files:

- `README.md`, the file you are reading right now.
- `shopify.extension.toml`, the configuration file for your extension. This file defines your extension’s name, where it will appear in the checkout, and other metadata.
- `src/Checkout.tsx`, the source code for your extension.
- `locales/en.default.json` and `locales/fr.json`, which contain translations used to [localized your extension](https://shopify.dev/docs/apps/checkout/best-practices/localizing-ui-extensions).

By default, your extension is configured to target the `purchase.checkout.block.render` [extension target](https://shopify.dev/docs/api/checkout-ui-extensions/extension-targets-overview). You will find the target both in your `shopify.extension.toml`, and in the source code of your extension. The default target allows the merchant to configure where in the checkout _they_ want your extension to appear. If you are building an extension that is tied to existing UI element in the checkout, such as the cart lines or shipping options, you can change the extension target so that your UI extension will render in the correct location. Check out the list of [all available extension targets](https://shopify.dev/docs/api/checkout-ui-extensions/extension-targets-overview) to get some inspiration for the kinds of content you can provide with checkout UI extensions.

To build your extension, you will need to use APIs provided by Shopify that let you render content, and to read and write data in the checkout. The following resources will help you get started with checkout extensions:

- [APIs by extension target](https://shopify.dev/docs/api/checkout-ui-extensions/targets)
- [All APIs for reading and writing checkout data](https://shopify.dev/docs/api/checkout-ui-extensions/apis)
- [Available components and their properties](https://shopify.dev/docs/api/checkout-ui-extensions/components)

## Useful Links

- [Checkout app documentation](https://shopify.dev/apps/checkout)
- [Checkout UI extension documentation](https://shopify.dev/api/checkout-extensions)
  - [Configuration](https://shopify.dev/docs/api/checkout-ui-extensions/configuration)
  - [Extension Targets](https://shopify.dev/docs/api/checkout-ui-extensions/targets)
  - [API Reference](https://shopify.dev/docs/api/checkout-ui-extensions/apis)
  - [UI Components](https://shopify.dev/docs/api/checkout-ui-extensions/components)
- [Checkout UI extension tutorials](https://shopify.dev/docs/apps/checkout)
  - [Enable extended delivery instructions](https://shopify.dev/apps/checkout/delivery-instructions)
  - [Creating a custom banner](https://shopify.dev/apps/checkout/custom-banners)
  - [Thank you and order status pages](https://shopify.dev/docs/apps/checkout/thank-you-order-status)
  - [Adding field validation](https://shopify.dev/apps/checkout/validation)
  - [Localizing an extension](https://shopify.dev/apps/checkout/localize-ui-extensions)
