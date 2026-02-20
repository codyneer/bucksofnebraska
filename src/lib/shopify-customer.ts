import { shopifyFetch } from './shopify'

// ──────────── Types ────────────

export type ShopifyAddress = {
  id: string
  firstName: string | null
  lastName: string | null
  company: string | null
  address1: string | null
  address2: string | null
  city: string | null
  province: string | null
  zip: string | null
  country: string | null
  phone: string | null
}

export type ShopifyFulfillment = {
  trackingCompany: string | null
  trackingInfo: {
    number: string | null
    url: string | null
  }[]
}

export type ShopifyOrderLineItem = {
  title: string
  quantity: number
  variant: {
    title: string
    price: { amount: string; currencyCode: string }
    image: { url: string; altText: string | null } | null
    product: { handle: string }
  } | null
}

export type ShopifyOrder = {
  id: string
  name: string
  orderNumber: number
  processedAt: string
  fulfillmentStatus: string
  financialStatus: string
  currentTotalPrice: { amount: string; currencyCode: string }
  totalShippingPrice: { amount: string; currencyCode: string }
  totalTax: { amount: string; currencyCode: string } | null
  subtotalPrice: { amount: string; currencyCode: string } | null
  shippingAddress: ShopifyAddress | null
  lineItems: { edges: { node: ShopifyOrderLineItem }[] }
  successfulFulfillments: ShopifyFulfillment[]
}

export type ShopifyCustomer = {
  id: string
  firstName: string | null
  lastName: string | null
  email: string | null
  phone: string | null
  acceptsMarketing: boolean
  createdAt: string
  numberOfOrders: string
  defaultAddress: ShopifyAddress | null
  addresses: { edges: { node: ShopifyAddress }[] }
  orders: { edges: { node: ShopifyOrder }[] }
}

export type CustomerAccessToken = {
  accessToken: string
  expiresAt: string
}

export type CustomerUserError = {
  field: string[] | null
  message: string
  code?: string
}

// ──────────── Fragments ────────────

const ORDER_FIELDS = `
  id
  name
  orderNumber
  processedAt
  fulfillmentStatus
  financialStatus
  currentTotalPrice { amount currencyCode }
  totalShippingPrice { amount currencyCode }
  totalTax { amount currencyCode }
  subtotalPrice { amount currencyCode }
  shippingAddress {
    firstName lastName company
    address1 address2 city province zip country phone
  }
  lineItems(first: 50) {
    edges {
      node {
        title
        quantity
        variant {
          title
          price { amount currencyCode }
          image { url altText }
          product { handle }
        }
      }
    }
  }
  successfulFulfillments(first: 10) {
    trackingCompany
    trackingInfo {
      number
      url
    }
  }
`

const ADDRESS_FIELDS = `
  id firstName lastName company
  address1 address2 city province zip country phone
`

// ──────────── Mutations ────────────

const CUSTOMER_CREATE = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id email firstName lastName
      }
      customerUserErrors {
        field message code
      }
    }
  }
`

const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field message code
      }
    }
  }
`

const CUSTOMER_ACCESS_TOKEN_DELETE = `
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      customerUserErrors {
        field message
      }
    }
  }
`

const CUSTOMER_RECOVER = `
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        field message code
      }
    }
  }
`

const CUSTOMER_UPDATE = `
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
      customer {
        id firstName lastName email phone acceptsMarketing
      }
      customerUserErrors {
        field message code
      }
    }
  }
`

const CUSTOMER_ADDRESS_CREATE = `
  mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerAddress {
        ${ADDRESS_FIELDS}
      }
      customerUserErrors {
        field message code
      }
    }
  }
`

const CUSTOMER_ADDRESS_UPDATE = `
  mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
    customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
      customerAddress {
        ${ADDRESS_FIELDS}
      }
      customerUserErrors {
        field message code
      }
    }
  }
`

const CUSTOMER_ADDRESS_DELETE = `
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      deletedCustomerAddressId
      customerUserErrors {
        field message code
      }
    }
  }
`

const CUSTOMER_DEFAULT_ADDRESS_UPDATE = `
  mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
    customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
      customer {
        id
        defaultAddress {
          ${ADDRESS_FIELDS}
        }
      }
      customerUserErrors {
        field message code
      }
    }
  }
`

// ──────────── Queries ────────────

const GET_CUSTOMER = `
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id firstName lastName email phone
      acceptsMarketing createdAt numberOfOrders
      defaultAddress {
        ${ADDRESS_FIELDS}
      }
      addresses(first: 10) {
        edges {
          node {
            ${ADDRESS_FIELDS}
          }
        }
      }
      orders(first: 50, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            ${ORDER_FIELDS}
          }
        }
      }
    }
  }
`

// ──────────── Fetch Helpers ────────────

export async function loginCustomer(email: string, password: string) {
  const data = await shopifyFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: CustomerAccessToken | null
      customerUserErrors: CustomerUserError[]
    }
  }>({
    query: CUSTOMER_ACCESS_TOKEN_CREATE,
    variables: { input: { email, password } },
  })

  const { customerAccessToken, customerUserErrors } = data.customerAccessTokenCreate

  if (customerUserErrors.length > 0) {
    throw new Error(customerUserErrors[0].message)
  }

  if (!customerAccessToken) {
    throw new Error('Login failed. Please check your credentials.')
  }

  return customerAccessToken
}

