# Selah - Faith & Belief Prayer Generator: Remaining TODO

Based on the original mind map, the following features and improvements remain to be implemented.

---

## Completed

- [x] Core concept: personalized prayer generator website
- [x] User input layer: identity, belief/faith selection, prayer intention
- [x] Prayer logic engine: universal spiritual core, faith-specific layer, rules & safeguards
- [x] Prayer template structure (opening, gratitude, reflection, intention, guidance, closing)
- [x] Belief mapping logic (address terms, tone presets, cultural metaphors)
- [x] Content safety guidelines (no attacks, no copyrighted text, compassionate language)
- [x] Text output: display, edit, copy, download
- [x] Audio output: Web Speech Synthesis with voice selection and speed control
- [x] Length options: short, medium, extended
- [x] Scripture quote with mini explanation per generated prayer
- [x] Mobile-first design with calm, neutral visuals
- [x] Clear ethical disclaimer
- [x] 3-5 click simple flow to prayer

---

## Remaining: High Priority

### Multi-language Support (Mind Map Section 10.5)
- [ ] Preferred language selection in the user input layer
- [ ] Separate prayer logic from language layer
- [ ] Translate intent, not word-for-word scripture
- [ ] Allow indigenous and mixed-language prayers

### Voice & Audio System (Mind Map Section 4)
- [ ] User voice upload (record or upload a sample)
- [ ] Family/friend voice upload with explicit consent checkbox
- [ ] Pre-made inspired-style voices (gentle elder, loving parent, wise teacher, soft narrator)
- [ ] Download audio as MP3/WAV file
- [ ] Adjustable tone settings (soft, calm, firm)
- [ ] Voice consent & usage rules: explain storage duration, option to delete immediately

### Personalization & Memory (Mind Map Section 6)
- [ ] User accounts / authentication
- [ ] Save user preferences (belief, tone, voice preferences)
- [ ] Prayer history (database-backed, not localStorage)
- [ ] Favorite prayers / bookmarking
- [ ] Daily or weekly prayer reminders (email or push notifications)

---

## Remaining: Medium Priority

### Additional Belief Systems
- [ ] "Other" religion option with free-text denomination input
- [ ] Cultural background (optional) input field
- [ ] Sub-denomination or sect selection for major religions

### Quick Prayer Mode (Mind Map Section 10.6)
- [ ] One-tap "quick prayer" that skips the full form
- [ ] Default to user's saved preferences for quick mode
- [ ] Quick prayer widget / shortcut on landing page

### Prayer Output Enhancements
- [ ] Private share link for prayers (optional)
- [ ] Replay option for audio
- [ ] Printable prayer cards (formatted PDF export)

### Accessibility (Mind Map Section 8)
- [ ] Low-data mode (text-only, minimal assets)
- [ ] Text-only option toggle
- [ ] Screen reader optimizations beyond current ARIA
- [ ] High contrast mode

---

## Remaining: Low Priority / Future Expansion (Mind Map Section 9)

- [ ] Multilingual prayers (full i18n support)
- [ ] Indigenous language support
- [ ] Community prayer sharing (moderated feed)
- [ ] Morning / night prayer modes (time-aware suggestions)
- [ ] Printable prayer cards with custom designs
- [ ] Premium voices or extended prayers (monetization)
- [ ] Downloadable prayer packs
- [ ] White-label option for institutions (churches, mosques, temples)

---

## Technical Debt & Infrastructure

- [ ] Database integration for prayer history and user data (Supabase or Neon)
- [ ] Real TTS API integration (e.g., ElevenLabs, Google Cloud TTS) to replace Web Speech Synthesis
- [ ] Rate limiting on prayer generation API
- [ ] Error boundary and fallback UI for API failures
- [ ] Analytics / usage tracking (privacy-respecting)
- [ ] Clear privacy policy page written in plain language
- [ ] Terms of service page
- [ ] Automated testing (unit + integration)

---

## Data & Privacy (Mind Map Section 10.7)

- [ ] Minimal data collection audit
- [ ] Clear privacy policy written in plain language
- [ ] Data deletion / export for users
- [ ] GDPR compliance if serving EU users
