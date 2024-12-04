import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SalonSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
        
        {/* Opening Hours */}
        <Skeleton className="h-10 w-64 rounded-full" />
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>

        {/* Images Section - Only visible on desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 my-6">
          <Skeleton className="h-64 w-full col-span-2" />
          <div className="col-span-1 space-y-4">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>

        {/* Logo - Mobile only */}
        <div className="md:hidden">
          <Skeleton className="h-48 w-full" />
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
            {["Services", "Artists", "Reviews"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                <Skeleton className="h-4 w-16" />
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Gender Filter */}
        <div className="flex gap-4 my-6">
          <Skeleton className="h-10 w-24 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
          <div className="ml-auto">
            <Skeleton className="h-10 w-64 rounded-lg" />
          </div>
        </div>

        {/* Categories */}
        <div>
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full" />
            ))}
          </div>
        </div>

        {/* Service Items */}
        <div className="space-y-4 mt-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-9 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

