import { Injectable } from '@nestjs/common';
import { CatalogReadProductResponse, ProductsResponseVariant, Variant, Listing, GetProductResponse } from '../model/exported-product';

@Injectable()
export class ExportedProductsService {
    private readonly FT = 'FT';

    toGetProductsResponse(
        catalogReadProducts: CatalogReadProductResponse[],
        sellerId: number,
        stockStatus: string,
        lowStockQuantity: number,
    ): GetProductResponse[] {
        return catalogReadProducts.map((product) => {
            const contentId = parseInt(product.id, 10);

            const firstMedia = product.content?.medias?.reduce((prev, curr) =>
                prev.order < curr.order ? prev : curr,
            );

            const listing = product.listings.find(
                (l) =>
                    l.sellerId === sellerId && l.fulfilmentType === this.FT,
            );

            const compositionAttribute = product.content.attributes.find(
                (a) => a.name === 'Material Composition',
            );

            const colorAttribute = product.content.attributes.find(
                (a) => a.name === 'Web Color',
            );

            const variants = product.content.variants
                .map((variant) => {
                    const listingByBarcode = product.listings.find(
                        (l) =>
                            l.sellerId === sellerId &&
                            l.fulfilmentType === this.FT &&
                            l.variantId === variant.id,
                    );

                    if (listingByBarcode) {
                        const stocksByListingId = Object.values(product.stocks).filter(
                            (stock) => stock.listingId === listingByBarcode.id,
                        );

                        const availableQuantity = stocksByListingId.reduce(
                            (sum, stock) => sum + stock.availableQuantity,
                            0,
                        );

                        return this.toProductsResponseVariant(
                            variant,
                            listingByBarcode,
                            availableQuantity,
                        );
                    }
                })
                .filter((v) =>
                    this.isStockValid(v, stockStatus, lowStockQuantity),
                );
            return {
                id: contentId,
                name: product.content.name,
                media: firstMedia ? firstMedia.url : '',
                attributes: {
                    gtip: listing?.hsCode ?? '',
                    color: colorAttribute?.valueName ?? '',
                },
                compositionDetails: this.compositionToMap(
                    compositionAttribute?.valueName ?? '',
                ),
                variants,
            };
        });
    }

    private toProductsResponseVariant(
        variant: Variant,
        listing: Listing,
        availableStock: number,
    ): ProductsResponseVariant {

        const sizeAttribute = variant.attributes.find(
            (attr) => attr.type === 'Size',
        );

        return {
            barcode: variant.barcode,
            sellerBarcode: listing?.sellerBarcode ?? '',
            sellerBarcodeLabeling: listing?.sellerBarcodeLabeling,
            attributes: {
                gtip: listing?.hsCode ?? '',
                origin: listing?.origin,
                size: sizeAttribute?.valueName ?? '',
            },
            rrpPrice: {
                price: listing?.price?.rrp ?? 0,
                currency: listing?.price?.currency,
            },
            buyingPrice: {
                price: listing?.price?.buyingPrice ?? 0,
                currency: listing?.price?.currency,
            },
            stock: availableStock,
            isSaleableOnGP: listing?.isSaleableOnGP,
            gpBlocks: listing?.gpBlocks ?? []
        };
    }

    private isStockValid(
        item: ProductsResponseVariant,
        stockStatus: string,
        lowStockQuantity: number,
    ): boolean {
        switch (stockStatus) {
            case 'NO_STOCK':
                return item.stock <= 0;
            case 'LOW_STOCK':
                return item.stock <= lowStockQuantity;
            default:
                return true;
        }
    }

    private compositionToMap(composition: string): Record<string, number> {
        const compositionValues: Record<string, number> = {};
        let matches = composition.match(/%(\d+)\s([a-zA-ZçÇşŞğĞüÜöÖıİ/]+)/g);

        if (matches) {
            matches.forEach((match) => {
                const percentageMatch = match.match(/%(\d+)/);
                const materialMatch = match.match(/\s([a-zA-ZçÇşŞğĞüÜöÖıİ/]+)$/);

                if (percentageMatch && materialMatch) {
                    const percentage = parseInt(percentageMatch[1], 10);
                    const material = materialMatch[1].trim();

                    compositionValues[material] = percentage;
                }
            });
        }

        return compositionValues;
    }
}