import Link from 'next/link';
import style from './footer.module.css';
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className={`${style.footer} py-12`}>
      <div className="container max-w-7xl pt-16 px-6 flex-grow mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul>
              <li className="mb-2">
                <Link href="/about" className="hover:text-gray-400">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-gray-400">
                  Work With Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-gray-400">
                  Add Your Restaurant
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul>
              <li className="mb-2">
                <Link href="#" className="hover:text-gray-400">
                  Contact us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-gray-400">
                  Help & Support
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-gray-400">
                  Partner with us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-gray-400">
                  Ride with us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul>
              <li className="mb-2">
                <Link href="/terms-conditions" className="hover:text-gray-400">
                  Terms & Conditions
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/cookie-policy" className="hover:text-gray-400">
                  Cookie Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/privacy" className="hover:text-gray-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Available Cities Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Available in:</h3>
            <ul>
              {['Bengaluru', 'Bihar', 'Kolkata', 'Add Your Restaurant'].map((city, index) => (
                <li key={index} className="mb-2">
                  <Link href="#" className="hover:text-gray-400">
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
            {/* <p className="mt-4">5+ cities</p> */}
          </div>
        </div>

        {/* Social & Extra Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center">
          <div className="text-center lg:text-left mb-4 lg:mb-0">
            <p>© 2024 FoodKloud</p>
            <p>Life at FoodKloud | Explore with FoodKloud | Call Us: {siteConfig.links.phone} | {siteConfig.links.email}</p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {['Linkedin', 'Instagram', 'Facebook', 'Pinterest', 'Twitter'].map((social, index) => (
              <Link key={index} href="#" className="hover:text-gray-400">
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
