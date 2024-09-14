import Link from 'next/link';
import style from './footer.module.css';
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className={`${style.footer} py-12`}>
      <div className="container max-w-7xl pt-16 px-6 flex-grow mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Section */}
          <div className="mb-8 sm:mb-0">
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
          <div className="mb-8 sm:mb-0">
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
          <div className="mb-8 sm:mb-0">
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
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2">
              {['Bengaluru', 'Bihar', 'Kolkata', 'Add Your Restaurant'].map((city, index) => (
                <li key={index}>
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
            <p className="text-sm md:text-base">
              <span className="block md:inline md:ml-2">Call Us: {siteConfig.links.phone} {" |"}</span>
              <span className="block md:inline md:ml-2">{siteConfig.links.email}</span>
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center lg:justify-end space-x-4 md:space-x-6">
            {['Linkedin', 'Instagram', 'Facebook', 'Pinterest', 'Twitter'].map((social, index) => (
              <Link key={index} href="#" className="hover:text-gray-400 mb-2 md:mb-0">
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
