import { useEffect, useState } from 'react'
import { getCart, updateCart, checkout } from '@/services/api'
import { Cart as CartType } from '@/types'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const Cart = () => {
  const [cart, setCart] = useState<CartType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const data = await getCart()
      setCart(data)
    } catch (error: any) {
      const errorData = error.response?.data
      toast.error(errorData?.message || 'Failed to fetch cart')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      await updateCart(productId, quantity)
      await fetchCart()
    } catch (error: any) {
      const errorData = error.response?.data
      toast.error(errorData?.message || 'Failed to update cart')
    }
  }

  const handleCheckout = async () => {
    try {
      await checkout()
      toast.success('Checkout successful')
      await fetchCart()
    } catch (error: any) {
      const errorData = error.response?.data
      toast.error(errorData?.message || 'Checkout failed')
    }
  }

  if (loading) return <div>Loading cart...</div>
  if (!cart?.cartItems.length) return <div>Your cart is empty</div>

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      <div className="space-y-4">
        {cart.cartItems.map(({ product, quantity }) => (
          <div key={product._id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">${product.cost}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleUpdateQuantity(product._id, quantity - 1)}
              >
                -
              </Button>
              <span>{quantity}</span>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleUpdateQuantity(product._id, quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  )
}

export default Cart 