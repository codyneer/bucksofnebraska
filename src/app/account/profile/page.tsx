'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Plus, Pencil, Trash2, Star, X } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { ProtectedRoute } from '@/components/account/ProtectedRoute'
import {
  updateCustomer,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  type ShopifyAddress,
} from '@/lib/shopify-customer'
import type { FormEvent } from 'react'

type AddressFormData = {
  firstName: string
  lastName: string
  company: string
  address1: string
  address2: string
  city: string
  province: string
  zip: string
  country: string
  phone: string
}

const emptyAddress: AddressFormData = {
  firstName: '',
  lastName: '',
  company: '',
  address1: '',
  address2: '',
  city: '',
  province: '',
  zip: '',
  country: 'US',
  phone: '',
}

function ProfileContent() {
  const { customer, accessToken, refreshCustomer } = useAuth()

  // Profile form state
  const [firstName, setFirstName] = useState(customer?.firstName || '')
  const [lastName, setLastName] = useState(customer?.lastName || '')
  const [phone, setPhone] = useState(customer?.phone || '')
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileMessage, setProfileMessage] = useState('')

  // Address form state
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [addressForm, setAddressForm] = useState<AddressFormData>(emptyAddress)
  const [addressSaving, setAddressSaving] = useState(false)
  const [addressError, setAddressError] = useState('')

  if (!customer || !accessToken) return null

  const addresses = customer.addresses.edges.map((e) => e.node)
  const defaultAddressId = customer.defaultAddress?.id

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setProfileSaving(true)
    setProfileMessage('')

    try {
      await updateCustomer(accessToken, {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phone: phone || undefined,
      })
      await refreshCustomer()
      setProfileMessage('Profile updated successfully.')
    } catch (err) {
      setProfileMessage(err instanceof Error ? err.message : 'Failed to update profile.')
    } finally {
      setProfileSaving(false)
    }
  }

  const openAddressForm = (address?: ShopifyAddress) => {
    if (address) {
      setEditingAddressId(address.id)
      setAddressForm({
        firstName: address.firstName || '',
        lastName: address.lastName || '',
        company: address.company || '',
        address1: address.address1 || '',
        address2: address.address2 || '',
        city: address.city || '',
        province: address.province || '',
        zip: address.zip || '',
        country: address.country || 'US',
        phone: address.phone || '',
      })
    } else {
      setEditingAddressId(null)
      setAddressForm(emptyAddress)
    }
    setShowAddressForm(true)
    setAddressError('')
  }

  const handleAddressSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setAddressSaving(true)
    setAddressError('')

    try {
      if (editingAddressId) {
        await updateAddress(accessToken, editingAddressId, addressForm)
      } else {
        await createAddress(accessToken, addressForm)
      }
      await refreshCustomer()
      setShowAddressForm(false)
      setEditingAddressId(null)
      setAddressForm(emptyAddress)
    } catch (err) {
      setAddressError(err instanceof Error ? err.message : 'Failed to save address.')
    } finally {
      setAddressSaving(false)
    }
  }

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteAddress(accessToken, id)
      await refreshCustomer()
    } catch {
      // Silent fail — address may be in use
    }
  }

  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultAddress(accessToken, id)
      await refreshCustomer()
    } catch {
      // Silent fail
    }
  }

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-10 max-w-[800px] mx-auto">
      <Link
        href="/account"
        className="inline-flex items-center gap-2 font-nav text-[12px] tracking-[2px] uppercase text-text-muted hover:text-red transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Account
      </Link>

      <h1 className="font-display text-[clamp(36px,6vw,52px)] text-text leading-none mb-10">
        Profile & <span className="text-red">Addresses</span>
      </h1>

      {/* Profile section */}
      <div className="bg-white border border-border-light p-5 sm:p-6 mb-8">
        <h2 className="font-nav text-[14px] tracking-[2px] uppercase text-text mb-6">
          Personal Information
        </h2>

        <form onSubmit={handleProfileSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block font-nav text-[12px] tracking-[2px] uppercase text-text-muted mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full py-3 px-4 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
              />
            </div>
            <div>
              <label className="block font-nav text-[12px] tracking-[2px] uppercase text-text-muted mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full py-3 px-4 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block font-nav text-[12px] tracking-[2px] uppercase text-text-muted mb-2">
              Email
            </label>
            <input
              type="email"
              value={customer.email || ''}
              disabled
              className="w-full py-3 px-4 bg-offWhite border border-border text-text-muted font-body text-[15px] cursor-not-allowed"
            />
            <p className="font-body text-[12px] text-text-muted mt-1">
              Email cannot be changed here.
            </p>
          </div>

          <div className="mb-6">
            <label className="block font-nav text-[12px] tracking-[2px] uppercase text-text-muted mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full py-3 px-4 bg-white border border-border text-text font-body text-[15px] outline-none focus:border-red transition-colors"
            />
          </div>

          {profileMessage && (
            <div className={`mb-4 p-3 text-[14px] font-body ${profileMessage.includes('success') ? 'bg-green/5 border border-green/20 text-green' : 'bg-red/5 border border-red/20 text-red'}`}>
              {profileMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={profileSaving}
            className="py-3 px-6 bg-red text-white font-nav text-[13px] tracking-[2px] uppercase border-none cursor-pointer transition-all duration-300 hover:bg-red-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {profileSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Addresses section */}
      <div className="bg-white border border-border-light p-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-nav text-[14px] tracking-[2px] uppercase text-text">
            Saved Addresses
          </h2>
          <button
            onClick={() => openAddressForm()}
            className="font-nav text-[11px] tracking-[2px] uppercase text-red hover:text-red-dark transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New
          </button>
        </div>

        {/* Address form (add/edit) */}
        {showAddressForm && (
          <div className="border border-border-light p-4 sm:p-5 mb-6 bg-offWhite">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-nav text-[12px] tracking-[2px] uppercase text-text">
                {editingAddressId ? 'Edit Address' : 'New Address'}
              </h3>
              <button
                onClick={() => setShowAddressForm(false)}
                className="text-text-muted hover:text-text transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {addressError && (
              <div className="mb-4 p-3 bg-red/5 border border-red/20 text-red text-[14px] font-body">
                {addressError}
              </div>
            )}

            <form onSubmit={handleAddressSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  value={addressForm.firstName}
                  onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })}
                  placeholder="First name"
                  className="py-2.5 px-3 bg-white border border-border text-text font-body text-[14px] outline-none focus:border-red transition-colors"
                />
                <input
                  type="text"
                  value={addressForm.lastName}
                  onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })}
                  placeholder="Last name"
                  className="py-2.5 px-3 bg-white border border-border text-text font-body text-[14px] outline-none focus:border-red transition-colors"
                />
              </div>
              <input
                type="text"
                value={addressForm.company}
                onChange={(e) => setAddressForm({ ...addressForm, company: e.target.value })}
                placeholder="Company (optional)"
                className="w-full py-2.5 px-3 bg-white border border-border text-text font-body text-[14px] outline-none focus:border-red transition-colors mb-3"
              />
              <input
                type="text"
                value={addressForm.address1}
                onChange={(e) => setAddressForm({ ...addressForm, address1: e.target.value })}
                placeholder="Address"
                required
                className="w-full py-2.5 px-3 bg-white border border-border text-text font-body text-[14px] outline-none focus:border-red transition-colors mb-3"
              />
              <input
                type="text"
                value={addressForm.address2}
                onChange={(e) => setAddressForm({ ...addressForm, address2: e.target.value })}
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full py-2.5 px-3 bg-white border border-border text-text font-body text-[14px] outline-none focus:border-red transition-colors mb-3"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                <input
                  type="text"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  placeholder="City"
                  required
                  className="py-2.5 px-3 bg-white border border-border text-text font-body text-[14px] outline-none focus:border-red transition-colors"
                />
                <input
                  type="text"
                  value={addressForm.province}
                  onChange={(e) => setAddressForm({ ...addressForm, province: e.target.value })}
                  placeholder="State"
                  required
                  className="py-2.5 px-3 bg-white border border-border text-text font-body text-[14px] outline-none focus:border-red transition-colors"
                />
                <input
                  type="text"
                  value={addressForm.zip}
                  onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                  placeholder="ZIP code"
                  required
                  className="py-2.5 px-3 bg-white border border-border text-text font-body text-[14px] outline-none focus:border-red transition-colors col-span-2 sm:col-span-1"
                />
              </div>
              <input
                type="tel"
                value={addressForm.phone}
                onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                placeholder="Phone (optional)"
                className="w-full py-2.5 px-3 bg-white border border-border text-text font-body text-[14px] outline-none focus:border-red transition-colors mb-4"
              />

              <button
                type="submit"
                disabled={addressSaving}
                className="py-2.5 px-5 bg-red text-white font-nav text-[12px] tracking-[2px] uppercase border-none cursor-pointer transition-all duration-300 hover:bg-red-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addressSaving ? 'Saving...' : editingAddressId ? 'Update Address' : 'Add Address'}
              </button>
            </form>
          </div>
        )}

        {/* Address list */}
        {addresses.length === 0 ? (
          <p className="font-body text-[14px] text-text-muted text-center py-4">
            No saved addresses yet.
          </p>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr) => {
              const isDefault = addr.id === defaultAddressId

              return (
                <div
                  key={addr.id}
                  className={`border p-4 ${isDefault ? 'border-red/30 bg-red/[0.02]' : 'border-border-light'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-body text-[14px] text-text-light leading-relaxed">
                      <p className="text-text font-semibold">
                        {addr.firstName} {addr.lastName}
                        {isDefault && (
                          <span className="ml-2 font-nav text-[10px] tracking-[1.5px] uppercase text-red">
                            Default
                          </span>
                        )}
                      </p>
                      {addr.company && <p>{addr.company}</p>}
                      <p>{addr.address1}</p>
                      {addr.address2 && <p>{addr.address2}</p>}
                      <p>{addr.city}, {addr.province} {addr.zip}</p>
                      <p>{addr.country}</p>
                      {addr.phone && <p>{addr.phone}</p>}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {!isDefault && (
                        <button
                          onClick={() => handleSetDefault(addr.id)}
                          className="p-2 text-text-muted hover:text-gold transition-colors cursor-pointer"
                          title="Set as default"
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => openAddressForm(addr)}
                        className="p-2 text-text-muted hover:text-red transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="p-2 text-text-muted hover:text-red transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}
