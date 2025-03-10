"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Note: Metadata must be exported from a Server Component, so we need to create a separate layout file
// This is just a comment to explain why we're not adding metadata directly here

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1000)
  }

  return (
    <div className="container py-8 space-y-12">
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-xl text-muted-foreground">Get in touch with our team. We'd love to hear from you!</p>
      </section>

      <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Get In Touch</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Have a question, suggestion, or want to contribute to our blog? We're here to help.
            </p>
            <div className="space-y-2">
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">v3rykawaii@gmail.copm</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Address</p>
              <p className="text-muted-foreground">Bangalore</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Working Hours</p>
              <p className="text-muted-foreground">Monday to Friday, 9AM to 5PM PST</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>Fill out the form below to get in touch with us.</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="bg-green-50 p-4 rounded-md text-green-800">
                <p className="font-medium">Thank you for your message!</p>
                <p>We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

