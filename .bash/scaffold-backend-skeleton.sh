#!/usr/bin/env bash
# .bash/scaffold-backend-skeleton.sh
# Amby — Backend skeleton generator (DTOs-only architecture)

set -euo pipefail

APPLY=false
FORCE=false
UNDO=false
QUIET=false

for arg in "$@"; do
  case "$arg" in
    --apply) APPLY=true ;;
    --force) FORCE=true ;;
    --undo)  UNDO=true ;;
    --quiet) QUIET=true ;;
    *) echo "Unknown option: $arg" >&2; exit 1 ;;
  esac
done

ROOT_DIR="$(pwd)"
ARTISAN="$ROOT_DIR/artisan"
MANIFEST_DIR="$ROOT_DIR/.amby"
MANIFEST_FILE="$MANIFEST_DIR/scaffold-backend-skeleton.last"
SCRIPT_PATH="$0"

say() { $QUIET || echo -e "$*"; }
die() { echo "Error: $*" >&2; exit 1; }

ensure_root() { [[ -f "$ARTISAN" ]] || die "Run from your Laravel root (artisan not found)."; }
ensure_manifest_dir() { [[ -d "$MANIFEST_DIR" ]] || mkdir -p "$MANIFEST_DIR"; }

normalize_newlines() {
  if command -v dos2unix >/dev/null 2>&1; then dos2unix "$1" >/dev/null 2>&1 || true; fi
}

record_created() { ensure_manifest_dir; echo "$1" >> "$MANIFEST_FILE"; }

write_file() {
  local path="$1" content="$2"
  if [[ -f "$path" && $FORCE == false ]]; then
    say "  └─ SKIP (exists): $path"
    return
  fi
  if $APPLY; then
    mkdir -p "$(dirname "$path")"
    printf "%s" "$content" > "$path"
    normalize_newlines "$path"
    say "  └─ WROTE: $path"
    record_created "$path"
  else
    say "  └─ would write: $path"
  fi
}

make_exec() { $APPLY && chmod +x "$SCRIPT_PATH" || true; }

undo_last() {
  [[ -f "$MANIFEST_FILE" ]] || die "No manifest found to undo: $MANIFEST_FILE"
  say "Undoing files listed in $MANIFEST_FILE ..."
  tac "$MANIFEST_FILE" | while read -r f; do
    [[ -z "$f" || "$f" =~ ^# ]] && continue
    if [[ -f "$f" ]]; then rm -f "$f"; say "  └─ removed $f"; else say "  └─ missing $f (skipped)"; fi
  done
  rm -f "$MANIFEST_FILE"
  say "Undo complete."
  exit 0
}

preview_header() {
  $APPLY || say ">>> DRY RUN (no files written). Use --apply to write."
  $FORCE && say ">>> FORCE enabled (existing files will be overwritten)."
}

start_manifest() { ensure_manifest_dir; : > "$MANIFEST_FILE"; echo "# amby scaffold run $(date -u +'%Y-%m-%dT%H:%M:%SZ')" >> "$MANIFEST_FILE"; }

$UNDO && undo_last
ensure_root
preview_header
make_exec
$APPLY && start_manifest

# ----------------------------
# Content Templates (safe heredocs)
# ----------------------------
DTO_ProductVariationData=$(cat <<'PHP'
<?php

namespace App\Domain\Product\DTO;

use Spatie\LaravelData\Attributes\Validation\ArrayType;
use Spatie\LaravelData\Data;

class ProductVariationData extends Data
{
    public function __construct(
        public ?int $id,
        public string $sku,
        public float $price,
        public ?float $quantity,
        public ?string $quantity_unit,
        public bool $is_active = true,
        #[ArrayType]
        public ?array $attributes = null,
    ) {}

    public static function rules(): array
    {
        return [
            'id'             => ['nullable','integer'],
            'sku'            => ['required','string','max:255'],
            'price'          => ['required','numeric','min:0'],
            'quantity'       => ['nullable','numeric','min:0'],
            'quantity_unit'  => ['nullable','string','max:32'],
            'is_active'      => ['boolean'],
            'attributes'     => ['nullable','array'],
        ];
    }
}
PHP
)

DTO_ProductData=$(cat <<'PHP'
<?php

namespace App\Domain\Product\DTO;

use Spatie\LaravelData\Attributes\Validation\ArrayType;
use Spatie\LaravelData\Attributes\Validation\Exists;
use Spatie\LaravelData\Data;

class ProductData extends Data
{
    public function __construct(
        public ?int $id,
        #[Exists('categories','id')]
        public ?int $category_id,
        public string $name,
        public string $slug,
        public ?string $description,
        public ?string $image,
        public string $status = 'active',
        /** @var int[]|null */
        #[ArrayType]
        public ?array $tag_ids,
        /** @var ProductVariationData[] */
        public array $variations = [],
    ) {}

    public static function rules(): array
    {
        return [
            'id'          => ['nullable','integer'],
            'category_id' => ['nullable','integer','exists:categories,id'],
            'name'        => ['required','string','max:255'],
            'slug'        => ['required','string','max:255'],
            'description' => ['nullable','string'],
            'image'       => ['nullable','string'],
            'status'      => ['required','in:active,inactive'],
            'tag_ids'     => ['nullable','array'],
            'tag_ids.*'   => ['integer','exists:tags,id'],
            'variations'  => ['required','array','min:1'],
        ];
    }
}
PHP
)

DTO_ProductFilter=$(cat <<'PHP'
<?php

namespace App\Domain\Product\DTO;

/**
 * Read-side filter for listing products.
 */
class ProductFilter
{
    /**
     * @param string[]|null $tags  Tag slugs
     */
    public function __construct(
        public ?int $category_id = null,
        public ?array $tags = null,
        public ?float $price_min = null,
        public ?float $price_max = null,
        public ?string $status = 'active', // null = any
        public ?string $search = null,
        public ?bool $admin = false,
    ) {}
}
PHP
)

DTO_ProductSummaryData=$(cat <<'PHP'
<?php

namespace App\Domain\Product\DTO;

use App\Models\Product;
use Spatie\LaravelData\Data;

class ProductSummaryData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        public ?string $image,
        public float $average_rating,
        public int $reviews_count,
        public ?float $min_price,
    ) {}

    public static function fromModel(Product $p): self
    {
        $minPrice = null;
        $p->loadMissing('variations');
        foreach ($p->variations ?? [] as $v) {
            $price = (float)$v->price;
            $minPrice = $minPrice === null ? $price : min($minPrice, $price);
        }

        return new self(
            id: $p->id,
            name: $p->name,
            slug: $p->slug,
            image: $p->image,
            average_rating: (float)($p->average_rating ?? 0),
            reviews_count: (int)($p->reviews_count ?? 0),
            min_weighted_price: null,
            min_price: $minPrice,
        );
    }
}
PHP
)

