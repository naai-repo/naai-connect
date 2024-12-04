import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BrandsSection } from "./_components/BrandsSection"
import { FeedbackForm } from "./_components/FeedbackForm"
import { Footer } from "./_components/Footer"
import { Header } from "./_components/Header"

const artist = [
  "https://assets.softr-files.com/applications/b4b1194d-45a3-42aa-b80f-b0bbaa747a9f/assets/e6f5537b-d421-401f-8867-1e9ed2bab621.jpeg",
  "https://assets.softr-files.com/applications/b4b1194d-45a3-42aa-b80f-b0bbaa747a9f/assets/0666092a-d17a-4425-98e1-51896421a22f.jpeg",
  "https://assets.softr-files.com/applications/b4b1194d-45a3-42aa-b80f-b0bbaa747a9f/assets/a89596af-ae75-4697-a7ec-40772729342c.jpeg"
]


export default function Page() {
  return (
    <div className="min-h-screen">
      {/* Sticky Header */}
      <Header/>
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <img
          src="https://assets.softr-files.com/applications/b4b1194d-45a3-42aa-b80f-b0bbaa747a9f/assets/49def5c6-08fd-40fb-a60e-d8d4272e522a.png"
          alt="Salon Interior"
          width={1920}
          height={600}
          className="absolute inset-0 object-cover w-full h-full brightness-50"
        />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Experience Real Salon
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Be the first to get early access to hundreds of Stylists at top salons in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-[#A0163A] hover:bg-[#A31D42]/90 text-white px-8 py-6"
            >
              Book My Stylist
            </Button>
            <Button 
              className="bg-[#A0163A] hover:bg-[#A31D42]/90 text-white px-8 py-6"
            >
              Download The App
            </Button>
          </div>
        </div>
      </section>

      {/* Find Stylist Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#A0163A] mb-4">
          Find the Right Stylist
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Stop choosing random stylists and join 300+ other customers who found their right stylist with NAAI
        </p>
        
        {/* Stylist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artist.map((item,ind) => (
            <div key={ind} className="rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <img
                  src={item}
                  alt={`Stylist ${ind}`}
                  width={384}
                  height={256}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Professional Styling</h3>
                <p className="text-gray-600">
                  Expert stylists ready to transform your look with the latest trends and techniques.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Brands Section */}
      <BrandsSection />

      {/* Feedback Form Section */}
      <FeedbackForm />

      <Footer />
    </div>
  )
}

