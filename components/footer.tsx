import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container grid gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <h3 className="text-lg font-medium">BlogPlatform</h3>
          <p className="text-sm text-muted-foreground">
            Sharing knowledge and insights on technology, programming, and more.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacypolicy" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/termsofservice" className="text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/aboutus" className="text-muted-foreground hover:text-foreground">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contactus" className="text-muted-foreground hover:text-foreground">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 border-t pt-8">
        <p className="text-center text-sm text-muted-foreground">© 2025 BlogPlatform. All rights reserved.</p>
      </div>
    </footer>
  )
}

