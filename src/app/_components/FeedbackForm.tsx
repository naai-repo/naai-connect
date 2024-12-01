'use client'
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"


export function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      feedback: "",
    },
  })

  return (
    <section id="feedback" className="py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 rounded-md mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#A0163A]">
              Feedback / Testimonials
            </h2>
          </div>
          <p className="text-gray-600">
            Would love to hear your feedback, good or bad anything that help us Improve
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number *</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center border rounded-l px-3 bg-muted">
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAA10lEQVRIie2WQQ6CMBBFn0b0Hl7DRDfGK7jRO7h14UKv4M6NCzUxXsObekPjQhODtNMWSkl8STfT/p9pp5MpRKr5ZXUNPIEHcAQa4AKsgfwbspPQC3ADVsAMmPqzAq7W1l2rd8AeWAJTIAemwALYWVvnQcIHsI1dzvz5bm2vHtl6N6SsW2B+D6WiHyb0J4r+WNG/TPQDi35Uo0Mk+jEbHeLBF0Lk8Lc1/gPV3wV17aDuT9VtUN3v6paibhvqFqhuP+pxQz1mqcc49Tqi3hNU69jrBWXEqgU8oFoHAAAAAElFTkSuQmCC"
                          alt="India flag"
                          className="w-6 h-4 mr-2"
                        />
                        +91
                      </div>
                      <Input 
                        placeholder="Your phone number" 
                        type="tel" 
                        className="rounded-l-none"
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Your feedback"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-[#A0163A] hover:bg-[#A31D42]/90 text-white py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}

