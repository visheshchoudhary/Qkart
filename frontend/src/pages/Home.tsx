import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <h1 className="text-4xl font-bold text-center">Welcome to QKart</h1>
      <p className="text-xl text-muted-foreground text-center max-w-2xl">
        Your one-stop shop for all your shopping needs. Browse our collection of products and enjoy secure shopping.
      </p>
      <Link to="/products">
        <Button size="lg">Start Shopping</Button>
      </Link>
    </div>
  )
}

export default Home 