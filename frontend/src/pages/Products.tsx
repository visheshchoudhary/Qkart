import { useEffect, useState } from 'react'
import { getProducts } from '@/services/api'
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'
import { toast } from 'sonner'

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error: any) {
        const errorData = error.response?.data
        toast.error(errorData?.message || 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="text-center">Loading products...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Products 