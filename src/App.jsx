import { useMemo, useRef, useState } from 'react';
import { AudioLines, Clover, Coins, Crown, History, Info, RotateCw, Sparkles, Trophy, Volume2, VolumeX, Zap } from 'lucide-react';

// Lista editable de los 38 animalitos usados por esta ruleta recreativa.
const ANIMALS = [
  ['0', 'Delfín', '🐬'], ['00', 'Ballena', '🐳'], ['1', 'Carnero', '🐏'], ['2', 'Toro', '🐂'],
  ['3', 'Ciempiés', '🐛'], ['4', 'Alacrán', '🦂'], ['5', 'León', '🦁'], ['6', 'Rana', '🐸'],
  ['7', 'Perico', '🦜'], ['8', 'Ratón', '🐭'], ['9', 'Águila', '🦅'], ['10', 'Tigre', '🐯'],
  ['11', 'Gato', '🐱'], ['12', 'Caballo', '🐴'], ['13', 'Mono', '🐵'], ['14', 'Paloma', '🕊️'],
  ['15', 'Zorro', '🦊'], ['16', 'Oso', '🐻'], ['17', 'Pavo', '🦃'], ['18', 'Burro', '🫏'],
  ['19', 'Chivo', '🐐'], ['20', 'Cochino', '🐷'], ['21', 'Gallo', '🐓'], ['22', 'Camello', '🐪'],
  ['23', 'Cebra', '🦓'], ['24', 'Iguana', '🦎'], ['25', 'Gallina', '🐔'], ['26', 'Vaca', '🐄'],
  ['27', 'Perro', '🐕'], ['28', 'Zamuro', '🦅'], ['29', 'Elefante', '🐘'], ['30', 'Caimán', '🐊'],
  ['31', 'Lapa', '🐹'], ['32', 'Ardilla', '🐿️'], ['33', 'Pescado', '🐟'], ['34', 'Venado', '🦌'],
  ['35', 'Jirafa', '🦒'], ['36', 'Culebra', '🐍'],
].map(([number, name, emoji]) => ({ number, name, emoji }));

const COUNT = ANIMALS.length;
const STEP = 360 / COUNT;
const polar = (r, deg) => {
  const rad = (deg * Math.PI) / 180;
  return { x: 300 + r * Math.cos(rad), y: 300 + r * Math.sin(rad) };
};

function sectorPath(i) {
  const a0 = -90 + i * STEP;
  const a1 = a0 + STEP;
  const p0 = polar(282, a0);
  const p1 = polar(282, a1);
  return `M 300 300 L ${p0.x} ${p0.y} A 282 282 0 0 1 ${p1.x} ${p1.y} Z`;
}

function Wheel({ rotation, spinning, onTransitionEnd }) {
  const sectors = useMemo(() => ANIMALS.map((animal, i) => {
    const middle = -90 + (i + 0.5) * STEP;
    const point = polar(225, middle);
    const color = i < 2 ? '#087f43' : (i % 2 === 0 ? '#b31d31' : '#101a17');
    return (
      <g key={animal.number}>
        <path d={sectorPath(i)} fill={color} stroke="#e4bb65" strokeWidth="1.55" />
        <g transform={`translate(${point.x} ${point.y}) rotate(${middle + 90})`}>
          <text x="0" y="-10" textAnchor="middle" className="wheel-number">{animal.number}</text>
          <text x="0" y="14" textAnchor="middle" className="wheel-emoji">{animal.emoji}</text>
        </g>
      </g>
    );
  }), []);

  return (
    <div className="wheel-shell">
      <div className="wheel-lights" />
      <div className="pointer"><span /></div>
      <div
        className={`wheel-rotor ${spinning ? 'is-spinning' : ''}`}
        style={{ transform: `rotate(${rotation}deg)` }}
        onTransitionEnd={onTransitionEnd}
      >
        <svg viewBox="0 0 600 600" role="img" aria-label="Ruleta con 38 animalitos">
          <circle cx="300" cy="300" r="296" fill="#080d0b" stroke="#f3d17e" strokeWidth="5" />
          <circle cx="300" cy="300" r="288" fill="#13231b" stroke="#a97928" strokeWidth="5" />
          {sectors}
          <circle cx="300" cy="300" r="78" fill="#061a11" stroke="#f4d17b" strokeWidth="9" />
          <circle cx="300" cy="300" r="65" fill="#0b3b25" stroke="#21d66a" strokeWidth="2" />
          <image href="/logo-clover.png" x="271" y="248" width="58" height="49" preserveAspectRatio="xMidYMid meet" />
          <text x="300" y="321" textAnchor="middle" className="wheel-brand">EDUARVEN</text>
          <text x="300" y="344" textAnchor="middle" className="wheel-brand gold">SPINNER</text>
        </svg>
      </div>
    </div>
  );
}

