import FeatureSection from './FeatureSection'
export default function SecuritySection() {
  return <FeatureSection
    id="section-security"
    label="Security & Compliance"
    headline="HIPAA-compliant. Bank-grade encryption."
    body="Patient data is encrypted at rest and in transit with AES-256. Vectrah is fully HIPAA-compliant with automatic audit logs, role-based data access, and zero-trust architecture."
    stat="SOC 2"
    statLabel="Type II Certified"
    bullets={['AES-256 encryption', 'Automatic HIPAA audit logs', 'Zero-trust access model', '99.99% uptime SLA']}
  />
}
