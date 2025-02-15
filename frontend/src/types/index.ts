export interface User {
  name: string
  email: string
  walletMoney: number
  address: string
}

export interface Product {
  _id: string
  name: string
  category: string
  cost: number
  rating: number
  image: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  email: string
  cartItems: CartItem[]
  paymentOption: string
} 