DTO_ProductViewData=$(cat <<'PHP'
<?php

namespace App\Domain\Product\DTO;

use App\Models\Product;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\DataCollection;

class ProductViewData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $slug,
        public ?string $description,
        public ?string $image,
        public string $status,
        public ?array $category,
        /** @var array<int,array{id:int,name:string,slug:string}> */
        public array $tags,
        public int $reviews_count,
        public float $average_rating,
        #[DataCollectionOf(ProductVariationRow::class)]
        public DataCollection $variations
    ) {}

    public static function fromModel(Product $p): self
    {
        $p->loadMissing(['category','tags','variations.activeBatch']);

        $category = $p->category?->only(['id','name','slug']);
        $tags = array_values($p->tags?->map(fn($t) => $t->only(['id','name','slug']))->toArray() ?? []);

        $variations = ProductVariationRow::collection(
            collect($p->variations ?? [])->map(fn($v) => ProductVariationRow::fromModel($v))->toArray()
        );

        return new self(
            id: $p->id,
            name: $p->name,
            slug: $p->slug,
            description: $p->description,
            image: $p->image,
            status: $p->status,
            category: $category ?? null,
            tags: $tags,
            reviews_count: (int)($p->reviews_count ?? 0),
            average_rating: (float)($p->average_rating ?? 0),
            variations: $variations
        );
    }
}

/**
 * Lightweight read-model for a variation row.
 */
class ProductVariationRow extends Data
{
    public function __construct(
        public int $id,
        public string $sku,
        public float $price,
        public ?float $quantity,
        public ?string $quantity_unit,
        public bool $is_active,
        public ?array $activeBatch,
    ) {}

    public static function fromModel($v): self
    {
        $batch = $v->activeBatch
            ? [
                'id' => $v->activeBatch->id,
                'is_open' => (bool)$v->activeBatch->is_open,
                'stock' => (int)$v->activeBatch->stock,
                'sold' => (int)$v->activeBatch->sold,
                'notes' => $v->activeBatch->notes,
                'created_at' => optional($v->activeBatch->created_at)?->toISOString(),
                'updated_at' => optional($v->activeBatch->updated_at)?->toISOString(),
            ]
            : null;

        return new self(
            id: $v->id,
            sku: $v->sku,
            price: (float)$v->price,
            quantity: $v->quantity !== null ? (float)$v->quantity : null,
            quantity_unit: $v->quantity_unit,
            is_active: (bool)$v->is_active,
            activeBatch: $batch,
        );
    }
}
PHP
)

