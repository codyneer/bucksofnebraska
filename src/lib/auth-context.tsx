'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import {
  loginCustomer as shopifyLogin,
  registerCustomer as shopifyRegister,
  getCustomer as shopifyGetCustomer,
  logoutCustomer as shopifyLogout,
  type ShopifyCustomer,
  type CustomerAccessToken,
} from './shopify-customer'

type AuthContextType = {
  customer: ShopifyCustomer | null
  isAuthenticated: boolean
  isLoading: boolean
  accessToken: string | null
  login: (email: string, password: string) => Promise<void>
  register: (input: {
    email: string
    password: string
    firstName?: string
    lastName?: string
    phone?: string
    acceptsMarketing?: boolean
  }) => Promise<void>
  logout: () => Promise<void>
  refreshCustomer: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const TOKEN_KEY = 'shopify_customer_token'
const TOKEN_EXPIRY_KEY = 'shopify_customer_token_expiry'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<ShopifyCustomer | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!customer && !!accessToken

  const saveToken = useCallback((token: CustomerAccessToken) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token.accessToken)
      localStorage.setItem(TOKEN_EXPIRY_KEY, token.expiresAt)
    }
    setAccessToken(token.accessToken)
  }, [])

  const clearToken = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(TOKEN_EXPIRY_KEY)
    }
    setAccessToken(null)
    setCustomer(null)
  }, [])

  const refreshCustomer = useCallback(async () => {
    if (!accessToken) return

    try {
      const customerData = await shopifyGetCustomer(accessToken)
      if (customerData) {
        setCustomer(customerData)
      } else {
        // Token is invalid or expired
        clearToken()
      }
    } catch {
      clearToken()
    }
  }, [accessToken, clearToken])

  // On mount: check for existing token and validate
  useEffect(() => {
    const init = async () => {
      const storedToken = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null
      const storedExpiry = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_EXPIRY_KEY) : null

      if (storedToken && storedExpiry) {
        // Check if token is expired
        if (new Date(storedExpiry) <= new Date()) {
          clearToken()
          setIsLoading(false)
          return
        }

        setAccessToken(storedToken)

        try {
          const customerData = await shopifyGetCustomer(storedToken)
          if (customerData) {
            setCustomer(customerData)
          } else {
            clearToken()
          }
        } catch {
          clearToken()
        }
      }

      setIsLoading(false)
    }

    init()
  }, [clearToken])

  const login = useCallback(async (email: string, password: string) => {
    const token = await shopifyLogin(email, password)
    saveToken(token)

    const customerData = await shopifyGetCustomer(token.accessToken)
    if (customerData) {
      setCustomer(customerData)
    }
  }, [saveToken])

  const register = useCallback(async (input: {
    email: string
    password: string
    firstName?: string
    lastName?: string
    phone?: string
    acceptsMarketing?: boolean
  }) => {
    // Create the customer
    await shopifyRegister(input)

    // Auto-login after registration
    const token = await shopifyLogin(input.email, input.password)
    saveToken(token)

    const customerData = await shopifyGetCustomer(token.accessToken)
    if (customerData) {
      setCustomer(customerData)
    }
  }, [saveToken])

  const logout = useCallback(async () => {
    if (accessToken) {
      try {
        await shopifyLogout(accessToken)
      } catch {
        // Proceed with local cleanup even if API call fails
      }
    }
    clearToken()
  }, [accessToken, clearToken])

  return (
    <AuthContext.Provider
      value={{
        customer,
        isAuthenticated,
        isLoading,
        accessToken,
        login,
        register,
        logout,
        refreshCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
