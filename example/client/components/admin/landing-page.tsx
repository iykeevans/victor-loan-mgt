import Image from 'next/image'
import { MegaMenu } from '@/components/shared/mega-menu'
import { MegaFooter } from '@/components/shared/mega-footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function AdminLandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MegaMenu />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Powerful Admin Dashboard</h1>
                <p className="text-xl mb-6">Manage your entire e-commerce platform with ease and efficiency.</p>
                <Button size="lg" variant="secondary">Get Started</Button>
              </div>
              <div className="md:w-1/2">
                <Image src="/placeholder.svg?height=400&width=400" alt="Admin Dashboard" width={400} height={400} className="rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Admin Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'User Management', description: 'Easily manage user accounts and permissions.' },
                { title: 'Product Catalog', description: 'Add, edit, and organize your product catalog effortlessly.' },
                { title: 'Order Processing', description: 'Streamline order fulfillment and tracking.' },
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

        {/* Analytics Dashboard */}
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful Analytics</h2>
            <Card>
              <CardContent className="p-6">
                <Image src="/placeholder.svg?height=400&width=800" alt="Analytics Dashboard" width={800} height={400} className="w-full rounded-lg" />
                <div className="mt-8 text-center">
                  <p className="text-xl mb-4">Get insights into your business performance with our comprehensive analytics dashboard.</p>
                  <Button>Explore Analytics</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Admin Tools */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Essential Admin Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                'User Management',
                'Product Catalog',
                'Order Processing',
                'Inventory Management',
                'Content Management',
                'SEO Tools',
                'Payment Gateway',
                'Reports Generator',
              ].map((tool, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{tool}</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline">Access</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Admins Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Sarah Johnson', role: 'E-commerce Manager', comment: 'This admin dashboard has revolutionized how we manage our online store.' },
                { name: 'Michael Chen', role: 'Product Manager', comment: 'The analytics tools provide invaluable insights for our business decisions.' },
                { name: 'Emily Rodriguez', role: 'Customer Support Lead', comment: 'Managing customer inquiries and orders has never been easier.' },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>"{testimonial.comment}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Enterprise-Grade Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Role-Based Access Control', description: 'Granular control over user permissions and access.' },
                { title: 'Two-Factor Authentication', description: 'Enhanced security for admin accounts.' },
                { title: 'Audit Logs', description: 'Detailed logs of all admin actions for accountability.' },
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

        {/* CTA Section */}
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Take Control?</h2>
            <p className="text-xl mb-8">Start managing your e-commerce platform with our powerful admin tools.</p>
            <Button size="lg">Request a Demo</Button>
          </div>
        </section>

        {/* Integration Partners */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Integration Partners</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                'Shopify',
                'Stripe',
                'PayPal',
                'Google Analytics',
                'Mailchimp',
                'Zendesk',
                'Salesforce',
                'HubSpot',
              ].map((partner, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center justify-center h-24">
                    <span className="text-xl font-semibold">{partner}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { question: 'How do I add new admin users?', answer: 'You can add new admin users through the User Management section in the dashboard.' },
                { question: 'Can I customize the dashboard layout?', answer: 'Yes, the dashboard is fully customizable to suit your specific needs.' },
                { question: 'Is there a mobile app for admin management?', answer: 'Yes, we offer a mobile app for both iOS and Android devices.' },
                { question: 'How often are new features added?', answer: 'We release updates and new features on a monthly basis.' },
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

