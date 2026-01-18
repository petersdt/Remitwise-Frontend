import Link from 'next/link'
import { ArrowLeft, Plus, User, Shield, DollarSign } from 'lucide-react'

export default function FamilyWallets() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Family Wallets</h1>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
              disabled
            >
              <Plus className="w-5 h-5" />
              <span>Add Member</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Family Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MemberCard
            name="Ravi"
            role="sender"
            address="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            spendingLimit={1000}
          />
          <MemberCard
            name="Priya"
            role="recipient"
            address="GYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"
            spendingLimit={500}
          />
          <MemberCard
            name="Amit"
            role="admin"
            address="GZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
            spendingLimit={2000}
          />
        </div>

        {/* Add Member Form */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add Family Member</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Family member name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stellar Address
              </label>
              <input
                type="text"
                placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                disabled
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled
                >
                  <option>Sender</option>
                  <option>Recipient</option>
                  <option>Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spending Limit (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="1000.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled
            >
              Add Member
            </button>
          </form>
        </div>

        {/* Integration Note */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Integration Required:</strong> Connect to family_wallet smart contract to add members, 
            update spending limits, and check permissions. Integrate with wallet connection to verify addresses.
          </p>
        </div>
      </main>
    </div>
  )
}

function MemberCard({ name, role, address, spendingLimit }: { name: string, role: string, address: string, spendingLimit: number }) {
  const roleColors = {
    sender: 'bg-blue-100 text-blue-700',
    recipient: 'bg-green-100 text-green-700',
    admin: 'bg-purple-100 text-purple-700',
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <span className={`text-xs px-2 py-1 rounded ${roleColors[role as keyof typeof roleColors] || 'bg-gray-100 text-gray-700'} capitalize`}>
              {role}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="text-xs text-gray-500">Address</div>
        <div className="text-xs font-mono text-gray-700 break-all">{address}</div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span className="text-sm">Spending Limit</span>
        </div>
        <span className="font-semibold text-gray-900">${spendingLimit}</span>
      </div>

      <div className="mt-4 flex space-x-2">
        <button
          className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-semibold"
          disabled
        >
          Edit
        </button>
        <button
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
          disabled
        >
          View Details
        </button>
      </div>
    </div>
  )
}

