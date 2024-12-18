import Image from 'next/image'
import { MegaMenu } from '@/components/shared/mega-menu'
import { MegaFooter } from '@/components/shared/mega-footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function UserLandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MegaMenu />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Your Dashboard</h1>
                <p className="text-xl mb-6">Manage your account, track orders, and discover new products.</p>
                <Button size="lg" variant="secondary">Get Started</Button>
              </div>
              <div className="md:w-1/2">
                <Image src="/placeholder.svg?height=400&width=400" alt="Hero Image" width={400} height={400} className="rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Easy Order Management', description: 'Track and manage your orders with ease.' },
                { title: 'Personalized Recommendations', description: 'Discover products tailored to your preferences.' },
                { title: 'Secure Payments', description: 'Shop with confidence using our secure payment system.' },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Explore Product Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                'Electronics',
                'Fashion',
                'Home & Garden',
                'Sports & Outdoors',
                'Beauty & Personal Care',
                'Books & Media',
              ].map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{category}</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline">Shop Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'John Doe', comment: 'Great selection of products and excellent customer service!' },
                { name: 'Jane Smith', comment: 'The user dashboard makes it so easy to manage my orders.' },
                { name: 'Mike Johnson', comment: 'I love the personalized recommendations. Always spot on!' },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{testimonial.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>"{testimonial.comment}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Join thousands of satisfied customers and start shopping today!</p>
            <Button size="lg" variant="secondary">Create Your Account</Button>
          </div>
        </section>

        {/* Recent Blog Posts */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Latest from Our Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: '10 Tips for Smart Online Shopping', excerpt: 'Learn how to make the most of your online shopping experience.' },
                { title: 'The Future of E-commerce', excerpt: 'Discover the latest trends shaping the future of online retail.' },
                { title: 'Sustainable Shopping: A Guide', excerpt: 'How to shop responsibly and reduce your environmental impact.' },
              ].map((post, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image src="/placeholder.svg?height=200&width=400" alt={post.title} width={400} height={200} className="w-full rounded-lg mb-4" />
                    <p>{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link">Read More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8">Subscribe to our newsletter for the latest products, deals, and tips.</p>
            <form className="max-w-md mx-auto flex">
              <Input type="email" placeholder="Enter your email" className="flex-grow" />
              <Button type="submit" className="ml-2">Subscribe</Button>
            </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { question: 'How do I track my order?', answer: 'You can track your order by logging into your account and visiting the "Order History" section.' },
                { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, PayPal, and Apple Pay.' },
                { question: 'How can I return an item?', answer: 'To return an item, please initiate a return request from your account within 30 days of purchase.' },
                { question: 'Do you offer international shipping?', answer: 'Yes, we offer international shipping to select countries. Shipping rates may vary.' },
              ].map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <MegaFooter />
    </div>
  )
}