DTO_PageData=$(cat <<'PHP'
<?php

namespace App\Domain\Common\DTO;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Spatie\LaravelData\Data;

class PageData extends Data
{
    /**
     * @param array<int,Data> $data
     * @param array<string,mixed> $links
     * @param array<string,mixed> $meta
     */
    public function __construct(
        public array $data,
        public array $links,
        public array $meta,
    ) {}

    public static function fromPaginator(LengthAwarePaginator $p, string $itemDataClass): self
    {
        $items = [];
        foreach ($p->getCollection() as $m) {
            /** @var \Spatie\LaravelData\Data $dto */
            $dto = $itemDataClass::from($m);
            $items[] = $dto;
        }

        return new self(
            data: $items,
            links: [
                'first' => $p->url(1),
                'last'  => $p->url($p->lastPage()),
                'prev'  => $p->previousPageUrl(),
                'next'  => $p->nextPageUrl(),
            ],
            meta: [
                'current_page' => $p->currentPage(),
                'from'         => $p->firstItem(),
                'last_page'    => $p->lastPage(),
                'links'        => $p->linkCollection()->toArray(),
                'path'         => $p->path(),
                'per_page'     => $p->perPage(),
                'to'           => $p->lastItem(),
                'total'        => $p->total(),
            ],
        );
    }
}
PHP
)

CONTRACT_ProductRepository=$(cat <<'PHP'
<?php

namespace App\Domain\Product\Contracts;

use App\Domain\Product\DTO\ProductData;
use App\Domain\Product\DTO\ProductFilter;
use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface ProductRepository
{
    public function getById(int $id, bool $admin = false): ?Product;
    public function getBySlug(string $slug, bool $admin = false): ?Product;
    public function list(ProductFilter $filter, int $perPage = 15): LengthAwarePaginator;
    public function create(ProductData $data): Product;
    public function update(Product $product, ProductData $data): Product;
    public function delete(Product $product): bool;
}
PHP
)

