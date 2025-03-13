import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Bloogist",
  description: "Govern your use of Bloogist's platform for global insights and content contribution.",
}

export default function TermsOfServicePage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>

      <div className="prose prose-gray max-w-none">
        <p className="lead">
          By accessing Bloogist.com ("the Platform"), you agree to these legally binding terms governing your use of our
          global insights repository and content contribution services.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <ul>
          <li>Applies to all visitors, readers, and content contributors</li>
          <li>Constitutes a legal agreement between you and Bloogist Media Ltd</li>
          <li>Supplemented by our Privacy Policy and Content Guidelines</li>
        </ul>

        <h2>2. User Responsibilities</h2>
        <p><strong>All Users Must:</strong></p>
        <ul>
          <li>Maintain accurate account information</li>
          <li>Not engage in automated content scraping</li>
          <li>Respect intellectual property rights</li>
          <li>Be at least 16 years old (13+ with parental consent)</li>
        </ul>

        <p><strong>Contributors Additionally Agree To:</strong></p>
        <ul>
          <li>Verify factual claims with primary sources</li>
          <li>Disclose conflicts of interest</li>
          <li>Maintain content update cadence for evolving stories</li>
          <li>Respond to fact-checking requests within 72 hours</li>
        </ul>

        <h2>3. Content Guidelines</h2>
        <ul>
          <li>Prohibited content includes:
            <ul>
              <li>Unverified conspiracy theories</li>
              <li>AI-generated content without human verification</li>
              <li>Plagiarized news reports</li>
              <li>Commercial advertisements disguised as articles</li>
            </ul>
          </li>
          <li>We reserve right to:
            <ul>
              <li>Edit headlines for clarity</li>
              <li>Add contextual updates to older articles</li>
              <li>Demote disputed content in search rankings</li>
            </ul>
          </li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <ul>
          <li>Bloogist retains all platform design and infrastructure rights</li>
          <li>Contributors maintain ownership of original content</li>
          <li>Grant Bloogist perpetual license to:
            <ul>
              <li>Publish and archive content</li>
              <li>Create derivative works for fact-checking</li>
              <li>Distribute through partner news networks</li>
            </ul>
          </li>
        </ul>

        <h2>5. Disclaimers</h2>
        <ul>
          <li>Content provided "as-is" without warranty</li>
          <li>Opinion pieces marked clearly ≠ editorial stance</li>
          <li>Breaking news content may contain unverified elements</li>
          <li>Third-party links subject to external policies</li>
        </ul>

        <h2>6. Limitation of Liability</h2>
        <ul>
          <li>Not liable for:
            <ul>
              <li>Decisions made based on platform content</li>
              <li>Comment section interactions</li>
              <li>Contributor payment disputes</li>
              <li>Data loss during server migrations</li>
            </ul>
          </li>
        </ul>

        <h2>7. Termination</h2>
        <ul>
          <li>We may suspend accounts for:
            <ul>
              <li>Repeated factual inaccuracies</li>
              <li>Article vandalism</li>
              <li>Excessive promotional content</li>
              <li>Algorithm gaming attempts</li>
            </ul>
          </li>
          <li>Appeal process available within 30 days</li>
        </ul>

        <h2>8. Governing Law</h2>
        <ul>
          <li>Subject to laws of England and Wales</li>
          <li>Dispute resolution through London arbitration</li>
          <li>EU citizens retain GDPR protections</li>
        </ul>

        <h2>9. Updates to Terms</h2>
        <ul>
          <li>Major changes announced via:
            <ul>
              <li>Platform banner notifications</li>
              <li>Contributor dashboard alerts</li>
              <li>Registered email communications</li>
            </ul>
          </li>
          <li>Continued use constitutes acceptance</li>
        </ul>

        <h2>10. Contact</h2>
        <p>
          Legal Inquiries: legal@bloogist.com<br/>
          Content Disputes: compliance@bloogist.com<br/>
          Mailing Address: Bloogist Media Ltd, Legal Department, Press Quarter, London EC4Y 0HY
        </p>

        <p className="text-sm text-muted-foreground mt-8">
          Effective Date: July 25, 2023 | Last Revised: October 15, 2023
        </p>
      </div>
    </div>
  )
}