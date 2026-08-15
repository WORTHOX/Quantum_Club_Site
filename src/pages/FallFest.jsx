import { useEffect } from 'react'
import './FallFest.css'

export default function FallFest() {
  useEffect(() => {
    document.title = 'IBM Qiskit Fall Fest 2026 — Symbiosis Quantum Club'
  }, [])

  return (
    <main className="fallfest-page">
      <div className="fallfest-container">
        
        {/* Hero Header */}
        <header className="fallfest-hero text-center">
          <span className="badge-spectrum badge-magenta mb-3">OCTOBER 15–17, 2026 ✦ IBM PARTNERSHIP</span>
          <h1 className="fallfest-title">
            IBM Qiskit Fall Fest <br />
            <span className="fallfest-title-accent">at Symbiosis</span>
          </h1>
          <p className="fallfest-subtitle">
            A three-day immersion into quantum computing. Learn the basics, code circuits on real IBM Quantum hardware, and build applications during our 48-hour hackathon.
          </p>
          <div className="mt-6">
            <a href="#register" className="fallfest-hero-btn">
              SECURE YOUR REGISTRATION SPOT →
            </a>
          </div>
        </header>

        {/* 3-Day Agenda Grid */}
        <section className="fallfest-agenda">
          <div className="section-heading text-center">
            <span className="badge-spectrum badge-violet mb-2">3-DAY PROGRAM</span>
            <h2>Event Schedule & Tracks</h2>
          </div>

          <div className="fallfest-grid">
            <div className="fallfest-card card-matte">
              <span className="badge-spectrum badge-cyan mb-3">DAY 1 ✦ FOUNDATIONS</span>
              <h3 className="fallfest-card__title">The Quantum Basics</h3>
              <p className="fallfest-card__desc">
                No prior experience required. Intro to linear algebra, qubit superposition, entanglement, and how to access IBM Cloud Quantum systems.
              </p>
            </div>

            <div className="fallfest-card card-matte">
              <span className="badge-spectrum badge-violet mb-3">DAY 2 ✦ LAB WORKSHOPS</span>
              <h3 className="fallfest-card__title">Qiskit Circuit Lab</h3>
              <p className="fallfest-card__desc">
                Hands-on programming. Build quantum algorithms, execute pulse calibrations, and run jobs directly on IBM Eagle & Osprey QPUs.
              </p>
            </div>

            <div className="fallfest-card card-matte">
              <span className="badge-spectrum badge-magenta mb-3">DAY 3 ✦ HACKATHON</span>
              <h3 className="fallfest-card__title">48-Hour Hackathon</h3>
              <p className="fallfest-card__desc">
                Form teams to solve real-world problems in QML, chemistry, and cryptography. Evaluated by IBM quantum researchers with prizes.
              </p>
            </div>
          </div>
        </section>

        {/* Registration Form Card */}
        <section className="fallfest-reg-section" id="register">
          <div className="fallfest-reg-card card-matte">
            <div className="text-center mb-6">
              <span className="badge-spectrum badge-magenta mb-2">LIMITED TO 150 PARTICIPANTS</span>
              <h2 className="fallfest-reg-title">Register For Fall Fest 2026</h2>
              <p className="fallfest-reg-subtitle">Reserve your seat for workshops, hardware access, and hackathon mentoring.</p>
            </div>

            <form className="fallfest-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">FULL NAME</label>
                <input type="text" id="name" placeholder="John Doe" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="email">COLLEGE EMAIL ADDRESS</label>
                <input type="email" id="email" placeholder="john@example.edu" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="year">YEAR OF STUDY</label>
                <select id="year" className="form-input">
                  <option>1st Year (Freshman)</option>
                  <option>2nd Year (Sophomore)</option>
                  <option>3rd Year (Junior)</option>
                  <option>4th Year (Senior)</option>
                </select>
              </div>
              <button type="submit" className="form-submit-btn">
                COMPLETE REGISTRATION NOW
              </button>
            </form>
          </div>
        </section>

      </div>
    </main>
  )
}
