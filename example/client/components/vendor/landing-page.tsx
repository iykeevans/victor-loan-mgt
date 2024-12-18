import Image from 'next/image'
import { MegaMenu } from '@/components/shared/mega-menu'
import { MegaFooter } from '@/components/shared/mega-footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function VendorLandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MegaMenu />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Grow Your Business with Our Vendor Platform</h1>
                <p className="text-xl mb-6">Reach millions of customers and boost your sales with our e-commerce marketplace.</p>
                <Button size="lg" variant="secondary">Become a Vendor</Button>
              </div>
              <div className="md:w-1/2">
                <Image src="/placeholder.svg?height=400&width=400" alt="Vendor Dashboard" width={400} height={400} className="rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Easy Store Setup', description: 'Get your online store up and running in minutes.' },
                { title: 'Powerful Analytics', description: 'Gain insights into your sales and customer behavior.' },
                { title: 'Secure Payments', description: 'Receive payments securely and on time.' },
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

        {/* How It Works */}
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: 1, title: 'Sign Up', description: 'Create your vendor account in minutes.' },
                { step: 2, title: 'List Products', description: 'Add your products to our marketplace.' },
                { step: 3, title: 'Receive Orders', description: 'Get notified when customers place orders.' },
                { step: 4, title: 'Ship & Earn', description: 'Fulfill orders and receive payments.' },
              ].map((step, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>
                      <span className="inline-block bg-primary text-primary-foreground rounded-full w-8 h-8 text-center leading-8 mr-2">
                        {step.step}
                      </span>
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Vendor Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'John's Electronics', story: 'Increased sales by 200% in the first year on our platform.' },
                { name: 'Green Living Co.', story: 'Expanded customer base to 5 new countries within 6 months.' },
                { name: 'Artisan Crafts', story: 'Grew from a small workshop to a thriving online business.' },
              ].map((story, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{story.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>"{story.story}"</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link">Read Full Story</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Vendor Tools */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful Vendor Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                'Inventory Management',
                'Order Processing',
                'Analytics Dashboard',
                'Customer Messaging',
                'Promotion Creator',
                'Shipping Integration',
                'Review Management',
                'Payout Reports',
              ].map((tool, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{tool}</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="secondary">Learn More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Flexible Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Starter', price: '$29/month', features: ['100 Product Listings', 'Basic Analytics', 'Email Support'] },
                { name: 'Professional', price: '$99/month', features: ['Unlimited Products', 'Advanced Analytics', 'Priority Support', 'Promotional Tools'] },
                { name: 'Enterprise', price: 'Custom', features: ['Custom Solutions', 'Dedicated Account Manager', 'API Access', 'Bulk Upload'] },
              ].map((plan, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription className="text-3xl font-bold">{plan.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">{plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Vendors Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Sarah K.', business: 'Fashion Boutique', comment: 'This platform has transformed my small business into a thriving online store.' },
                { name: 'Mike R.', business: 'Tech Gadgets', comment: 'The analytics tools have helped me make data-driven decisions to boost my sales.' },
                { name: 'Lisa M.', business: 'Handmade Crafts', comment: 'The support team is amazing. They've helped me every step of the way.' },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.business}</CardDescription>
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
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
            <p className="text-xl mb-8">Join thousands of successful vendors on our platform today.</p>
            <Button size="lg">Start Selling Now</Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { question: 'How do I get started as a vendor?', answer: 'Simply sign up for an account, complete your profile, and start listing your products.' },
                { question: 'What are the fees for selling on your platform?', answer: 'We have a transparent fee structure based on your chosen plan. Check our pricing section for details.' },
                { question: 'How do I manage my inventory?', answer: 'Our platform provides an easy-to-use inventory management system where you can add, edit, and track your products.' },
                { question: 'When and how do I get paid?', answer: 'Payments are processed on a bi-weekly basis and transferred directly to your linked bank account.' },
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

