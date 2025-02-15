import { Product } from '@/types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { addToCart } from '@/services/api'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1)
      toast.success('Added to cart')
    } catch (error: any) {
      const errorData = error.response?.data
      toast.error(errorData?.message || 'Failed to add to cart')
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover rounded-md"
        />
        <div className="mt-4">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">${product.cost}</span>
            <span className="text-sm">Rating: {product.rating}/5</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard 