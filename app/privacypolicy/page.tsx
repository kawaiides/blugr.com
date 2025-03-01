import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | BlogPlatform",
  description: "Learn about how we collect, use, and protect your information at BlogPlatform.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>

      <div className="prose prose-gray max-w-none">
        <p className="lead">
          At BlogPlatform, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you visit our website.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We collect information that you provide directly to us when you register for an account, create or modify your
          profile, subscribe to our newsletter, or communicate with us. This information may include your name, email
          address, and profile picture.
        </p>
        <p>
          We also automatically collect certain information when you visit our website, including your IP address,
          browser type, operating system, referring URLs, access times, and pages viewed.
        </p>

        <h2>How We Use Your Information</h2>
        <p>We may use the information we collect for various purposes, including to:</p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Process and complete transactions</li>
          <li>Send you technical notices, updates, security alerts, and support messages</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Develop new products and services</li>
          <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
        </ul>

        <h2>Sharing of Information</h2>
        <p>We may share the information we collect in various ways, including:</p>
        <ul>
          <li>
            With vendors, consultants, and other service providers who need access to such information to carry out work
            on our behalf
          </li>
          <li>
            In response to a request for information if we believe disclosure is in accordance with any applicable law,
            regulation, or legal process
          </li>
          <li>
            If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights,
            property, and safety of BlogPlatform or others
          </li>
        </ul>

        <h2>Security</h2>
        <p>
          We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized
          access, disclosure, alteration, and destruction.
        </p>

        <h2>Your Choices</h2>
        <p>
          You can access and modify your account information by logging into your account settings. You can also
          unsubscribe from our marketing communications by following the instructions in those communications.
        </p>

        <h2>Cookies</h2>
        <p>
          Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your
          browser to remove or reject cookies. Please note that if you choose to remove or reject cookies, this could
          affect the availability and functionality of our services.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the
          date at the top of the policy and, in some cases, we may provide you with additional notice.
        </p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@blogplatform.com.</p>

        <p className="text-sm text-muted-foreground mt-8">Last updated: February 28, 2025</p>
      </div>
    </div>
  )
}

