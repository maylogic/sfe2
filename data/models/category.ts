import type {Maybe, SfId} from "~/data";

export interface SfCategory {
    id: SfId;
    name: string;
    slug: string;
    subcategories: Maybe<SfCategory[]>;
    parentCategoryId: Maybe<SfId>;
}
