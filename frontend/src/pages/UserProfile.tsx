import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Loader2, MapPin, Wallet, Mail, User } from 'lucide-react'
import { toast } from 'sonner'

interface UserData {
  name: string
  email: string
  walletMoney: number
  address: string
  _id: string
}

const UserProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [address, setAddress] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  
  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const tokenPayload = JSON.parse(atob(token.split('.')[1]))
        const userId = tokenPayload.sub
        const response = await axios.get(`/verse/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (response.data) {
          setUserData(response.data)
          setAddress(response.data.address || '')
        } else {
          throw new Error('No user data received')
        }
      } catch (err) {
        console.error('Error fetching user data:', err)
        toast.error('Failed to fetch user data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [token, navigate])

  const handleUpdateAddress = async () => {
    if (!token || !userData) return

    if (!address.trim()) {
      toast.error('Address cannot be empty')
      return
    }

    try {
      await axios.put(
        `/verse/users/${userData._id}`,
        { address },
        { headers: { Authorization: `Bearer ${token}` }}
      )
      setUserData(prev => prev ? {...prev, address} : null)
      setIsEditing(false)
      toast.success('Address updated successfully')
    } catch (err) {
      console.error('Error updating address:', err)
      toast.error('Failed to update address')
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-600">Failed to load user data</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">User Profile</h1>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-full">
            Active
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <User className="h-5 w-5 text-gray-500" />
            <div>
              <label className="block text-sm font-medium text-gray-500">Name</label>
              <div className="text-lg font-medium">{userData?.name || 'N/A'}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <Mail className="h-5 w-5 text-gray-500" />
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <div className="text-lg">{userData?.email || 'N/A'}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <Wallet className="h-5 w-5 text-gray-500" />
            <div>
              <label className="block text-sm font-medium text-gray-500">Wallet Balance</label>
              <div className="text-lg font-medium text-green-600">
                ₹{(userData?.walletMoney || 0).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4 mb-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <label className="block text-sm font-medium text-gray-500">Delivery Address</label>
            </div>
            
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your delivery address"
                  className="w-full"
                />
                <div className="flex gap-2">
                  <Button onClick={handleUpdateAddress}>Save Address</Button>
                  <Button variant="outline" onClick={() => {
                    setIsEditing(false)
                    setAddress(userData.address)
                  }}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="text-lg">
                  {userData.address === 'ADDRESS_NOT_SET' 
                    ? <span className="text-gray-500 italic">No address set</span>
                    : userData.address}
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)}
                  className="ml-4"
                >
                  Edit Address
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile 