import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Footer } from "../_components/Footer"
import { Header } from "../_components/Header"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <Header/>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy.</h1>
        
        <div className="space-y-8 text-gray-700">
          <div className="space-y-4">
            <p>
              Naai operates the{" "}
              <Link href="https://www.naai.softr.app" className="text-[#A31D42] hover:underline">
                www.naai.softr.app
              </Link>{" "}
              website, which provides the SERVICE.
            </p>
            <p>
              This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service, the{" "}
              <Link href="https://www.naai.softr.app" className="text-[#A31D42] hover:underline">
                www.naai.softr.app
              </Link>{" "}
              website.
            </p>
            <p>
              If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
            </p>
            <p>
              The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at{" "}
              <Link href="https://www.naai.softr.app" className="text-[#A31D42] hover:underline">
                www.naai.softr.app
              </Link>
              , unless otherwise defined in this Privacy Policy.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Information Collection and Use</h2>
            <p>
              For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and postal address. The information that we collect will be used to contact or identify you.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Log Data</h2>
            <p>
              We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Cookies</h2>
            <p>
              Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer's hard drive.
            </p>
            <p>
              Our website uses these "cookies" to collection information and to improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Service Providers</h2>
            <p>
              We may employ third-party companies and individuals due to the following reasons:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To facilitate our Service;</li>
              <li>To provide the Service on our behalf;</li>
              <li>To perform Service-related services; or</li>
              <li>To assist us in analyzing how our Service is used.</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