REPO_EloquentProductRepository=$(cat <<'PHP'
<?php

namespace App\Domain\Product\Repositories;

use App\Domain\Product\Contracts\ProductRepository;
use App\Domain\Product\DTO\ProductData;
use App\Domain\Product\DTO\ProductFilter;
use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class EloquentProductRepository implements ProductRepository
{
    private function baseQuery(bool $admin): Builder
    {
        $q = Product::query()->with(['category','tags','variations.activeBatch']);
        if (!$admin) $q->where('status','active');
        return $q;
    }

    public function getById(int $id, bool $admin = false): ?Product
    {
        return $this->baseQuery($admin)->find($id);
    }

    public function getBySlug(string $slug, bool $admin = false): ?Product
    {
        return $this->baseQuery($admin)->where('slug',$slug)->first();
    }

    public function list(ProductFilter $f, int $perPage = 15): LengthAwarePaginator
    {
        $q = $this->baseQuery((bool)$f->admin);

        if ($f->status) $q->where('status', $f->status);
        if ($f->category_id) $q->where('category_id', $f->category_id);
        if (!empty($f->tags)) {
            $tags = $f->tags;
            $q->whereHas('tags', fn(Builder $t) => $t->whereIn('slug', $tags));
        }
        if ($f->price_min !== null || $f->price_max !== null) {
            $q->whereHas('variations', function (Builder $v) use ($f) {
                if ($f->price_min !== null) $v->where('price','>=',$f->price_min);
                if ($f->price_max !== null) $v->where('price','<=',$f->price_max);
            });
        }
        if ($f->search) {
            $s = '%'.mb_strtolower($f->search).'%';
            $q->where(fn(Builder $qq) => $qq
                ->whereRaw('LOWER(name) like ?', [$s])
                ->orWhereRaw('LOWER(description) like ?', [$s])
            );
        }

        return $q->paginate($perPage);
    }

    public function create(ProductData $data): Product
    {
        return DB::transaction(function () use ($data) {
            $product = Product::create([
                'category_id' => $data->category_id ?? 1,
                'name'        => $data->name,
                'slug'        => $data->slug,
                'description' => $data->description,
                'image'       => $data->image,
                'status'      => $data->status,
            ]);

            if ($data->tag_ids) $product->tags()->sync($data->tag_ids);

            foreach ($data->variations as $v) {
                $pv = $product->variations()->create([
                    'sku'           => $v->sku,
                    'price'         => $v->price,
                    'quantity'      => $v->quantity,
                    'quantity_unit' => $v->quantity_unit,
                    'is_active'     => $v->is_active,
                    'attributes'    => $v->attributes,
                ]);
                $pv->activeBatch()->create([
                    'is_open' => true,
                    'stock'   => (int)($v->quantity ?? 0),
                    'sold'    => 0,
                ]);
            }

            return $product->load(['category','tags','variations.activeBatch']);
        });
    }

    public function update(Product $product, ProductData $data): Product
    {
        return DB::transaction(function () use ($product, $data) {
            $product->fill([
                'category_id' => $data->category_id ?? $product->category_id,
                'name'        => $data->name,
                'slug'        => $data->slug,
                'description' => $data->description,
                'image'       => $data->image ?? $product->image,
                'status'      => $data->status,
            ])->save();

            if ($data->tag_ids !== null) {
                $product->tags()->sync($data->tag_ids);
            }

            $kept = [];
            foreach ($data->variations as $v) {
                if ($v->id) {
                    $pv = $product->variations()->findOrFail($v->id);
                    $pv->fill([
                        'sku'           => $v->sku,
                        'price'         => $v->price,
                        'quantity'      => $v->quantity,
                        'quantity_unit' => $v->quantity_unit,
                        'is_active'     => $v->is_active,
                        'attributes'    => $v->attributes,
                    ])->save();
                    $kept[] = $pv->id;
                } else {
                    $pv = $product->variations()->create([
                        'sku'           => $v->sku,
                        'price'         => $v->price,
                        'quantity'      => $v->quantity,
                        'quantity_unit' => $v->quantity_unit,
                        'is_active'     => $v->is_active,
                        'attributes'    => $v->attributes,
                    ]);
                    $kept[] = $pv->id;
                }
            }
            if (!empty($kept)) {
                $product->variations()->whereNotIn('id', $kept)->delete();
            }

            return $product->load(['category','tags','variations.activeBatch']);
        });
    }

    public function delete(Product $product): bool
    {
        return (bool) $product->delete();
    }
}
PHP
)

USECASE_CreateProduct=$(cat <<'PHP'
<?php

namespace App\Domain\Product\UseCases;

use App\Domain\Product\Contracts\ProductRepository;
use App\Domain\Product\DTO\ProductData;
use App\Domain\Product\DTO\ProductViewData;

class CreateProduct
{
    public function __construct(private readonly ProductRepository $repo) {}

    public function __invoke(ProductData $data): ProductViewData
    {
        $model = $this->repo->create($data);
        return ProductViewData::from($model);
    }
}
PHP
)

USECASE_UpdateProduct=$(cat <<'PHP'
<?php

namespace App\Domain\Product\UseCases;

use App\Domain\Product\Contracts\ProductRepository;
use App\Domain\Product\DTO\ProductData;
use App\Domain\Product\DTO\ProductViewData;
use App\Models\Product;

class UpdateProduct
{
    public function __construct(private readonly ProductRepository $repo) {}

    public function __invoke(Product $product, ProductData $data): ProductViewData
    {
        $model = $this->repo->update($product, $data);
        return ProductViewData::from($model);
    }
}
PHP
)

USECASE_DeleteProduct=$(cat <<'PHP'
<?php

namespace App\Domain\Product\UseCases;

use App\Domain\Product\Contracts\ProductRepository;
use App\Models\Product;

class DeleteProduct
{
    public function __construct(private readonly ProductRepository $repo) {}

    public function __invoke(Product $product): bool
    {
        return $this->repo->delete($product);
    }
}
PHP
)

USECASE_GetProduct=$(cat <<'PHP'
<?php

namespace App\Domain\Product\UseCases;

use App\Domain\Product\Contracts\ProductRepository;
use App\Domain\Product\DTO\ProductViewData;

class GetProduct
{
    public function __construct(private readonly ProductRepository $repo) {}

    public function __invoke(string|int $slugOrId, bool $admin = false): ?ProductViewData
    {
        $model = is_numeric($slugOrId)
            ? $this->repo->getById((int)$slugOrId, $admin)
            : $this->repo->getBySlug((string)$slugOrId, $admin);

        return $model ? ProductViewData::from($model) : null;
    }
}
PHP
)

