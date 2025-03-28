/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: { input: any; output: any; }
};

export type Base = {
  __typename?: 'Base';
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  text_areas?: Maybe<Array<BaseTextArea>>;
};

export type BaseTextArea = {
  __typename?: 'BaseTextArea';
  first_line: Scalars['Int']['output'];
  height: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  inherit_color: Scalars['Boolean']['output'];
  left: Scalars['Float']['output'];
  lines: Scalars['Int']['output'];
  text_color?: Maybe<Scalars['String']['output']>;
  top: Scalars['Float']['output'];
  width: Scalars['Float']['output'];
};

export type Cart = {
  __typename?: 'Cart';
  billing_address?: Maybe<CustomerAddress>;
  coupons?: Maybe<Array<Coupon>>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<CartItem>>;
  shipping_address?: Maybe<CustomerAddress>;
  shipping_method?: Maybe<ShippingMethod>;
  totals: Totals;
};

export type CartItem = {
  __typename?: 'CartItem';
  color?: Maybe<Color>;
  color_id?: Maybe<Scalars['Int']['output']>;
  design?: Maybe<Design>;
  design_id?: Maybe<Scalars['Int']['output']>;
  font?: Maybe<Font>;
  font_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  option_items?: Maybe<Array<ProductOptionItem>>;
  product: Product;
  product_id: Scalars['Int']['output'];
  product_size?: Maybe<ProductSize>;
  quantity: Scalars['Int']['output'];
  text_lines?: Maybe<Array<CartItemTextLine>>;
};

export type CartItemTextLine = {
  __typename?: 'CartItemTextLine';
  definition: ProductLineDefinition;
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type Color = {
  __typename?: 'Color';
  hex: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
};

export type Coupon = {
  __typename?: 'Coupon';
  code: Scalars['String']['output'];
  discount_percentage: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
};

export type CustomerAddress = {
  __typename?: 'CustomerAddress';
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  postal_code?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  type: CustomerAddressType;
};

export enum CustomerAddressType {
  Billing = 'BILLING',
  Shipping = 'SHIPPING',
  Universal = 'UNIVERSAL'
}

export type Design = {
  __typename?: 'Design';
  bases: Array<Base>;
  colors?: Maybe<Array<Color>>;
  fonts?: Maybe<Array<Font>>;
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
};

export type Font = {
  __typename?: 'Font';
  filename_otf?: Maybe<Scalars['String']['output']>;
  filename_ttf?: Maybe<Scalars['String']['output']>;
  filename_woff2: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  loginCustomer: User;
  registerCustomer?: Maybe<User>;
};


export type MutationLoginCustomerArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterCustomerArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  password_confirmation: Scalars['String']['input'];
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String']['input'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int']['output'];
  /** Index of the current page. */
  currentPage: Scalars['Int']['output'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']['output']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean']['output'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']['output']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int']['output'];
  /** Number of items per page. */
  perPage: Scalars['Int']['output'];
  /** Number of total available items. */
  total: Scalars['Int']['output'];
};

export type Price = {
  __typename?: 'Price';
  discounted: Scalars['Int']['output'];
  is_discounted: Scalars['Boolean']['output'];
  regular: Scalars['Int']['output'];
};

