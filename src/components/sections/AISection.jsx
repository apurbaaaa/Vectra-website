import FeatureSection from './FeatureSection'
export default function AISection() {
  return <FeatureSection
    id="section-ai"
    label="AI Clinical Support"
    headline="Your AI co-pilot in every consultation."
    body="Vectrah's embedded AI surfaces drug interactions, suggests ICD-10 codes, flags abnormal vitals, and drafts referral letters — all contextually, without interrupting your workflow."
    stat="3×"
    statLabel="faster billing cycle"
    bullets={['Automated ICD-10 / CPT coding', 'Drug interaction alerts', 'Differential diagnosis hints', 'Smart referral generation']}
  />
}
