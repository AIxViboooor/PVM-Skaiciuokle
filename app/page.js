'use client';

import { useState } from 'react';

// Ad Component - Replace with your AdSense code after approval
const AdBanner = ({ slot, style = {} }) => (
  <div style={{ ...styles.adContainer, ...style }}>
    <div style={styles.adPlaceholder}>
      <span style={styles.adText}>REKLAMA</span>
    </div>
  </div>
);

// FAQ Data
const faqData = [
  {
    question: 'Kas yra PVM?',
    answer: 'PVM (pridėtinės vertės mokestis) – tai vartojimo mokestis, taikomas prekėms ir paslaugoms Lietuvoje bei visoje Europos Sąjungoje. Mokestį moka galutinis vartotojas, tačiau jį surenka ir sumoka valstybei verslo subjektai.',
  },
  {
    question: 'Koks yra standartinis PVM tarifas Lietuvoje?',
    answer: 'Standartinis PVM tarifas Lietuvoje yra 21%. Šis tarifas taikomas daugumai prekių ir paslaugų, įskaitant elektroniką, drabužius, baldus ir daugelį kitų kasdienių prekių.',
  },
  {
    question: 'Kada taikomas 9% PVM tarifas?',
    answer: '9% lengvatinis PVM tarifas Lietuvoje taikomas: keleivių vežimo paslaugoms, apgyvendinimo paslaugoms (viešbučiai, nakvynės namai), šildymui gyvenamosioms patalpoms, kai kurioms kultūros ir sporto paslaugoms.',
  },
  {
    question: 'Kada taikomas 5% PVM tarifas?',
    answer: '5% lengvatinis PVM tarifas taikomas: vaistams ir medicinos prekėms, knygoms ir periodiniams leidiniams (įskaitant elektroninius), neįgaliųjų techninės pagalbos priemonėms.',
  },
  {
    question: 'Kaip apskaičiuoti PVM nuo bendros sumos?',
    answer: 'Norint išskaičiuoti PVM iš bendros sumos (su PVM), reikia sumą padalinti iš 1,21 (jei PVM 21%). Pavyzdžiui: 121 € ÷ 1,21 = 100 € (suma be PVM). PVM suma: 121 € - 100 € = 21 €.',
  },
  {
    question: 'Kaip pridėti PVM prie sumos be PVM?',
    answer: 'Norint pridėti PVM prie sumos be PVM, reikia sumą padauginti iš PVM tarifo. Pavyzdžiui: 100 € × 0,21 = 21 € (PVM suma). Galutinė suma su PVM: 100 € + 21 € = 121 €.',
  },
  {
    question: 'Kas yra PVM mokėtojas?',
    answer: 'PVM mokėtoju Lietuvoje privalo registruotis įmonė ar asmuo, kurio pajamos per 12 mėnesių viršija 45 000 eurų. Mažesnės įmonės gali registruotis savanoriškai, jei tai naudinga jų verslui.',
  },
  {
    question: 'Kokie yra PVM lengvatų atvejai?',
    answer: 'PVM lengvatos taikomos: eksportui (0%), švietimo ir sveikatos paslaugoms (neapmokestinama), finansinėms paslaugoms, draudimui, nekilnojamojo turto nuomai ir kt. Tikslų sąrašą rasite VMI puslapyje.',
  },
];

