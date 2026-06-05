import FeatureSection from './FeatureSection'
export default function LevelsSection() {
  return <FeatureSection
    id="section-levels"
    label="Role-Based Access"
    headline="One system. Every role."
    body="Switch seamlessly between Doctor, Nurse, Admin, and Lab views. Each role sees a tailored interface with the exact tools they need — nothing more, nothing less."
    stat="4"
    statLabel="role levels, one login"
    bullets={['Doctor view', 'Nurse charting mode', 'Admin dashboard', 'Lab integration panel']}
  />
}
