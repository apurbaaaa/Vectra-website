import FeatureSection from './FeatureSection'
export default function STTSection() {
  return <FeatureSection
    id="section-stt"
    label="Voice Documentation"
    headline="Speak. Document. Done."
    body="Vectrah's real-time Speech-to-Text engine converts clinical dictation into structured SOAP notes instantly. No typing, no delay — just your voice and the record is complete."
    stat="98.7%"
    statLabel="accuracy on clinical vocabulary"
    bullets={['Real-time transcription', 'Auto-punctuation & formatting', 'Supports 12 languages', 'Works offline']}
  />
}