export async function registerCustomer(input: {
  email: string
  password: string
  firstName?: string
  lastName?: string
  phone?: string
  acceptsMarketing?: boolean
}) {
  const data = await shopifyFetch<{
    customerCreate: {
      customer: { id: string; email: string; firstName: string; lastName: string } | null
      customerUserErrors: CustomerUserError[]
    }
  }>({
    query: CUSTOMER_CREATE,
    variables: { input },
  })

  const { customer, customerUserErrors } = data.customerCreate

  if (customerUserErrors.length > 0) {
    throw new Error(customerUserErrors[0].message)
  }

  if (!customer) {
    throw new Error('Registration failed. Please try again.')
  }

  return customer
}

export async function getCustomer(accessToken: string) {
  const data = await shopifyFetch<{
    customer: ShopifyCustomer | null
  }>({
    query: GET_CUSTOMER,
    variables: { customerAccessToken: accessToken },
  })

  return data.customer
}

export async function logoutCustomer(accessToken: string) {
  await shopifyFetch<{
    customerAccessTokenDelete: {
      deletedAccessToken: string | null
      customerUserErrors: CustomerUserError[]
    }
  }>({
    query: CUSTOMER_ACCESS_TOKEN_DELETE,
    variables: { customerAccessToken: accessToken },
  })
}

export async function recoverCustomer(email: string) {
  const data = await shopifyFetch<{
    customerRecover: {
      customerUserErrors: CustomerUserError[]
    }
  }>({
    query: CUSTOMER_RECOVER,
    variables: { email },
  })

  const { customerUserErrors } = data.customerRecover

  if (customerUserErrors.length > 0) {
    throw new Error(customerUserErrors[0].message)
  }
}

export async function updateCustomer(
  accessToken: string,
  customer: {
    firstName?: string
    lastName?: string
    phone?: string
    acceptsMarketing?: boolean
  }
) {
  const data = await shopifyFetch<{
    customerUpdate: {
      customer: ShopifyCustomer | null
      customerUserErrors: CustomerUserError[]
    }
  }>({
    query: CUSTOMER_UPDATE,
    variables: { customerAccessToken: accessToken, customer },
  })

  const { customerUserErrors } = data.customerUpdate

  if (customerUserErrors.length > 0) {
    throw new Error(customerUserErrors[0].message)
  }

  return data.customerUpdate.customer
}

export async function createAddress(
  accessToken: string,
  address: {
    firstName?: string
    lastName?: string
    company?: string
    address1?: string
    address2?: string
    city?: string
    province?: string
    zip?: string
    country?: string
    phone?: string
  }
) {
  const data = await shopifyFetch<{
    customerAddressCreate: {
      customerAddress: ShopifyAddress | null
      customerUserErrors: CustomerUserError[]
    }
  }>({
    query: CUSTOMER_ADDRESS_CREATE,
    variables: { customerAccessToken: accessToken, address },
  })

  const { customerUserErrors } = data.customerAddressCreate

  if (customerUserErrors.length > 0) {
    throw new Error(customerUserErrors[0].message)
  }

  return data.customerAddressCreate.customerAddress
}

export async function updateAddress(
  accessToken: string,
  id: string,
  address: {
    firstName?: string
    lastName?: string
    company?: string
    address1?: string
    address2?: string
    city?: string
    province?: string
    zip?: string
    country?: string
    phone?: string
  }
) {
  const data = await shopifyFetch<{
    customerAddressUpdate: {
      customerAddress: ShopifyAddress | null
      customerUserErrors: CustomerUserError[]
    }
  }>({
    query: CUSTOMER_ADDRESS_UPDATE,
    variables: { customerAccessToken: accessToken, id, address },
  })

  const { customerUserErrors } = data.customerAddressUpdate

  if (customerUserErrors.length > 0) {
    throw new Error(customerUserErrors[0].message)
  }

  return data.customerAddressUpdate.customerAddress
}

export async function deleteAddress(accessToken: string, id: string) {
  const data = await shopifyFetch<{
    customerAddressDelete: {
      deletedCustomerAddressId: string | null
      customerUserErrors: CustomerUserError[]
    }
  }>({
    query: CUSTOMER_ADDRESS_DELETE,
    variables: { customerAccessToken: accessToken, id },
  })

  const { customerUserErrors } = data.customerAddressDelete

  if (customerUserErrors.length > 0) {
    throw new Error(customerUserErrors[0].message)
  }
}

export async function setDefaultAddress(accessToken: string, addressId: string) {
  const data = await shopifyFetch<{
    customerDefaultAddressUpdate: {
      customer: { id: string } | null
      customerUserErrors: CustomerUserError[]
    }
  }>({
    query: CUSTOMER_DEFAULT_ADDRESS_UPDATE,
    variables: { customerAccessToken: accessToken, addressId },
  })

  const { customerUserErrors } = data.customerDefaultAddressUpdate

  if (customerUserErrors.length > 0) {
    throw new Error(customerUserErrors[0].message)
  }
}
