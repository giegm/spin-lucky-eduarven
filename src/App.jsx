import { useEffect, useRef, useState } from "react";

const animals = [
  { number: "0", name: "Delfín", emoji: "🐬" },
  { number: "00", name: "Ballena", emoji: "🐳" },
  { number: "1", name: "Carnero", emoji: "🐏" },
  { number: "2", name: "Toro", emoji: "🐂" },
  { number: "3", name: "Ciempiés", emoji: "🐛" },
  { number: "4", name: "Alacrán", emoji: "🦂" },
  { number: "5", name: "León", emoji: "🦁" },
  { number: "6", name: "Rana", emoji: "🐸" },
  { number: "7", name: "Perico", emoji: "🦜" },
  { number: "8", name: "Ratón", emoji: "🐭" },
  { number: "9", name: "Águila", emoji: "🦅" },
  { number: "10", name: "Tigre", emoji: "🐯" },
  { number: "11", name: "Gato", emoji: "🐱" },
  { number: "12", name: "Caballo", emoji: "🐴" },
  { number: "13", name: "Mono", emoji: "🐵" },
  { number: "14", name: "Paloma", emoji: "🕊️" },
  { number: "15", name: "Zorro", emoji: "🦊" },
  { number: "16", name: "Oso", emoji: "🐻" },
  { number: "17", name: "Pavo", emoji: "🦃" },
  { number: "18", name: "Burro", emoji: "🫏" },
  { number: "19", name: "Chivo", emoji: "🐐" },
  { number: "20", name: "Cochino", emoji: "🐷" },
  { number: "21", name: "Gallo", emoji: "🐓" },
  { number: "22", name: "Camello", emoji: "🐪" },
  { number: "23", name: "Cebra", emoji: "🦓" },
  { number: "24", name: "Iguana", emoji: "🦎" },
  { number: "25", name: "Gallina", emoji: "🐔" },
  { number: "26", name: "Vaca", emoji: "🐄" },
  { number: "27", name: "Perro", emoji: "🐕" },
  { number: "28", name: "Zamuro", emoji: "🦅" },
  { number: "29", name: "Elefante", emoji: "🐘" },
  { number: "30", name: "Caimán", emoji: "🐊" },
  { number: "31", name: "Lapa", emoji: "🐹" },
  { number: "32", name: "Ardilla", emoji: "🐿️" },
  { number: "33", name: "Pescado", emoji: "🐟" },
  { number: "34", name: "Venado", emoji: "🦌" },
  { number: "35", name: "Jirafa", emoji: "🦒" },
  { number: "36", name: "Culebra", emoji: "🐍" },
];

const STEP = 360 / animals.length;
const polar = (r, deg) => {
  const a = (deg * Math.PI) / 180;
  return { x: 300 + r * Math.cos(a), y: 300 + r * Math.sin(a) };
};

function ringSector(index, innerRadius, outerRadius) {
  const start = -90 + index * STEP + 0.35;
  const end = -90 + (index + 1) * STEP - 0.35;
  const a = polar(outerRadius, start);
  const b = polar(outerRadius, end);
  const c = polar(innerRadius, end);
  const d = polar(innerRadius, start);
  return `M ${a.x} ${a.y} A ${outerRadius} ${outerRadius} 0 0 1 ${b.x} ${b.y} L ${c.x} ${c.y} A ${innerRadius} ${innerRadius} 0 0 0 ${d.x} ${d.y} Z`;
}

function Clover({ className = "" }) {
  return <img src="/logo-lotto.png" alt="Eduarven Lucky" className={className} />;
}

