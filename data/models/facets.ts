import type {Maybe} from "~/data";

export enum SfFacetTypes {
    MULTI_SELECT = "MULTI_SELECT",
    SINGLE_SELECT = "SINGLE_SELECT",
}

export type SfFacetType = `${SfFacetTypes}`;

export interface SfFacetItem {
    label: string;
    value: string;
    productCount: Maybe<number>;
}

export interface SfFacet {
    label: string;
    name: string;
    values: SfFacetItem[];
    type: Maybe<SfFacetType | (string & Record<never, never>)>;
}
