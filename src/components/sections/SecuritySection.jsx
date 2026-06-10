import FeatureSection from './FeatureSection'
export default function SecuritySection() {
  return <FeatureSection
    id="section-security"
    label="Customizable EMR"
    headline="Customizable Doctor Dashboard"
    body="Interactive doctor friendly UI that lets you personalize your workflow. Customize your own EMR for maximum efficiency."
    stat="Smart"
    statLabel="History Management"
    bullets={['Customize your own EMR', 'Interactive doctor friendly UI', 'Customizable doctor dashboard', 'Smart Telemedicine']}
  />
}