// Audio procedural con capas de madera, metal y una cadencia que se ralentiza.
// Se genera en el navegador: no necesita MP3 ni archivos externos.
function useWheelSound(enabled) {
  const contextRef = useRef(null);
  const timerRef = useRef(null);
  const noiseRef = useRef(null);
  const bedGainRef = useRef(null);
  const startedAtRef = useRef(0);
  const stoppedRef = useRef(true);

  const getContext = () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!contextRef.current) contextRef.current = new AudioContextClass();
    if (contextRef.current.state === "suspended") contextRef.current.resume();
    return contextRef.current;
  };

  const makeNoise = (ctx) => {
    if (noiseRef.current) return noiseRef.current;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.7;
    noiseRef.current = buffer;
    return buffer;
  };

  const click = (ctx, strength = 1) => {
    const now = ctx.currentTime;

    // Golpe corto de madera: ruido filtrado, con ataque seco y cola muy breve.
    const noise = ctx.createBufferSource();
    noise.buffer = makeNoise(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1450 + Math.random() * 450, now);
    filter.Q.value = 1.15;
    const envelope = ctx.createGain();
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.exponentialRampToValueAtTime(0.16 * strength, now + 0.002);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
    noise.connect(filter);
    filter.connect(envelope);
    envelope.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.05);

    // Pequeño armónico metálico que da el "clac" de la rueda y el trinquete.
    const tone = ctx.createOscillator();
    const toneGain = ctx.createGain();
    tone.type = "triangle";
    tone.frequency.setValueAtTime(720 + Math.random() * 260, now);
    tone.frequency.exponentialRampToValueAtTime(330, now + 0.055);
    toneGain.gain.setValueAtTime(0.0001, now);
    toneGain.gain.exponentialRampToValueAtTime(0.055 * strength, now + 0.002);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);
    tone.connect(toneGain);
    toneGain.connect(ctx.destination);
    tone.start(now);
    tone.stop(now + 0.07);
  };

  const start = () => {
    if (!enabled) return;
    const ctx = getContext();
    if (!ctx) return;
    stoppedRef.current = false;
    startedAtRef.current = performance.now();

    // Soplo mecánico continuo muy discreto debajo de los clics.
    const bed = ctx.createBufferSource();
    bed.buffer = makeNoise(ctx);
    bed.loop = true;
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(520, ctx.currentTime);
    lowpass.frequency.linearRampToValueAtTime(150, ctx.currentTime + 7.8);
    const bedGain = ctx.createGain();
    bedGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    bedGain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 0.15);
    bedGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 8.1);
    bed.connect(lowpass);
    lowpass.connect(bedGain);
    bedGain.connect(ctx.destination);
    bed.start();
    bed.stop(ctx.currentTime + 8.2);
    bedGainRef.current = bedGain;

    let tickCount = 0;
    const scheduleTick = () => {
      if (stoppedRef.current) return;
      const elapsed = Math.min((performance.now() - startedAtRef.current) / 8200, 1);
      // Los golpes se espacian progresivamente, igual que una ruleta al perder velocidad.
      const eased = elapsed * elapsed * (3 - 2 * elapsed);
      const strength = 0.95 - eased * 0.38;
      click(ctx, strength);
      tickCount += 1;
      const interval = 48 + 245 * eased;
      timerRef.current = window.setTimeout(scheduleTick, interval);
    };
    scheduleTick();
  };

  const stop = () => {
    stoppedRef.current = true;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    if (bedGainRef.current && contextRef.current) {
      const ctx = contextRef.current;
      try {
        bedGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        bedGainRef.current.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.04);
      } catch { }
      bedGainRef.current = null;
    }
  };

  const win = () => {
    if (!enabled) return;
    const ctx = getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Golpecito final de bola y campanilla de confirmación, sin melodía artificial.
    click(ctx, 1.35);
    [0, 0.095, 0.19].forEach((delay, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime([980, 1320, 1760][index], now + delay);
      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.075, now + delay + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.24);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.25);
    });
  };

  useEffect(() => {
    if (!enabled) stop();
  }, [enabled]);

  useEffect(() => () => {
    stop();
    contextRef.current?.close();
  }, []);

  return { start, stop, win };
}

