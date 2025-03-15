/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment CategoryFields on Category {\n  id\n  name\n  slug\n}\n\nfragment CustomerData on Customer {\n  id\n  user {\n    id\n    email\n    first_name\n    last_name\n  }\n}": typeof types.CategoryFieldsFragmentDoc,
    "mutation RegisterCustomer($email: String!, $password: String!, $firstName: String!, $lastName: String!, $passwordConfirmation: String!) {\n  registerCustomer(\n    email: $email\n    password: $password\n    first_name: $firstName\n    last_name: $lastName\n    password_confirmation: $passwordConfirmation\n  ) {\n    id\n    user {\n      email\n    }\n  }\n}\n\nmutation LoginCustomer($email: String!, $password: String!) {\n  loginCustomer(email: $email, password: $password) {\n    accessToken\n    refreshToken\n    customer {\n      ...CustomerData\n    }\n  }\n}": typeof types.RegisterCustomerDocument,
    "query MyQuery {\n  getCustomer {\n    activeCart {\n      id\n    }\n  }\n}\n\nquery GetCategories {\n  getCategories {\n    id\n    name\n    slug\n    subcategories {\n      id\n      name\n      slug\n    }\n  }\n}": typeof types.MyQueryDocument,
};
const documents: Documents = {
    "fragment CategoryFields on Category {\n  id\n  name\n  slug\n}\n\nfragment CustomerData on Customer {\n  id\n  user {\n    id\n    email\n    first_name\n    last_name\n  }\n}": types.CategoryFieldsFragmentDoc,
    "mutation RegisterCustomer($email: String!, $password: String!, $firstName: String!, $lastName: String!, $passwordConfirmation: String!) {\n  registerCustomer(\n    email: $email\n    password: $password\n    first_name: $firstName\n    last_name: $lastName\n    password_confirmation: $passwordConfirmation\n  ) {\n    id\n    user {\n      email\n    }\n  }\n}\n\nmutation LoginCustomer($email: String!, $password: String!) {\n  loginCustomer(email: $email, password: $password) {\n    accessToken\n    refreshToken\n    customer {\n      ...CustomerData\n    }\n  }\n}": types.RegisterCustomerDocument,
    "query MyQuery {\n  getCustomer {\n    activeCart {\n      id\n    }\n  }\n}\n\nquery GetCategories {\n  getCategories {\n    id\n    name\n    slug\n    subcategories {\n      id\n      name\n      slug\n    }\n  }\n}": types.MyQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CategoryFields on Category {\n  id\n  name\n  slug\n}\n\nfragment CustomerData on Customer {\n  id\n  user {\n    id\n    email\n    first_name\n    last_name\n  }\n}"): (typeof documents)["fragment CategoryFields on Category {\n  id\n  name\n  slug\n}\n\nfragment CustomerData on Customer {\n  id\n  user {\n    id\n    email\n    first_name\n    last_name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RegisterCustomer($email: String!, $password: String!, $firstName: String!, $lastName: String!, $passwordConfirmation: String!) {\n  registerCustomer(\n    email: $email\n    password: $password\n    first_name: $firstName\n    last_name: $lastName\n    password_confirmation: $passwordConfirmation\n  ) {\n    id\n    user {\n      email\n    }\n  }\n}\n\nmutation LoginCustomer($email: String!, $password: String!) {\n  loginCustomer(email: $email, password: $password) {\n    accessToken\n    refreshToken\n    customer {\n      ...CustomerData\n    }\n  }\n}"): (typeof documents)["mutation RegisterCustomer($email: String!, $password: String!, $firstName: String!, $lastName: String!, $passwordConfirmation: String!) {\n  registerCustomer(\n    email: $email\n    password: $password\n    first_name: $firstName\n    last_name: $lastName\n    password_confirmation: $passwordConfirmation\n  ) {\n    id\n    user {\n      email\n    }\n  }\n}\n\nmutation LoginCustomer($email: String!, $password: String!) {\n  loginCustomer(email: $email, password: $password) {\n    accessToken\n    refreshToken\n    customer {\n      ...CustomerData\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MyQuery {\n  getCustomer {\n    activeCart {\n      id\n    }\n  }\n}\n\nquery GetCategories {\n  getCategories {\n    id\n    name\n    slug\n    subcategories {\n      id\n      name\n      slug\n    }\n  }\n}"): (typeof documents)["query MyQuery {\n  getCustomer {\n    activeCart {\n      id\n    }\n  }\n}\n\nquery GetCategories {\n  getCategories {\n    id\n    name\n    slug\n    subcategories {\n      id\n      name\n      slug\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;