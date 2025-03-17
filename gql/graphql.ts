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

export type Address = {
  __typename?: 'Address';
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type Attribute = {
  __typename?: 'Attribute';
  code: Scalars['String']['output'];
  label: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: AttributeType;
  value?: Maybe<Scalars['String']['output']>;
  valueLabel: Scalars['String']['output'];
  values?: Maybe<Array<Scalars['String']['output']>>;
};

export type AttributeFilter = {
  __typename?: 'AttributeFilter';
  code: Scalars['String']['output'];
  label: Scalars['String']['output'];
  name: Scalars['String']['output'];
  values: Array<Scalars['String']['output']>;
};

export type AttributeFilterInput = {
  name: Scalars['String']['input'];
  values: Array<Scalars['String']['input']>;
};

export enum AttributeType {
  Number = 'NUMBER',
  String = 'STRING'
}

export type Cart = {
  __typename?: 'Cart';
  appliedCoupons: Array<CartCoupon>;
  billingAddress?: Maybe<Address>;
  customerEmail?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
  shippingAddress?: Maybe<Address>;
  shippingMethod?: Maybe<ShippingMethod>;
  subtotalDiscountedPrice: Money;
  subtotalRegularPrice: Money;
  totalCouponDiscounts: Money;
  totalItems: Scalars['Int']['output'];
  totalPrice: Money;
  totalShippingPrice?: Maybe<Money>;
  totalTax: Money;
};

export type CartCoupon = {
  __typename?: 'CartCoupon';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type CartItem = {
  __typename?: 'CartItem';
  customAttributes: Array<Attribute>;
  id: Scalars['ID']['output'];
  image?: Maybe<Image>;
  name?: Maybe<Scalars['String']['output']>;
  productId: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
  quantityLimit?: Maybe<Scalars['Int']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  totalPrice?: Maybe<Money>;
  unitPrice?: Maybe<DiscountablePrice>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
  slug: Scalars['String']['output'];
  subcategories: Array<Category>;
};

export type CreateAddressBody = {
  address1: Scalars['String']['input'];
  address2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  state: Scalars['String']['input'];
  titleCode: Scalars['String']['input'];
};

export type Currency = {
  __typename?: 'Currency';
  code: Scalars['String']['output'];
  exchangeRate: Scalars['Float']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type Customer = {
  __typename?: 'Customer';
  activeCart: Cart;
  carts: Array<Cart>;
  id: Scalars['ID']['output'];
  user: User;
};

export type CustomerAddress = {
  __typename?: 'CustomerAddress';
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  titleCode?: Maybe<Scalars['String']['output']>;
};

export type CustomerAuthPayload = {
  __typename?: 'CustomerAuthPayload';
  accessToken: Scalars['String']['output'];
  customer: Customer;
  refreshToken: Scalars['String']['output'];
};

export type DiscountablePrice = {
  __typename?: 'DiscountablePrice';
  isDiscounted: Scalars['Boolean']['output'];
  regularPrice: Money;
  value: Money;
};

export type Image = {
  __typename?: 'Image';
  alt?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type Money = {
  __typename?: 'Money';
  amount: Scalars['Float']['output'];
  currency: Currency;
  precisionAmount: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCartItem?: Maybe<Cart>;
  applyCouponToCart?: Maybe<Cart>;
  changeCustomerPassword?: Maybe<Scalars['Boolean']['output']>;
  createCustomerAddress?: Maybe<CustomerAddress>;
  deleteCustomerAddress?: Maybe<Scalars['Boolean']['output']>;
  loginCustomer: CustomerAuthPayload;
  placeOrder?: Maybe<Order>;
  refreshToken: RefreshTokenPayload;
  registerCustomer?: Maybe<Customer>;
  removeCartItem?: Maybe<Cart>;
  removeCouponFromCart?: Maybe<Cart>;
  setCartAddress?: Maybe<Cart>;
  setCustomerEmail?: Maybe<Cart>;
  setShippingMethod?: Maybe<Cart>;
  updateCartItem?: Maybe<Cart>;
  updateCustomer?: Maybe<Customer>;
  updateCustomerAddress?: Maybe<CustomerAddress>;
};


export type MutationAddCartItemArgs = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationApplyCouponToCartArgs = {
  code: Scalars['String']['input'];
};


export type MutationChangeCustomerPasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationCreateCustomerAddressArgs = {
  address: CreateAddressBody;
};


export type MutationDeleteCustomerAddressArgs = {
  addressId: Scalars['ID']['input'];
};


export type MutationLoginCustomerArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRegisterCustomerArgs = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  password_confirmation: Scalars['String']['input'];
};


export type MutationRemoveCartItemArgs = {
  itemId: Scalars['ID']['input'];
};


export type MutationRemoveCouponFromCartArgs = {
  couponId: Scalars['ID']['input'];
};


export type MutationSetCartAddressArgs = {
  address: CreateAddressBody;
};


export type MutationSetCustomerEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationSetShippingMethodArgs = {
  shippingMethodId: Scalars['ID']['input'];
};


export type MutationUpdateCartItemArgs = {
  itemId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationUpdateCustomerAddressArgs = {
  address: CreateAddressBody;
  addressId: Scalars['ID']['input'];
};

export type Order = {
  __typename?: 'Order';
  billingAddress?: Maybe<Address>;
  id: Scalars['ID']['output'];
  items: Array<OrderItem>;
  orderDate: Scalars['String']['output'];
  paymentMethod: Scalars['String']['output'];
  shippingAddress: Address;
  shippingMethod: ShippingMethod;
  status: Scalars['String']['output'];
  subtotalPrice: Money;
  totalPrice: Money;
  totalShippingPrice: Money;
  totalTax: Money;
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

export type OrderItem = {
  __typename?: 'OrderItem';
  customAttributes: Array<Attribute>;
  id: Scalars['ID']['output'];
  image?: Maybe<Image>;
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  totalPrice: Money;
  unitPrice: Money;
};

/** Information about pagination using a Relay style cursor connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Number of nodes in the current page. */
  count: Scalars['Int']['output'];
  /** Index of the current page. */
  currentPage: Scalars['Int']['output'];
  /** The cursor to continue paginating forwards. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** Index of the last available page. */
  lastPage: Scalars['Int']['output'];
  /** The cursor to continue paginating backwards. */
  startCursor?: Maybe<Scalars['String']['output']>;
  /** Total number of nodes in the paginated connection. */
  total: Scalars['Int']['output'];
};

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

export type PriceRange = {
  __typename?: 'PriceRange';
  max: Scalars['Float']['output'];
  min: Scalars['Float']['output'];
};

export type PriceRangeInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

export type Product = {
  __typename?: 'Product';
  averageRating?: Maybe<Scalars['Float']['output']>;
  customAttributes: Array<Attribute>;
  description?: Maybe<Scalars['String']['output']>;
  gallery: Array<Image>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  price: DiscountablePrice;
  primaryImage?: Maybe<Image>;
  quantityLimit?: Maybe<Scalars['Int']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  type?: Maybe<ProductType>;
  variants: Array<ProductVariant>;
};

/** A paginated list of Product edges. */
export type ProductConnection = {
  __typename?: 'ProductConnection';
  /** A list of Product edges. */
  edges: Array<ProductEdge>;
  /** Pagination information about the list of edges. */
  pageInfo: PageInfo;
};

/** An edge that contains a node of type Product and a cursor. */
export type ProductEdge = {
  __typename?: 'ProductEdge';
  /** A unique cursor that can be used for pagination. */
  cursor: Scalars['String']['output'];
  /** The Product node. */
  node: Product;
};

export type ProductFilters = {
  __typename?: 'ProductFilters';
  attributes: Array<AttributeFilter>;
  priceRange: PriceRange;
  ratingRange: RatingRange;
};

export type ProductFiltersInput = {
  attributes?: InputMaybe<Array<AttributeFilterInput>>;
  priceRange?: InputMaybe<PriceRangeInput>;
  ratingRange?: InputMaybe<RatingRangeInput>;
};

export type ProductReview = {
  __typename?: 'ProductReview';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rating?: Maybe<Scalars['Int']['output']>;
  reviewer?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export enum ProductType {
  Simple = 'SIMPLE',
  Variable = 'VARIABLE',
  Variant = 'VARIANT'
}

export type ProductVariant = {
  __typename?: 'ProductVariant';
  customAttributes: Array<Attribute>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  quantityLimit?: Maybe<Scalars['Int']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
};

/** Indicates what fields are available at the top level of a query operation. */
export type Query = {
  __typename?: 'Query';
  getCategories: Array<Category>;
  getCategory?: Maybe<Category>;
  getCategoryProductFilters: ProductFilters;
  getCurrencies: Array<Currency>;
  getCustomer?: Maybe<Customer>;
  getFilteredCategoryProducts: ProductConnection;
  getOrderDetails?: Maybe<Order>;
  getOrders: Array<Order>;
  getProductDetails?: Maybe<Product>;
  getProductReviews: Array<ProductReview>;
  getProducts: ProductConnection;
  searchProducts: Array<Product>;
  /** Find a single user by an identifying attribute. */
  user?: Maybe<User>;
  /** List multiple users. */
  users: UserPaginator;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryGetCategoryArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryGetCategoryProductFiltersArgs = {
  categorySlug: Scalars['String']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryGetFilteredCategoryProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  categorySlug: Scalars['String']['input'];
  filters?: InputMaybe<ProductFiltersInput>;
  first: Scalars['Int']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryGetOrderDetailsArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryGetProductDetailsArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryGetProductReviewsArgs = {
  productId: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryGetProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QuerySearchProductsArgs = {
  query: Scalars['String']['input'];
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

export type RatingRange = {
  __typename?: 'RatingRange';
  max: Scalars['Float']['output'];
  min: Scalars['Float']['output'];
};

export type RatingRangeInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

export type RefreshTokenPayload = {
  __typename?: 'RefreshTokenPayload';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type RegisterCustomerInput = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  password_confirmation: Scalars['String']['input'];
};

export type ShippingMethod = {
  __typename?: 'ShippingMethod';
  description?: Maybe<Scalars['String']['output']>;
  estimatedDelivery?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Money;
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type UpdateCustomerInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

/** Account of a person who utilizes this application. */
export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  email_verified_at?: Maybe<Scalars['DateTime']['output']>;
  first_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  last_name: Scalars['String']['output'];
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

export type CategoryFieldsFragment = { __typename?: 'Category', id: string, name: string, slug: string } & { ' $fragmentName'?: 'CategoryFieldsFragment' };

export type CustomerDataFragment = { __typename?: 'Customer', id: string, user: { __typename?: 'User', id: string, email: string, first_name: string, last_name: string } } & { ' $fragmentName'?: 'CustomerDataFragment' };

export type CategoryProductFiltersFragment = { __typename?: 'ProductFilters', priceRange: { __typename?: 'PriceRange', min: number, max: number }, ratingRange: { __typename?: 'RatingRange', min: number, max: number }, attributes: Array<{ __typename?: 'AttributeFilter', code: string, name: string, label: string, values: Array<string> }> } & { ' $fragmentName'?: 'CategoryProductFiltersFragment' };

export type RegisterCustomerMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
}>;


export type RegisterCustomerMutation = { __typename?: 'Mutation', registerCustomer?: { __typename?: 'Customer', id: string, user: { __typename?: 'User', email: string } } | null };

export type LoginCustomerMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginCustomerMutation = { __typename?: 'Mutation', loginCustomer: { __typename?: 'CustomerAuthPayload', accessToken: string, refreshToken: string, customer: (
      { __typename?: 'Customer' }
      & { ' $fragmentRefs'?: { 'CustomerDataFragment': CustomerDataFragment } }
    ) } };

export type MyQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MyQueryQuery = { __typename?: 'Query', getCustomer?: { __typename?: 'Customer', activeCart: { __typename?: 'Cart', id: string } } | null };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<(
    { __typename?: 'Category', subcategories: Array<(
      { __typename?: 'Category', subcategories: Array<(
        { __typename?: 'Category', subcategories: Array<(
          { __typename?: 'Category', subcategories: Array<(
            { __typename?: 'Category', subcategories: Array<(
              { __typename?: 'Category', subcategories: Array<(
                { __typename?: 'Category', subcategories: Array<(
                  { __typename?: 'Category', subcategories: Array<(
                    { __typename?: 'Category', subcategories: Array<(
                      { __typename?: 'Category' }
                      & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
                    )> }
                    & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
                  )> }
                  & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
                )> }
                & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
              )> }
              & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
            )> }
            & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
          )> }
          & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
        )> }
        & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
      )> }
      & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
    )> }
    & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
  )> };

export type GetFilteredCategoryProductsQueryVariables = Exact<{
  categorySlug: Scalars['String']['input'];
  filters?: InputMaybe<ProductFiltersInput>;
  first: Scalars['Int']['input'];
}>;


export type GetFilteredCategoryProductsQuery = { __typename?: 'Query', getFilteredCategoryProducts: { __typename?: 'ProductConnection', edges: Array<{ __typename?: 'ProductEdge', node: { __typename?: 'Product', id: string, name?: string | null, slug: string, averageRating?: number | null, price: { __typename?: 'DiscountablePrice', isDiscounted: boolean, regularPrice: { __typename?: 'Money', amount: number, currency: { __typename?: 'Currency', symbol: string } }, value: { __typename?: 'Money', amount: number, currency: { __typename?: 'Currency', symbol: string } } }, primaryImage?: { __typename?: 'Image', url: string } | null, customAttributes: Array<{ __typename?: 'Attribute', label: string, name: string, value?: string | null, values?: Array<string> | null, type: AttributeType }> } }> } };

export type GetCategoryProductFiltersQueryVariables = Exact<{
  categorySlug: Scalars['String']['input'];
}>;


export type GetCategoryProductFiltersQuery = { __typename?: 'Query', getCategoryProductFilters: (
    { __typename?: 'ProductFilters' }
    & { ' $fragmentRefs'?: { 'CategoryProductFiltersFragment': CategoryProductFiltersFragment } }
  ) };

export const CategoryFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]} as unknown as DocumentNode<CategoryFieldsFragment, unknown>;
export const CustomerDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomerData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Customer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}}]}}]} as unknown as DocumentNode<CustomerDataFragment, unknown>;
export const CategoryProductFiltersFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryProductFilters"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductFilters"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ratingRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"values"}}]}}]}}]} as unknown as DocumentNode<CategoryProductFiltersFragment, unknown>;
export const RegisterCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passwordConfirmation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"first_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"last_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"password_confirmation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passwordConfirmation"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterCustomerMutation, RegisterCustomerMutationVariables>;
export const LoginCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomerData"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomerData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Customer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}}]}}]} as unknown as DocumentNode<LoginCustomerMutation, LoginCustomerMutationVariables>;
export const MyQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCustomer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeCart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<MyQueryQuery, MyQueryQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetFilteredCategoryProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFilteredCategoryProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categorySlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductFiltersInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFilteredCategoryProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categorySlug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categorySlug"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDiscounted"}},{"kind":"Field","name":{"kind":"Name","value":"regularPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}},{"kind":"Field","name":{"kind":"Name","value":"customAttributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"values"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFilteredCategoryProductsQuery, GetFilteredCategoryProductsQueryVariables>;
export const GetCategoryProductFiltersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategoryProductFilters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categorySlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategoryProductFilters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categorySlug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categorySlug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryProductFilters"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryProductFilters"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductFilters"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ratingRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"values"}}]}}]}}]} as unknown as DocumentNode<GetCategoryProductFiltersQuery, GetCategoryProductFiltersQueryVariables>;