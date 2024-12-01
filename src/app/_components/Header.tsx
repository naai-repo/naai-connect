import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white ">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img
            src="https://assets.softr-files.com/applications/b4b1194d-45a3-42aa-b80f-b0bbaa747a9f/assets/b4d8a456-ec56-454b-8949-33341e58d7b7.png"
            alt="NAAI Logo"
            width={120}
            height={50}
          />
        </Link>
        <Button 
          variant="ghost" 
          className="text-[#A31D42] hover:text-[#A31D42]/90"
        >
          Set Up My Business
        </Button>
      </div>
    </header>
  )
}