export type Product = {
  __typename?: 'Product';
  description: Scalars['String']['output'];
  designs?: Maybe<Array<Design>>;
  gallery?: Maybe<Array<ProductGalleryItem>>;
  id: Scalars['ID']['output'];
  line_definitions?: Maybe<Array<ProductLineDefinition>>;
  name: Scalars['String']['output'];
  options?: Maybe<Array<ProductOption>>;
  price: Price;
  primary_image?: Maybe<ProductGalleryItem>;
  reverse_side_base?: Maybe<Base>;
  sizes?: Maybe<Array<ProductSize>>;
  sku: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type ProductGalleryItem = {
  __typename?: 'ProductGalleryItem';
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_video: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
};

export type ProductLineDefinition = {
  __typename?: 'ProductLineDefinition';
  label: Scalars['String']['output'];
  max_length: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
};

export type ProductOption = {
  __typename?: 'ProductOption';
  id: Scalars['ID']['output'];
  items: Array<ProductOptionItem>;
  label: Scalars['String']['output'];
};

export type ProductOptionItem = {
  __typename?: 'ProductOptionItem';
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  price: Price;
};

/** A paginated list of Product items. */
export type ProductPaginator = {
  __typename?: 'ProductPaginator';
  /** A list of Product items. */
  data: Array<Product>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type ProductSize = {
  __typename?: 'ProductSize';
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  price: Price;
  product_id: Scalars['ID']['output'];
  thickness: Scalars['Int']['output'];
  width: Scalars['Int']['output'];
};

/** Indicates what fields are available at the top level of a query operation. */
export type Query = {
  __typename?: 'Query';
  getCart: Cart;
  getProductBySlug: Product;
  productSlugs?: Maybe<Array<Scalars['String']['output']>>;
  products: ProductPaginator;
  /** Find a single user by an identifying attribute. */
  user?: Maybe<User>;
  /** List multiple users. */
  users: UserPaginator;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryGetProductBySlugArgs = {
  slug: Scalars['String']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryProductsArgs = {
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryUsersArgs = {
  first?: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type ShippingMethod = {
  __typename?: 'ShippingMethod';
  description?: Maybe<Scalars['String']['output']>;
  estimated_delivery?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Price;
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

export type Totals = {
  __typename?: 'Totals';
  grand_total: Price;
  subtotal: Scalars['Int']['output'];
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

/** Account of a person who utilizes this application. */
export type User = {
  __typename?: 'User';
  /** When the account was created. */
  created_at: Scalars['DateTime']['output'];
  /** Unique email address. */
  email: Scalars['String']['output'];
  /** When the email was verified. */
  email_verified_at?: Maybe<Scalars['DateTime']['output']>;
  /** Unique primary key. */
  id: Scalars['ID']['output'];
  /** Non-unique name. */
  name: Scalars['String']['output'];
  role: UserRole;
  /** When the account was last updated. */
  updated_at: Scalars['DateTime']['output'];
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export enum UserRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Manager = 'MANAGER'
}

export type CustomerDataFragment = { __typename?: 'User', id: string, email: string, name: string } & { ' $fragmentName'?: 'CustomerDataFragment' };

export type ProductMiniFragment = { __typename?: 'Product', id: string, name: string, slug: string, price: { __typename?: 'Price', regular: number, is_discounted: boolean, discounted: number }, gallery?: Array<{ __typename?: 'ProductGalleryItem', filename: string, is_video: boolean }> | null } & { ' $fragmentName'?: 'ProductMiniFragment' };

export type SidebarCartItemFragment = { __typename?: 'CartItem', id: string, quantity: number, product: { __typename?: 'Product', slug: string, name: string, sku: string, price: { __typename?: 'Price', regular: number, is_discounted: boolean, discounted: number } } } & { ' $fragmentName'?: 'SidebarCartItemFragment' };

export type TotalsFragment = { __typename?: 'Totals', subtotal: number, grand_total: { __typename?: 'Price', regular: number, is_discounted: boolean, discounted: number } } & { ' $fragmentName'?: 'TotalsFragment' };

export type SidebarCartFragment = { __typename?: 'Cart', id: string, items?: Array<(
    { __typename?: 'CartItem' }
    & { ' $fragmentRefs'?: { 'SidebarCartItemFragment': SidebarCartItemFragment } }
  )> | null, coupons?: Array<{ __typename?: 'Coupon', code: string, discount_percentage: number }> | null, shipping_method?: { __typename?: 'ShippingMethod', name: string, estimated_delivery?: string | null, description?: string | null, price: { __typename?: 'Price', regular: number, is_discounted: boolean, discounted: number } } | null, totals: (
    { __typename?: 'Totals' }
    & { ' $fragmentRefs'?: { 'TotalsFragment': TotalsFragment } }
  ) } & { ' $fragmentName'?: 'SidebarCartFragment' };

export type RegisterCustomerMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  name: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
}>;


export type RegisterCustomerMutation = { __typename?: 'Mutation', registerCustomer?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'CustomerDataFragment': CustomerDataFragment } }
  ) | null };

export type LoginCustomerMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginCustomerMutation = { __typename?: 'Mutation', loginCustomer: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'CustomerDataFragment': CustomerDataFragment } }
  ) };

export type ProductBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProductBySlugQuery = { __typename?: 'Query', getProductBySlug: { __typename?: 'Product', id: string, slug: string, sku: string, name: string, description: string, price: { __typename?: 'Price', regular: number, is_discounted: boolean, discounted: number }, line_definitions?: Array<{ __typename?: 'ProductLineDefinition', label: string, max_length: number, required: boolean }> | null, designs?: Array<{ __typename?: 'Design', id: string, label: string, colors?: Array<{ __typename?: 'Color', id: string, label: string, hex: string }> | null, fonts?: Array<{ __typename?: 'Font', id: string, label: string, name: string, filename_woff2: string }> | null, bases: Array<{ __typename?: 'Base', id: string, label: string, filename: string, text_areas?: Array<{ __typename?: 'BaseTextArea', id: string, width: number, height: number, left: number, top: number, first_line: number, lines: number, text_color?: string | null, inherit_color: boolean }> | null }> }> | null, options?: Array<{ __typename?: 'ProductOption', id: string, label: string, items: Array<{ __typename?: 'ProductOptionItem', id: string, label: string, price: { __typename?: 'Price', regular: number, is_discounted: boolean, discounted: number } }> }> | null, sizes?: Array<{ __typename?: 'ProductSize', id: string, label: string, width: number, height: number, thickness: number, price: { __typename?: 'Price', regular: number, is_discounted: boolean, discounted: number } }> | null, gallery?: Array<{ __typename?: 'ProductGalleryItem', id: string, label: string, is_video: boolean, filename: string }> | null, reverse_side_base?: { __typename?: 'Base', id: string, label: string, filename: string, text_areas?: Array<{ __typename?: 'BaseTextArea', id: string, width: number, height: number, left: number, top: number, first_line: number, lines: number, text_color?: string | null, inherit_color: boolean }> | null } | null, primary_image?: { __typename?: 'ProductGalleryItem', id: string, label: string, is_video: boolean, filename: string } | null } };

export type ProductSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductSlugsQuery = { __typename?: 'Query', productSlugs?: Array<string> | null };

export const CustomerDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomerData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<CustomerDataFragment, unknown>;
export const ProductMiniFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductMini"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"regular"}},{"kind":"Field","name":{"kind":"Name","value":"is_discounted"}},{"kind":"Field","name":{"kind":"Name","value":"discounted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gallery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"is_video"}}]}}]}}]} as unknown as DocumentNode<ProductMiniFragment, unknown>;
export const SidebarCartItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SidebarCartItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CartItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"regular"}},{"kind":"Field","name":{"kind":"Name","value":"is_discounted"}},{"kind":"Field","name":{"kind":"Name","value":"discounted"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]} as unknown as DocumentNode<SidebarCartItemFragment, unknown>;
export const TotalsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Totals"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Totals"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"grand_total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"regular"}},{"kind":"Field","name":{"kind":"Name","value":"is_discounted"}},{"kind":"Field","name":{"kind":"Name","value":"discounted"}}]}}]}}]} as unknown as DocumentNode<TotalsFragment, unknown>;
export const SidebarCartFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SidebarCart"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SidebarCartItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coupons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percentage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shipping_method"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"regular"}},{"kind":"Field","name":{"kind":"Name","value":"is_discounted"}},{"kind":"Field","name":{"kind":"Name","value":"discounted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"estimated_delivery"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Totals"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SidebarCartItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CartItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"regular"}},{"kind":"Field","name":{"kind":"Name","value":"is_discounted"}},{"kind":"Field","name":{"kind":"Name","value":"discounted"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Totals"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Totals"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"grand_total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"regular"}},{"kind":"Field","name":{"kind":"Name","value":"is_discounted"}},{"kind":"Field","name":{"kind":"Name","value":"discounted"}}]}}]}}]} as unknown as DocumentNode<SidebarCartFragment, unknown>;
export const RegisterCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passwordConfirmation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"password_confirmation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passwordConfirmation"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomerData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomerData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<RegisterCustomerMutation, RegisterCustomerMutationVariables>;
export const LoginCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomerData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomerData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<LoginCustomerMutation, LoginCustomerMutationVariables>;
export const ProductBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"regular"}},{"kind":"Field","name":{"kind":"Name","value":"is_discounted"}},{"kind":"Field","name":{"kind":"Name","value":"discounted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"line_definitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"max_length"}},{"kind":"Field","name":{"kind":"Name","value":"required"}}]}},{"kind":"Field","name":{"kind":"Name","value":"designs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"hex"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fonts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"filename_woff2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"text_areas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"first_line"}},{"kind":"Field","name":{"kind":"Name","value":"lines"}},{"kind":"Field","name":{"kind":"Name","value":"text_color"}},{"kind":"Field","name":{"kind":"Name","value":"inherit_color"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"regular"}},{"kind":"Field","name":{"kind":"Name","value":"is_discounted"}},{"kind":"Field","name":{"kind":"Name","value":"discounted"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"thickness"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"regular"}},{"kind":"Field","name":{"kind":"Name","value":"is_discounted"}},{"kind":"Field","name":{"kind":"Name","value":"discounted"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"gallery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"is_video"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reverse_side_base"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"text_areas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"first_line"}},{"kind":"Field","name":{"kind":"Name","value":"lines"}},{"kind":"Field","name":{"kind":"Name","value":"text_color"}},{"kind":"Field","name":{"kind":"Name","value":"inherit_color"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"primary_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"is_video"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}}]}}]}}]}}]} as unknown as DocumentNode<ProductBySlugQuery, ProductBySlugQueryVariables>;
export const ProductSlugsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductSlugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productSlugs"}}]}}]} as unknown as DocumentNode<ProductSlugsQuery, ProductSlugsQueryVariables>;