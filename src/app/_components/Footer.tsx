import Image from "next/image"
import Link from "next/link"
import { Copyright, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#A0163A] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <Link href="/" className="mb-4 md:mb-0">
            <img
              src="https://assets.softr-files.com/applications/b4b1194d-45a3-42aa-b80f-b0bbaa747a9f/assets/658f81c2-0ad6-4a9f-a528-177c40e921ab.png"
              alt="NAAI Logo"
              width={120}
              height={50}
              className="bg-blend-color-burn"
            />
          </Link>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="hover:opacity-80">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="#feedback" className="hover:opacity-80">
                  CONTACT US
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:opacity-80">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="h-px bg-white/20 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0 flex">
            <Copyright/> {new Date().getFullYear()} Digiblip Private Limited. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link 
              href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <Instagram size={24} />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