export default function App() {
  const [showWinner, setShowWinner] = useState(false);
  const [winnerExiting, setWinnerExiting] = useState(false);
  const winnerTimerRef = useRef(null);
  const winnerExitTimerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);
  const [soundOn, setSoundOn] = useState(true);
  const rotationRef = useRef(0);
  const selectedRef = useRef(null);
  const sound = useWheelSound(soundOn);

  const spin = () => {
    if (spinning) return;
    const index = Math.floor(Math.random() * animals.length);
    const chosen = animals[index];
    selectedRef.current = chosen;
    clearTimeout(winnerTimerRef.current);
    clearTimeout(winnerExitTimerRef.current);

    setShowWinner(false);
    setWinnerExiting(false);
    setWinner(null);

    setSpinning(true);
    sound.start();

    // El centro del sector elegido se alinea con el puntero fijo de las 12.
    const target = ((-(index + 0.5) * STEP) % 360 + 360) % 360;
    const current = ((rotationRef.current % 360) + 360) % 360;
    const correction = (target - current + 360) % 360;
    const turns = 7 + Math.floor(Math.random() * 3);
    const finalRotation = rotationRef.current + turns * 360 + correction;
    rotationRef.current = finalRotation;
    setRotation(finalRotation);
  };

  const finishSpin = (event) => {
    if (event.propertyName !== "transform" || !spinning) return;

    sound.stop();
    sound.win();

    const selected = selectedRef.current;

    setWinner(selected);
    setHistory((old) => [selected, ...old].slice(0, 5));
    setSpinning(false);

    // Mostrar celebración
    setWinnerExiting(false);
    setShowWinner(true);

    // Comenzar desaparición después de 4.3 segundos
    winnerTimerRef.current = window.setTimeout(() => {
      setWinnerExiting(true);
    }, 6300);

    // Retirar el resultado después de 5 segundos
    winnerExitTimerRef.current = window.setTimeout(() => {
      setShowWinner(false);
      setWinner(null);
      setWinnerExiting(false);
    }, 7000);
  };

  const wheelPockets = animals.map((animal, index) => {
    const isGreen = index < 2;
    const isRed = !isGreen && index % 2 === 0;
    const fill = isGreen ? "#087c3c" : isRed ? "#b51d27" : "#111a18";
    const center = -90 + (index + 0.5) * STEP;
    const numberPoint = polar(238, center);
    const animalPoint = polar(178, center);
    return (
      <g key={animal.number}>
        <path d={ringSector(index, 211, 265)} fill={fill} stroke="#e8c36c" strokeWidth="1.8" />
        <path d={ringSector(index, 146, 211)} fill="#08783b" stroke="#c99b3d" strokeWidth="1.2" />
        <g transform={`rotate(${center + 90} ${numberPoint.x} ${numberPoint.y})`}>
          <text x={numberPoint.x} y={numberPoint.y + 7} textAnchor="middle" className="roulette-number" fontSize={animal.number.length > 1 ? 21 : 25}>{animal.number}</text>
        </g>
        <g transform={`rotate(${center + 90} ${animalPoint.x} ${animalPoint.y})`}>
          <text x={animalPoint.x} y={animalPoint.y + 7} textAnchor="middle" className="roulette-animal" fontSize="23">{animal.emoji}</text>
        </g>
      </g>
    );
  });

  return (
    <main className="min-h-screen text-white">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="page-shell">
        <header className="topbar">
          <div className="brand-lockup">
            <div className="brand-mark"><Clover /></div>
            <div>
              <p className="eyebrow">EDUARVEN PRESENTA</p>
              <h1>EDUARVEN <span>SPINNER</span></h1>
              <p className="tagline">LA SUERTE ESTÁ DE TU LADO</p>
            </div>
          </div>
          <div className="top-actions">
            {/*<div className="count-badge"><strong>38</strong><span>ANIMALITOS</span></div>*/}
            <button className={`sound-toggle ${soundOn ? "is-on" : ""}`} onClick={() => setSoundOn((v) => !v)} aria-label={soundOn ? "Desactivar sonido" : "Activar sonido"}>
              <span>{soundOn ? "♫" : "♪"}</span><span className="sound-label">{soundOn ? "ON" : "OFF"}</span>
            </button>
          </div>
        </header>

        <section className="hero-grid">
          <aside className="side-card left-card">
            <div className="side-icon">✦</div>
            <p className="script-copy">¡Gira,<br />descubre y<br /><em>gana!</em></p>
            <div className="side-rule" />
            <div className="coin-stack"><span>✿</span><span>✿</span><span>✿</span></div>
          </aside>

          <section className="game-area" aria-label="Ruleta de 38 animalitos">
            <div className="wheel-heading"><span className="live-dot" /> RULETA DE LA SUERTE <span className="heading-line" /></div>
            <div className="wheel-wrap">
              <div className="wheel-halo" />
              <div className="pointer"><span /></div>
              <div className="wheel-disc" style={{ transform: `rotate(${rotation}deg)` }} onTransitionEnd={finishSpin}>
                <svg viewBox="0 0 600 600" role="img" aria-label="Ruleta de estilo clásico con 38 casillas">
                  <defs>
                    <radialGradient id="wood" cx="42%" cy="35%" r="75%">
                      <stop offset="0%" stopColor="#9b5720" />
                      <stop offset="48%" stopColor="#66300f" />
                      <stop offset="100%" stopColor="#2a1008" />
                    </radialGradient>
                    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fff0a5" />
                      <stop offset="30%" stopColor="#d99a2d" />
                      <stop offset="58%" stopColor="#fff0a0" />
                      <stop offset="100%" stopColor="#88500d" />
                    </linearGradient>
                    <pattern id="woodgrain" width="110" height="45" patternUnits="userSpaceOnUse">
                      <path d="M0 12 C25 2 42 25 70 13 S100 7 110 15 M-8 32 C20 20 45 42 78 29 S103 25 118 32" fill="none" stroke="#d18a42" strokeOpacity=".18" strokeWidth="2" />
                      <path d="M12 0 C22 13 17 27 31 45 M87 0 C75 14 94 26 81 45" fill="none" stroke="#210d06" strokeOpacity=".22" strokeWidth="3" />
                    </pattern>
                  </defs>

                  {/* Tablero de madera exterior y filetes dorados */}
                  <circle cx="300" cy="300" r="298" fill="url(#wood)" stroke="url(#gold)" strokeWidth="7" />
                  <circle cx="300" cy="300" r="292" fill="url(#woodgrain)" stroke="#5c310e" strokeWidth="2" />
                  <circle cx="300" cy="300" r="273" fill="none" stroke="#d9a64a" strokeWidth="2" />
                  <circle cx="300" cy="300" r="267" fill="none" stroke="#321608" strokeWidth="3" />
                  <circle cx="300" cy="300" r="211" fill="#064c2a" stroke="url(#gold)" strokeWidth="5" />
                  <circle cx="300" cy="300" r="146" fill="url(#wood)" stroke="url(#gold)" strokeWidth="7" />
                  <circle cx="300" cy="300" r="136" fill="url(#woodgrain)" stroke="#3c1b0a" strokeWidth="2" />

                  {/* Divisiones y bolsillos numerados */}
                  {wheelPockets}

                  {/* Aros interiores de latón */}
                  <circle cx="300" cy="300" r="219" fill="none" stroke="url(#gold)" strokeWidth="5" />
                  <circle cx="300" cy="300" r="205" fill="none" stroke="#e3b957" strokeWidth="2" />
                  <circle cx="300" cy="300" r="145" fill="none" stroke="url(#gold)" strokeWidth="5" />
                  <circle cx="300" cy="300" r="126" fill="none" stroke="#d59b3a" strokeWidth="2" />

                  {/* Centro clásico */}
                  <circle cx="300" cy="300" r="64" fill="url(#wood)" stroke="url(#gold)" strokeWidth="8" />
                  <circle cx="300" cy="300" r="48" fill="#6c350f" stroke="#e7bb58" strokeWidth="2" />
                  <image href="/logo-lotto.png" x="260" y="260" width="80" height="80" preserveAspectRatio="xMidYMid meet" />
                  {/*<circle cx="300" cy="300" r="8" fill="#ffe5a0" stroke="#a96c19" strokeWidth="3" />*/}

                  {/* Remaches decorativos sobre el aro de madera */}
                  {Array.from({ length: 16 }, (_, i) => {
                    const p = polar(281, i * 22.5);
                    return <circle key={i} cx={p.x} cy={p.y} r="3.2" fill="#f2cf76" stroke="#75410d" strokeWidth="1" />;
                  })}
                </svg>
              </div>
            </div>

            <div className="spin-controls">
              <span className="chevron">‹‹</span>
              <button className="spin-button" onClick={spin} disabled={spinning}>
                <span className={spinning ? "button-spinner" : "button-arrow"}>{spinning ? "◌" : "↻"}</span>
                <span>{spinning ? "GIRANDO..." : "¡GIRAR RULETA!"}</span>
                <b>✦</b>
              </button>
              <span className="chevron">››</span>
            </div>
            <p className="spin-hint">{spinning ? "ESCUCHA LA RULETA EN MOVIMIENTO..." : "PRESIONA PARA DESCUBRIR TU ANIMALITO"}</p>
          </section>

          <aside className="side-card right-card">
            <div className="side-title">✧ TU SUERTE ✧</div>
            <div className="feature"><span>✓</span><p><b>Juego recreativo</b><small>Selección aleatoria</small></p></div>
            {/*<div className="feature"><span>⚙</span><p><b>Ruleta clásica</b><small>Madera y latón</small></p></div>*/}
            <div className="feature"><span>🏆</span><p><b>¡Mucha suerte!</b><small>Que gane tu favorito</small></p></div>
            <div className="pot">🪙<span>LA FORTUNA<br />TE ESPERA</span></div>
          </aside>
        </section>

        {/*<section className={`result-panel ${winner ? "has-winner" : ""}`} aria-live="polite">
          <div className="result-animal">{winner?.emoji || <Clover className="result-clover" />}</div>
          <div className="result-number">
            <span>{winner ? "RESULTADO" : "TU RESULTADO"}</span>
            <strong>{winner?.number ?? "—"}</strong>
            <b>{winner?.name ?? "Aún por descubrir"}</b>
          </div>
          <div className="result-message"><span>✦</span><p>¡Espero tengas<br /><em>mucha suerte!</em></p></div>
        </section>*/}
        {showWinner && winner && (
          <div
            className={`winner-overlay ${winnerExiting ? "is-exiting" : ""
              }`}
            role="dialog"
            aria-modal="true"
            aria-label="Resultado ganador"
          >
            <div className="winner-popup">

              <div className="winner-header">
                ✦ ¡TENEMOS GANADOR! ✦
              </div>

              <div className="result-animal">{winner?.emoji || <Clover className="result-clover" />}</div>

              <div className="result-number winner-number">
                <span>RESULTADO GANADOR</span>
                <strong>{winner.number}</strong>
                <b>{winner.name}</b>
              </div>

              <div className="result-message">
                <span>✦</span>
                <p>¡Espero tengas mucha suerte!</p>
                <Clover className="result-clover" />
              </div>

            </div>
          </div>
        )}

        <section className="history-panel">
          <div className="history-title"><span>ÚLTIMOS RESULTADOS</span><small>HISTORIAL</small></div>
          <div className="history-items">
            {history.length ? history.map((item, i) => (
              <div className="history-chip" key={`${item.number}-${i}`}><span>{item.emoji}</span><b>{item.number}</b><small>{item.name}</small></div>
            )) : <p className="empty-history">Tus resultados aparecerán aquí después del primer giro.</p>}
          </div>
        </section>

        <footer><Clover className="footer-clover" /><span>SPINNER LUCKY EDUARVEN</span><i /> EXPERIENCIA DE JUEGO RECREATIVA <i /></footer>
      </div>
    </main>
  );
}