export default function App() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);
  const [sound, setSound] = useState(true);
  const rotationRef = useRef(0);
  const pendingWinner = useRef(null);
  const audioRef = useRef(null);

  const playTone = (frequency = 520, duration = 0.12) => {
    if (!sound) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      audioRef.current ??= new AudioContext();
      const ctx = audioRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      oscillator.connect(gain); gain.connect(ctx.destination);
      oscillator.start(); oscillator.stop(ctx.currentTime + duration);
    } catch { /* El sonido es opcional; la ruleta sigue funcionando sin audio. */ }
  };

  const spin = () => {
    if (spinning) return;
    const index = Math.floor(Math.random() * COUNT);
    const selected = ANIMALS[index];
    pendingWinner.current = selected;
    setWinner(null);
    setSpinning(true);
    playTone(260, 0.22);
    // El centro de cada sector empieza en -90° + (i + 0.5) * STEP.
    // Para llevarlo al puntero superior (-90°), la rotación final es -(i + 0.5) * STEP.
    const target = ((360 - (index + 0.5) * STEP) % 360 + 360) % 360;
    const current = ((rotationRef.current % 360) + 360) % 360;
    const delta = (target - current + 360) % 360;
    const turns = 7 + Math.floor(Math.random() * 3);
    const nextRotation = rotationRef.current + turns * 360 + delta;
    rotationRef.current = nextRotation;
    setRotation(nextRotation);
  };

  const finishSpin = (event) => {
    if (event.propertyName !== 'transform' || !spinning) return;
    const result = pendingWinner.current;
    setWinner(result);
    setHistory((old) => [result, ...old].slice(0, 5));
    setSpinning(false);
    playTone(760, 0.3);
  };

  return (
    <main className="app-bg min-h-screen text-white">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <div className="app-wrap">
        <header className="topbar">
          <a className="brand" href="#inicio" aria-label="Lotto Activo inicio">
            <span className="brand-logo"><img src="/logo-clover.png" alt="Trébol Lotto Activo" /></span>
            <span><b>EDUARVEN <i>SPINNER</i></b><small>LA SUERTE ESTÁ DE TU LADO</small></span>
          </a>
          <div className="top-actions">
            <span className="live-pill"><span /> RULETA EN VIVO</span>
            <button className="icon-button" onClick={() => setSound(!sound)} aria-label={sound ? 'Desactivar sonido' : 'Activar sonido'}>
              {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>
        </header>

        <section className="hero" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> EXPERIENCIA GAMING</div>
            <h1>LA SUERTE<br /><span>GIRA CONTIGO.</span></h1>
            <p>38 animalitos. Una oportunidad. Deja que la ruleta elija tu próximo número.</p>
            <div className="feature-row">
              <span><Zap size={15} /> Giro dinámico</span>
              <span><Clover size={15} /> 38 animalitos</span>
            </div>
          </div>
          <div className="hero-badge"><Crown size={21} /><strong>38</strong><span>ANIMALITOS</span></div>
        </section>

        <section className="game-layout" aria-label="Ruleta Lotto Activo">
          <div className="wheel-column">
            <div className="wheel-heading"><span>RULETA</span><b>PREMIUM</b><span className="heading-line" /></div>
            <Wheel rotation={rotation} spinning={spinning} onTransitionEnd={finishSpin} />
            <div className="spin-controls">
              <button className="spin-button" onClick={spin} disabled={spinning}>
                <span className="button-icon"><RotateCw size={24} className={spinning ? 'spin-icon' : ''} /></span>
                <span>{spinning ? 'LA SUERTE ESTÁ GIRANDO…' : '¡GIRAR RULETA!'}</span>
                <Sparkles size={20} />
              </button>
              <p>{spinning ? 'Respira… el resultado está por llegar' : 'PRESIONA PARA DESCUBRIR TU ANIMALITO'}</p>
            </div>
          </div>

          <aside className="side-column">
            <div className={`result-card ${winner ? 'has-winner' : ''}`} aria-live="polite">
              <div className="card-kicker"><Trophy size={17} /> RESULTADO</div>
              {winner ? (
                <>
                  <div className="winner-emoji">{winner.emoji}</div>
                  <div className="winner-number">{winner.number}</div>
                  <h2>{winner.name}</h2>
                  <div className="winner-divider" />
                  <p className="luck-message">¡Espero tengas mucha suerte!</p>
                </>
              ) : (
                <div className="waiting-state">
                  <div className="waiting-clover"><Clover size={43} /></div>
                  <h2>{spinning ? '¡Está girando!' : '¿Cuál será tu suerte?'}</h2>
                  <p>{spinning ? 'La ruleta está buscando tu animalito…' : 'Tu próximo animalito ganador aparecerá aquí.'}</p>
                </div>
              )}
              <div className="card-glow" />
            </div>

            <div className="history-card">
              <div className="history-title"><span><History size={17} /> ÚLTIMOS RESULTADOS</span><small>HISTORIAL</small></div>
              {history.length ? history.map((item, i) => (
                <div className="history-row" key={`${item.number}-${i}`}>
                  <span className="history-animal">{item.emoji}</span>
                  <span className="history-name">{item.name}</span>
                  <b>{item.number}</b>
                </div>
              )) : <p className="empty-history">Aquí aparecerán tus últimos 5 giros.</p>}
            </div>

            <div className="fair-card"><Info size={17} /><span>Selección aleatoria recreativa. Cada giro es independiente y no predice sorteos oficiales.</span></div>
          </aside>
        </section>

        <footer className="footer"><span><Coins size={16} /> EDUARVEN </span><span>JUEGA CON RESPONSABILIDAD</span><span><AudioLines size={16} /> GAMING EXPERIENCE</span></footer>
      </div>
    </main>
  );
}