USECASE_ListProducts=$(cat <<'PHP'
<?php

namespace App\Domain\Product\UseCases;

use App\Domain\Common\DTO\PageData;
use App\Domain\Product\DTO\ProductFilter;
use App\Domain\Product\DTO\ProductSummaryData;
use App\Domain\Product\Contracts\ProductRepository;

class ListProducts
{
    public function __construct(private readonly ProductRepository $repo) {}

    public function __invoke(ProductFilter $filter, int $perPage = 15): PageData
    {
        $page = $this->repo->list($filter, $perPage);
        return PageData::fromPaginator($page, ProductSummaryData::class);
    }
}
PHP
)

FACTORY_ProductDataFactory=$(cat <<'PHP'
<?php

namespace App\Application\Product;

use App\Domain\Product\DTO\ProductData;
use App\Domain\Product\DTO\ProductVariationData;

class ProductDataFactory
{
    /**
     * @param array<string,mixed> $validated
     */
    public function fromValidated(array $validated): ProductData
    {
        $variations = array_map(
            fn(array $row) => ProductVariationData::from($row),
            $validated['variations'] ?? []
        );

        return ProductData::from([
            'id'          => $validated['id'] ?? null,
            'category_id' => $validated['category_id'] ?? null,
            'name'        => $validated['name'],
            'slug'        => $validated['slug'],
            'description' => $validated['description'] ?? null,
            'image'       => $validated['image'] ?? null,
            'status'      => $validated['status'] ?? 'active',
            'tag_ids'     => $validated['tag_ids'] ?? null,
            'variations'  => $variations,
        ]);
    }
}
PHP
)

PROVIDER_DomainServiceProvider=$(cat <<'PHP'
<?php

namespace App\Application\Providers;

use App\Domain\Product\Contracts\ProductRepository;
use App\Domain\Product\Repositories\EloquentProductRepository;
use Illuminate\Support\ServiceProvider;

class DomainServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(ProductRepository::class, EloquentProductRepository::class);
    }

    public function boot(): void
    {
        // Remember to add this provider to config/app.php:
        // App\Application\Providers\DomainServiceProvider::class,
    }
}
PHP
)

# ----------------------------
# Write Files
# ----------------------------
say "Scaffolding backend skeleton (DTOs only)..."

write_file "$ROOT_DIR/app/Domain/Product/DTO/ProductVariationData.php" "$DTO_ProductVariationData"
write_file "$ROOT_DIR/app/Domain/Product/DTO/ProductData.php" "$DTO_ProductData"
write_file "$ROOT_DIR/app/Domain/Product/DTO/ProductFilter.php" "$DTO_ProductFilter"
write_file "$ROOT_DIR/app/Domain/Product/DTO/ProductSummaryData.php" "$DTO_ProductSummaryData"
write_file "$ROOT_DIR/app/Domain/Product/DTO/ProductViewData.php" "$DTO_ProductViewData"
write_file "$ROOT_DIR/app/Domain/Common/DTO/PageData.php" "$DTO_PageData"

write_file "$ROOT_DIR/app/Domain/Product/Contracts/ProductRepository.php" "$CONTRACT_ProductRepository"
write_file "$ROOT_DIR/app/Domain/Product/Repositories/EloquentProductRepository.php" "$REPO_EloquentProductRepository"

write_file "$ROOT_DIR/app/Domain/Product/UseCases/CreateProduct.php" "$USECASE_CreateProduct"
write_file "$ROOT_DIR/app/Domain/Product/UseCases/UpdateProduct.php" "$USECASE_UpdateProduct"
write_file "$ROOT_DIR/app/Domain/Product/UseCases/DeleteProduct.php" "$USECASE_DeleteProduct"
write_file "$ROOT_DIR/app/Domain/Product/UseCases/GetProduct.php" "$USECASE_GetProduct"
write_file "$ROOT_DIR/app/Domain/Product/UseCases/ListProducts.php" "$USECASE_ListProducts"

write_file "$ROOT_DIR/app/Application/Product/ProductDataFactory.php" "$FACTORY_ProductDataFactory"
write_file "$ROOT_DIR/app/Application/Providers/DomainServiceProvider.php" "$PROVIDER_DomainServiceProvider"

say ""
say "Done."
$APPLY || say "No files were written (dry-run). Re-run with --apply to generate."
$APPLY && say "Manifest saved: $MANIFEST_FILE"
$APPLY && say "Next: add provider to config/app.php (see comment in DomainServiceProvider)."
