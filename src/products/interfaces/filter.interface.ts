import { ProductCatalogTypes } from '../entities/product.entity';

export interface ProductsFilter {
  query: string;
  catalogFilter: ProductCatalogTypes;
  categoriesFilter: string[];
  manufacturersFilter: string[];
  sortFilter: string;
}
