import FeatureSection from './FeatureSection'
export default function STTSection() {
  return <FeatureSection
    id="section-stt"
    label="Voice Documentation"
    headline="Speak. Document. Done."
    body="Vectrah's real-time Speech-to-Text engine converts clinical dictation into structured SOAP notes instantly. No typing, no delay — just your voice and the record is complete."
    stat="Smart"
    statLabel="Speech to Text EMR"
    bullets={['Customize your own EMR', 'Multi level switching EMR', 'Smart Telemedicine', 'Smart history management']}
  />
}
