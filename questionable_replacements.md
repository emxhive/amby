# Questionable Route Replacements

During the replacement of string routes with route variables from routes.ts, the following replacements might need review:

1. In Header component (`layouts/components/shop/header.tsx`):
   - Replaced `'shop.home'` with `routes.main.home` - This assumes the shop home route is the same as the main home route
   - Replaced `'shop.search'` with `routes.shop.products.index` - This assumes the search functionality is part of the products index page

2. In AmbyFinds component (`components/shop/amby-finds.tsx`):
   - Added arbitrary IDs to the product chips since they didn't have IDs before
   - These IDs are needed for the product detail links to work properly

3. In all components:
   - Added links to product detail pages using `routes.shop.products.show` - This assumes the product detail page uses this route
   - Added category filter links using `routes.shop.products.index` with a category parameter - This assumes the products index page supports filtering by category
