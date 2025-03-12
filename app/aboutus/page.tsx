import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Bloogist",
  description: "Learn about the Bloogist team, our mission, and our values.",
}

export default function AboutUsPage() {
  return (
    <div className="container py-8 space-y-12">
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">About Us</h1>
        <p className="text-xl text-muted-foreground">
          We are a community of writers, developers, and tech enthusiasts sharing knowledge and insights.
        </p>
      </section>

      <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed mb-4">
            At BlogPlatform, we believe in the power of knowledge sharing. Our mission is to create a platform where
            experts can share their insights and where learners can find high-quality, trustworthy content.
          </p>
          <p className="text-lg leading-relaxed">
            We focus on technology, development, and digital innovation, bringing you the latest trends, tutorials, and
            deep dives into the topics that matter.
          </p>
        </div>
        <div className="relative aspect-square">
          <Image
            src="/placeholder.svg?height=400&width=400"
            alt="Our Mission"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1 relative aspect-square">
          <Image src="/placeholder.svg?height=400&width=400" alt="Our Team" fill className="object-cover rounded-lg" />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Team</h2>
          <p className="text-lg leading-relaxed mb-4">
            We are a diverse team of writers, developers, designers, and tech enthusiasts. With backgrounds ranging from
            software engineering to UX design, we bring a multitude of perspectives to our content.
          </p>
          <p className="text-lg leading-relaxed">
            Our contributors are industry professionals who are passionate about sharing their knowledge and helping
            others grow in their careers.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p>We prioritize depth and accuracy in our content, ensuring you get reliable information.</p>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
            <p>We believe knowledge should be accessible to everyone, regardless of their background.</p>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p>We foster a supportive community where learning and sharing go hand in hand.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

