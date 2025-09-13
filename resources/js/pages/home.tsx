import Navbar from '@/components/shop/header'
import Hero from '@/components/shop/hero'
import ProductsByCategory from '@/components/shop/products-by-category'
import Footer from '@/components/shop/footer'
import ContactForm from '@/components/contact/ContactForm'

type PageProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[]
  successMessage: string
}

export default function HomePage({ categories, successMessage }: PageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <div id='products' className="pt-8">
        <ProductsByCategory categories={categories} />
      </div>
      <div id='contact' className="pt-8">
        <ContactForm success={successMessage}/>
      </div>
      <Footer />
    </div>
  )
}


