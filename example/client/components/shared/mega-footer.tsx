import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const footerSections = [
  {
    title: 'Products',
    items: ['Featured', 'Categories', 'New Arrivals', 'Best Sellers', 'Special Offers'],
  },
  {
    title: 'Solutions',
    items: ['For Individuals', 'For Teams', 'For Enterprise', 'Case Studies', 'Resources'],
  },
  {
    title: 'Company',
    items: ['About Us', 'Careers', 'Press', 'Blog', 'Contact'],
  },
  {
    title: 'Support',
    items: ['Help Center', 'Documentation', 'Community', 'Training', 'Status'],
  },
]

export function MegaFooter() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
            <form className="space-y-2">
              <Input type="email" placeholder="Enter your email" />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; 2023 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