export default function PVMSkaiciuokle() {
  // VAT Calculator State
  const [amount, setAmount] = useState('');
  const [vatMode, setVatMode] = useState('exclude');
  const [vatRate, setVatRate] = useState(21);
  const [vatResult, setVatResult] = useState(null);

  // Percentage Calculator States
  const [percentOf, setPercentOf] = useState({ percent: '', value: '' });
  const [whatPercent, setWhatPercent] = useState({ part: '', whole: '' });
  const [percentChange, setPercentChange] = useState({ from: '', to: '' });
  const [percentResults, setPercentResults] = useState({
    percentOf: null,
    whatPercent: null,
    percentChange: null,
  });

  // FAQ State
  const [openFaq, setOpenFaq] = useState(null);

  // Number formatting with thousand separators
  const formatNumber = (num) => {
    return new Intl.NumberFormat('lt-LT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  // VAT Calculation
  const calculateVat = () => {
    const num = parseFloat(amount.replace(/\s/g, '').replace(',', '.'));
    if (isNaN(num)) return;

    const rate = vatRate / 100;
    let netAmount, vatAmount, grossAmount;

    if (vatMode === 'exclude') {
      grossAmount = num;
      netAmount = num / (1 + rate);
      vatAmount = grossAmount - netAmount;
    } else {
      netAmount = num;
      vatAmount = num * rate;
      grossAmount = num + vatAmount;
    }

    setVatResult({
      netAmount: formatNumber(netAmount),
      vatAmount: formatNumber(vatAmount),
      grossAmount: formatNumber(grossAmount),
    });
  };

  // Percentage Calculations
  const calcPercentOf = () => {
    const p = parseFloat(percentOf.percent.replace(/\s/g, '').replace(',', '.'));
    const v = parseFloat(percentOf.value.replace(/\s/g, '').replace(',', '.'));
    if (!isNaN(p) && !isNaN(v)) {
      setPercentResults((prev) => ({
        ...prev,
        percentOf: formatNumber((p / 100) * v),
      }));
    }
  };

  const calcWhatPercent = () => {
    const part = parseFloat(whatPercent.part.replace(/\s/g, '').replace(',', '.'));
    const whole = parseFloat(whatPercent.whole.replace(/\s/g, '').replace(',', '.'));
    if (!isNaN(part) && !isNaN(whole) && whole !== 0) {
      setPercentResults((prev) => ({
        ...prev,
        whatPercent: formatNumber((part / whole) * 100),
      }));
    }
  };

  const calcPercentChange = () => {
    const from = parseFloat(percentChange.from.replace(/\s/g, '').replace(',', '.'));
    const to = parseFloat(percentChange.to.replace(/\s/g, '').replace(',', '.'));
    if (!isNaN(from) && !isNaN(to) && from !== 0) {
      const change = ((to - from) / from) * 100;
      setPercentResults((prev) => ({
        ...prev,
        percentChange: formatNumber(change),
      }));
    }
  };

  return (
    <div style={styles.container}>
      {/* Background Pattern */}
      <div style={styles.backgroundPattern} />
      
      {/* Lithuanian Flag Accent Bar */}
      <div style={styles.flagBar}>
        <div style={styles.flagYellow} />
        <div style={styles.flagGreen} />
        <div style={styles.flagRed} />
      </div>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <svg viewBox="0 0 48 48" style={{ width: 44, height: 44 }}>
              {/* Calculator icon with Lithuanian colors */}
              <rect x="8" y="6" width="32" height="36" rx="4" fill="#1a1a1a" stroke="#D4A82A" strokeWidth="2"/>
              <rect x="12" y="10" width="24" height="10" rx="2" fill="#D4A82A"/>
              <circle cx="16" cy="26" r="2.5" fill="#2E7D4A"/>
              <circle cx="24" cy="26" r="2.5" fill="#2E7D4A"/>
              <circle cx="32" cy="26" r="2.5" fill="#2E7D4A"/>
              <circle cx="16" cy="34" r="2.5" fill="#BE3A34"/>
              <circle cx="24" cy="34" r="2.5" fill="#BE3A34"/>
              <circle cx="32" cy="34" r="2.5" fill="#BE3A34"/>
            </svg>
          </div>
          <div style={styles.logoText}>
            <span style={styles.brandName}>Skaičiuok<span style={styles.brandAccent}>PVM</span></span>
            <span style={styles.brandTagline}>Lietuvos PVM Skaičiuoklė</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        
        {/* Top Ad Banner */}
        <AdBanner slot="1234567890" />

        {/* VAT Calculator Section */}
        <section style={styles.calculatorSection}>
          <div style={styles.sectionHeader}>
            <h1 style={styles.mainTitle}>PVM Skaičiuoklė</h1>
            <p style={styles.subtitle}>
              Greitas ir tikslus PVM skaičiavimas Lietuvoje
            </p>
          </div>

          <div style={styles.calculatorCard}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Suma (€)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Įveskite sumą"
                style={styles.input}
                onKeyPress={(e) => e.key === 'Enter' && calculateVat()}
              />
            </div>

            <div style={styles.modeSelector}>
              <button
                onClick={() => setVatMode('exclude')}
                style={{
                  ...styles.modeButton,
                  ...(vatMode === 'exclude' ? styles.modeButtonActive : {}),
                }}
              >
                <span style={styles.modeIcon}>−</span>
                Atimti PVM
              </button>
              <button
                onClick={() => setVatMode('add')}
                style={{
                  ...styles.modeButton,
                  ...(vatMode === 'add' ? styles.modeButtonActive : {}),
                }}
              >
                <span style={styles.modeIcon}>+</span>
                Pridėti PVM
              </button>
            </div>

            <div style={styles.rateSelector}>
              <label style={styles.label}>PVM tarifas</label>
              <div style={styles.rateButtons}>
                {[21, 9, 5, 0].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setVatRate(rate)}
                    style={{
                      ...styles.rateButton,
                      ...(vatRate === rate ? styles.rateButtonActive : {}),
                    }}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            <button onClick={calculateVat} style={styles.calculateButton}>
              SKAIČIUOTI
            </button>

            {vatResult && (
              <div style={styles.resultCard}>
                <div style={styles.resultRow}>
                  <span style={styles.resultLabel}>Suma be PVM:</span>
                  <span style={styles.resultValue}>€{vatResult.netAmount}</span>
                </div>
                <div style={styles.resultRowHighlight}>
                  <span style={styles.resultLabel}>PVM ({vatRate}%):</span>
                  <span style={styles.resultValueHighlight}>
                    €{vatResult.vatAmount}
                  </span>
                </div>
                <div style={styles.resultRow}>
                  <span style={styles.resultLabel}>Suma su PVM:</span>
                  <span style={styles.resultValue}>
                    €{vatResult.grossAmount}
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Middle Ad Banner */}
        <AdBanner slot="0987654321" style={{ margin: '32px 0' }} />

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerIcon}>%</span>
          <div style={styles.dividerLine} />
        </div>

        {/* Percentage Calculator Section */}
        <section style={styles.percentSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Procentų Skaičiuoklė</h2>
            <p style={styles.sectionSubtitle}>Greiti procentų skaičiavimai</p>
          </div>

          <div style={styles.percentGrid}>
            {/* What is X% of Y */}
            <div style={styles.percentCard}>
              <div style={styles.percentCardHeader}>
                <span style={styles.percentCardIcon}>÷</span>
                <span style={styles.percentCardTitle}>Kiek yra X% nuo Y?</span>
              </div>
              <div style={styles.percentForm}>
                <span style={styles.percentText}>Kiek yra</span>
                <input
                  type="number"
                  value={percentOf.percent}
                  onChange={(e) =>
                    setPercentOf((p) => ({ ...p, percent: e.target.value }))
                  }
                  style={styles.percentInput}
                  placeholder="X"
                />
                <span style={styles.percentText}>% nuo</span>
                <input
                  type="number"
                  value={percentOf.value}
                  onChange={(e) =>
                    setPercentOf((p) => ({ ...p, value: e.target.value }))
                  }
                  style={styles.percentInput}
                  placeholder="Y"
                />
                <span style={styles.percentText}>?</span>
              </div>
              <div style={styles.percentActions}>
                <button onClick={calcPercentOf} style={styles.percentButton}>
                  SKAIČIUOTI
                </button>
                {percentResults.percentOf !== null && (
                  <div style={styles.percentResult}>
                    {percentResults.percentOf}
                  </div>
                )}
              </div>
            </div>

            {/* X is what percent of Y */}
            <div style={styles.percentCard}>
              <div style={styles.percentCardHeader}>
                <span style={styles.percentCardIcon}>?</span>
                <span style={styles.percentCardTitle}>
                  X yra kiek procentų nuo Y?
                </span>
              </div>
              <div style={styles.percentForm}>
                <input
                  type="number"
                  value={whatPercent.part}
                  onChange={(e) =>
                    setWhatPercent((p) => ({ ...p, part: e.target.value }))
                  }
                  style={styles.percentInput}
                  placeholder="X"
                />
                <span style={styles.percentText}>yra kiek % nuo</span>
                <input
                  type="number"
                  value={whatPercent.whole}
                  onChange={(e) =>
                    setWhatPercent((p) => ({ ...p, whole: e.target.value }))
                  }
                  style={styles.percentInput}
                  placeholder="Y"
                />
                <span style={styles.percentText}>?</span>
              </div>
              <div style={styles.percentActions}>
                <button onClick={calcWhatPercent} style={styles.percentButton}>
                  SKAIČIUOTI
                </button>
                {percentResults.whatPercent !== null && (
                  <div style={styles.percentResult}>
                    {percentResults.whatPercent}%
                  </div>
                )}
              </div>
            </div>

            {/* Percentage increase/decrease */}
            <div style={styles.percentCard}>
              <div style={styles.percentCardHeader}>
                <span style={styles.percentCardIcon}>↕</span>
                <span style={styles.percentCardTitle}>
                  Procentinis pokytis nuo X iki Y
                </span>
              </div>
              <div style={styles.percentForm}>
                <span style={styles.percentText}>nuo</span>
                <input
                  type="number"
                  value={percentChange.from}
                  onChange={(e) =>
                    setPercentChange((p) => ({ ...p, from: e.target.value }))
                  }
                  style={styles.percentInput}
                  placeholder="X"
                />
                <span style={styles.percentText}>iki</span>
                <input
                  type="number"
                  value={percentChange.to}
                  onChange={(e) =>
                    setPercentChange((p) => ({ ...p, to: e.target.value }))
                  }
                  style={styles.percentInput}
                  placeholder="Y"
                />
                <span style={styles.percentText}>?</span>
              </div>
              <div style={styles.percentActions}>
                <button onClick={calcPercentChange} style={styles.percentButton}>
                  SKAIČIUOTI
                </button>
                {percentResults.percentChange !== null && (
                  <div
                    style={{
                      ...styles.percentResult,
                      color:
                        parseFloat(percentResults.percentChange.replace(',', '.').replace(/\s/g, '')) >= 0
                          ? '#2E7D4A'
                          : '#BE3A34',
                    }}
                  >
                    {parseFloat(percentResults.percentChange.replace(',', '.').replace(/\s/g, '')) >= 0 ? '+' : ''}
                    {percentResults.percentChange}%
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section style={styles.infoSection}>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>Lietuvos PVM Tarifai 2024-2025</h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.infoRate}>21%</span>
                <span style={styles.infoDesc}>Standartinis tarifas – daugumai prekių ir paslaugų</span>
              </div>
              <div style={styles.infoItem}>
                <span style={{...styles.infoRate, color: '#2E7D4A'}}>9%</span>
                <span style={styles.infoDesc}>Keleivių vežimas, apgyvendinimas, šildymas</span>
              </div>
              <div style={styles.infoItem}>
                <span style={{...styles.infoRate, color: '#BE3A34'}}>5%</span>
                <span style={styles.infoDesc}>Vaistai, knygos, medicinos prekės</span>
              </div>
              <div style={styles.infoItem}>
                <span style={{...styles.infoRate, color: '#888888'}}>0%</span>
                <span style={styles.infoDesc}>Eksportas, tarptautiniai pervežimai</span>
              </div>
            </div>
          </div>
        </section>

        {/* Ad before FAQ */}
        <AdBanner slot="1122334455" style={{ margin: '32px 0' }} />

        {/* FAQ Section */}
        <section style={styles.faqSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Dažniausiai Užduodami Klausimai</h2>
            <p style={styles.sectionSubtitle}>Viskas apie PVM Lietuvoje</p>
          </div>

          <div style={styles.faqList}>
            {faqData.map((faq, index) => (
              <div key={index} style={styles.faqItem}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  style={styles.faqQuestion}
                >
                  <span style={styles.faqQuestionText}>{faq.question}</span>
                  <span style={{
                    ...styles.faqIcon,
                    transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}>
                    ▼
                  </span>
                </button>
                {openFaq === index && (
                  <div style={styles.faqAnswer}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Ad Banner */}
        <AdBanner slot="5544332211" style={{ marginTop: '32px' }} />

      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerBrand}>
            <span style={styles.footerLogo}>Skaičiuok<span style={{color: '#2E7D4A'}}>PVM</span></span>
          </div>
          <p style={styles.footerDisclaimer}>
            Ši skaičiuoklė skirta tik informaciniams tikslams. 
            Oficialiai apskaitai kreipkitės į kvalifikuotą buhalterį arba VMI.
          </p>
          <div style={styles.footerLinks}>
            <a href="https://www.vmi.lt" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>
              VMI.lt
            </a>
            <span style={styles.footerDivider}>•</span>
            <a href="https://e-seimas.lrs.lt" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>
              Teisės aktai
            </a>
          </div>
          <p style={styles.footerCopyright}>
            © {new Date().getFullYear()} PVM Skaičiuoklė. Visos teisės saugomos.
          </p>
        </div>
        
        {/* Bottom Flag Bar */}
        <div style={styles.flagBarBottom}>
          <div style={styles.flagYellow} />
          <div style={styles.flagGreen} />
          <div style={styles.flagRed} />
        </div>
      </footer>
    </div>
  );
}

// Lithuanian Flag Colors (official)
// Yellow: #FDB913 (using slightly muted #D4A82A for elegance)
// Green: #006A44 (using slightly muted #2E7D4A for elegance)  
// Red: #C1272D (using slightly muted #BE3A34 for elegance)

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(145deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)',
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 80%, rgba(212, 168, 42, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(46, 125, 74, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(190, 58, 52, 0.02) 0%, transparent 70%)
    `,
    pointerEvents: 'none',
  },
  flagBar: {
    display: 'flex',
    height: '4px',
    width: '100%',
  },
  flagBarBottom: {
    display: 'flex',
    height: '3px',
    width: '100%',
    marginTop: '32px',
  },
  flagYellow: {
    flex: 1,
    background: 'linear-gradient(90deg, #D4A82A 0%, #E8BC30 100%)',
  },
  flagGreen: {
    flex: 1,
    background: 'linear-gradient(90deg, #2E7D4A 0%, #3D9960 100%)',
  },
  flagRed: {
    flex: 1,
    background: 'linear-gradient(90deg, #BE3A34 0%, #D4433C 100%)',
  },
  header: {
    padding: '24px 32px',
    borderBottom: '1px solid rgba(212, 168, 42, 0.15)',
    position: 'relative',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  logoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandName: {
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '1px',
    color: '#D4A82A',
  },
  brandAccent: {
    color: '#2E7D4A',
  },
  brandTagline: {
    fontSize: '11px',
    letterSpacing: '1.5px',
    color: '#888888',
    textTransform: 'uppercase',
    marginTop: '2px',
  },
  main: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '48px 24px',
    position: 'relative',
  },
  calculatorSection: {
    marginBottom: '48px',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  mainTitle: {
    fontSize: '42px',
    fontWeight: '300',
    letterSpacing: '2px',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #ffffff 0%, #D4A82A 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '14px',
    color: '#888888',
    letterSpacing: '1px',
  },
  calculatorCard: {
    background: 'linear-gradient(145deg, #1e1e1e 0%, #171717 100%)',
    borderRadius: '16px',
    padding: '32px',
    border: '1px solid rgba(212, 168, 42, 0.12)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
  },
  inputGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '1px',
    color: '#D4A82A',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    padding: '16px 20px',
    fontSize: '24px',
    fontWeight: '300',
    background: 'rgba(0, 0, 0, 0.4)',
    border: '2px solid rgba(212, 168, 42, 0.2)',
    borderRadius: '8px',
    color: '#ffffff',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  modeSelector: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
  },
  modeButton: {
    flex: 1,
    padding: '16px',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    background: 'rgba(0, 0, 0, 0.3)',
    border: '2px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    color: '#888888',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  modeButtonActive: {
    background: 'rgba(212, 168, 42, 0.12)',
    borderColor: '#D4A82A',
    color: '#D4A82A',
  },
  modeIcon: {
    fontSize: '18px',
    fontWeight: '700',
  },
  rateSelector: {
    marginBottom: '24px',
  },
  rateButtons: {
    display: 'flex',
    gap: '8px',
  },
  rateButton: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    background: 'rgba(0, 0, 0, 0.3)',
    border: '2px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    color: '#888888',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  rateButtonActive: {
    background: 'rgba(212, 168, 42, 0.12)',
    borderColor: '#D4A82A',
    color: '#D4A82A',
  },
  calculateButton: {
    width: '100%',
    padding: '18px',
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '2px',
    background: 'linear-gradient(135deg, #D4A82A 0%, #B8922A 100%)',
    border: 'none',
    borderRadius: '8px',
    color: '#0f0f0f',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(212, 168, 42, 0.25)',
  },
  resultCard: {
    marginTop: '24px',
    padding: '24px',
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '12px',
    border: '1px solid rgba(212, 168, 42, 0.15)',
  },
  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },
  resultRowHighlight: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    margin: '8px 0',
    background: 'rgba(46, 125, 74, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(46, 125, 74, 0.3)',
  },
  resultLabel: {
    fontSize: '14px',
    color: '#888888',
  },
  resultValue: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#ffffff',
  },
  resultValueHighlight: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#2E7D4A',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    margin: '48px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background:
      'linear-gradient(90deg, transparent 0%, rgba(212, 168, 42, 0.25) 50%, transparent 100%)',
  },
  dividerIcon: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#D4A82A',
    opacity: 0.4,
  },
  percentSection: {},
  sectionTitle: {
    fontSize: '28px',
    fontWeight: '300',
    letterSpacing: '1px',
    marginBottom: '8px',
    color: '#ffffff',
  },
  sectionSubtitle: {
    fontSize: '14px',
    color: '#888888',
  },
  percentGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  percentCard: {
    background: 'linear-gradient(145deg, #1e1e1e 0%, #171717 100%)',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid rgba(212, 168, 42, 0.08)',
  },
  percentCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  percentCardIcon: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(212, 168, 42, 0.12)',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '700',
    color: '#D4A82A',
  },
  percentCardTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: '0.5px',
  },
  percentForm: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px',
  },
  percentText: {
    fontSize: '14px',
    color: '#888888',
  },
  percentInput: {
    width: '80px',
    padding: '10px 12px',
    fontSize: '16px',
    fontWeight: '500',
    background: 'rgba(0, 0, 0, 0.4)',
    border: '2px solid rgba(212, 168, 42, 0.15)',
    borderRadius: '6px',
    color: '#ffffff',
    outline: 'none',
    textAlign: 'center',
  },
  percentActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  percentButton: {
    padding: '10px 24px',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1px',
    background: 'linear-gradient(135deg, #D4A82A 0%, #B8922A 100%)',
    border: 'none',
    borderRadius: '6px',
    color: '#0f0f0f',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  percentResult: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#D4A82A',
  },
  infoSection: {
    marginTop: '48px',
  },
  infoCard: {
    background: 'linear-gradient(145deg, #1e1e1e 0%, #171717 100%)',
    borderRadius: '12px',
    padding: '28px',
    border: '1px solid rgba(212, 168, 42, 0.1)',
  },
  infoTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '20px',
    letterSpacing: '0.5px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '16px',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
  },
  infoRate: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#D4A82A',
  },
  infoDesc: {
    fontSize: '12px',
    color: '#888888',
    lineHeight: '1.5',
  },
  // Ad Styles
  adContainer: {
    width: '100%',
    minHeight: '90px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adPlaceholder: {
    width: '100%',
    height: '90px',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px dashed rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adText: {
    fontSize: '11px',
    letterSpacing: '2px',
    color: '#444444',
    textTransform: 'uppercase',
  },
  // FAQ Styles
  faqSection: {
    marginTop: '48px',
  },
  faqList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  faqItem: {
    background: 'linear-gradient(145deg, #1e1e1e 0%, #171717 100%)',
    borderRadius: '12px',
    border: '1px solid rgba(212, 168, 42, 0.08)',
    overflow: 'hidden',
  },
  faqQuestion: {
    width: '100%',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
  },
  faqQuestionText: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    paddingRight: '16px',
  },
  faqIcon: {
    fontSize: '12px',
    color: '#D4A82A',
    transition: 'transform 0.3s ease',
  },
  faqAnswer: {
    padding: '0 24px 20px 24px',
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#aaaaaa',
  },
  // Footer Styles
  footer: {
    marginTop: '64px',
    padding: '32px 32px 0 32px',
    borderTop: '1px solid rgba(212, 168, 42, 0.1)',
    textAlign: 'center',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  footerContent: {},
  footerBrand: {
    marginBottom: '16px',
  },
  footerLogo: {
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '1px',
    color: '#D4A82A',
  },
  footerDisclaimer: {
    fontSize: '12px',
    color: '#666666',
    maxWidth: '500px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  footerLinks: {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
  },
  footerLink: {
    fontSize: '12px',
    color: '#888888',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  footerDivider: {
    color: '#444444',
  },
  footerCopyright: {
    fontSize: '11px',
    color: '#444444',
    marginTop: '16px',
  },
};
