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

const TAU = Math.PI * 2;
const STEP = 360 / animals.length;
const polar = (cx, cy, r, deg) => {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};
const sectorPath = (i) => {
  const start = -90 + i * STEP;
  const end = start + STEP;
  const p1 = polar(300, 300, 286, start);
  const p2 = polar(300, 300, 286, end);
  return `M 300 300 L ${p1.x} ${p1.y} A 286 286 0 0 1 ${p2.x} ${p2.y} Z`;
};

function Clover({ className = "" }) {
  return <img src="/logo-lotto.png" alt="" aria-hidden="true" className={className} />;
}

function useWheelSound(enabled) {
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const stopRef = useRef(false);
  const getAudio = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    if (!audioRef.current) audioRef.current = new AudioContext();
    if (audioRef.current.state === "suspended") audioRef.current.resume();
    return audioRef.current;
  };
  const tick = (ctx, intensity = 1) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(1150 + Math.random() * 500, ctx.currentTime);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035 * intensity, ctx.currentTime + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.04);
  };
  const start = () => {
    if (!enabled) return;
    const ctx = getAudio(); if (!ctx) return;
    stopRef.current = false;
    let count = 0;
    const pulse = () => {
      if (stopRef.current) return;
      tick(ctx, 1 - Math.min(count / 75, 0.72));
      count += 1;
      const delay = Math.min(260, 48 + count * 2.8);
      timerRef.current = window.setTimeout(pulse, delay);
    };
    pulse();
  };
  const stop = () => {
    stopRef.current = true;
    if (timerRef.current) window.clearTimeout(timerRef.current);
  };
  const win = () => {
    if (!enabled) return;
    const ctx = getAudio(); if (!ctx) return;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = "sine"; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.11);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + i * 0.11 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.11 + 0.34);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.11); osc.stop(ctx.currentTime + i * 0.11 + 0.36);
    });
  };
  useEffect(() => () => { stop(); audioRef.current?.close(); }, []);
  return { start, stop, win };
}

export default function App() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);
  const [soundOn, setSoundOn] = useState(true);
  const rotationRef = useRef(0);
  const selectedRef = useRef(null);
  const spinTimer = useRef(null);
  const sound = useWheelSound(soundOn);

  useEffect(() => () => window.clearTimeout(spinTimer.current), []);

  const spin = () => {
    if (spinning) return;
    const index = Math.floor(Math.random() * animals.length);
    const chosen = animals[index];
    selectedRef.current = chosen;
    setWinner(null);
    setSpinning(true);
    sound.start();

    // La casilla index tiene su centro en -90 + (index + 0.5) * STEP.
    // Se suma la rotación necesaria para llevar ese centro al puntero fijo (-90°).
    const target = ((-(index + 0.5) * STEP) % 360 + 360) % 360;
    const current = ((rotationRef.current % 360) + 360) % 360;
    const correction = (target - current + 360) % 360;
    const turns = 7 + Math.floor(Math.random() * 3);
    const finalRotation = rotationRef.current + turns * 360 + correction;
    rotationRef.current = finalRotation;
    setRotation(finalRotation);
    spinTimer.current = window.setTimeout(() => {
      sound.stop(); sound.win();
      setWinner(chosen);
      setHistory((old) => [chosen, ...old].slice(0, 5));
      setSpinning(false);
    }, 8200);
  };

  return <main className="min-h-screen overflow-hidden text-white">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark"><Clover /></div>
          <div><p className="eyebrow">EDUARVEN PRESENTA</p><h1>LOTTO <span>ACTIVO</span></h1><p className="tagline">LA SUERTE ESTÁ DE TU LADO</p></div>
        </div>
        <div className="top-actions">
          <div className="count-badge"><strong>38</strong><span>ANIMALITOS</span></div>
          <button className={`sound-toggle ${soundOn ? "is-on" : ""}`} onClick={() => setSoundOn(v => !v)} aria-label={soundOn ? "Desactivar sonido" : "Activar sonido"} title={soundOn ? "Sonido activado" : "Sonido desactivado"}><span>{soundOn ? "♫" : "♪"}</span><span className="sound-label">SONIDO {soundOn ? "ON" : "OFF"}</span></button>
        </div>
      </header>

      <section className="hero-grid">
        <aside className="side-card left-card"><div className="side-icon">✦</div><p className="script-copy">¡Gira,<br/>descubre y<br/><em>gana!</em></p><div className="side-rule"/><p className="side-small">38 oportunidades<br/>para probar tu suerte</p><div className="coin-stack"><span>✿</span><span>✿</span><span>✿</span></div></aside>

        <section className="game-area" aria-label="Ruleta de 38 animalitos">
          <div className="wheel-heading"><span className="live-dot"/> RULETA EN VIVO <span className="heading-line"/></div>
          <div className="wheel-wrap">
            <div className="wheel-halo"/>
            <div className="wheel-rim rim-outer"><div className="rim-lights">{Array.from({length:38},(_,i)=><i key={i} style={{transform:`rotate(${i*360/38}deg) translateY(-1px)`}}/>)}</div></div>
            <div className="pointer"><span/></div>
            <div className={`wheel-disc ${spinning ? "is-spinning" : ""}`} style={{transform:`rotate(${rotation}deg)`}}>
              <svg viewBox="0 0 600 600" role="img" aria-label="Ruleta con 38 sectores numerados">
                <circle cx="300" cy="300" r="297" fill="#d6a83f"/>
                {animals.map((animal,i)=>{
                  const green=i<2; const red=i>=2 && i%2===0;
                  const fill=green?"#079a42":red?"#bd202c":"#111719";
                  const angle=-90+(i+.5)*STEP;
                  return <g key={animal.number}><path d={sectorPath(i)} fill={fill} stroke="#f2cb69" strokeWidth="2.2"/><path d={sectorPath(i)} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1"/><g transform={`rotate(${angle+90} 300 300)`}><text x="300" y="77" textAnchor="middle" className="wheel-number" fontSize={animal.number.length>1?20:23}>{animal.number}</text><text x="300" y="105" textAnchor="middle" fontSize="22">{animal.emoji}</text></g></g>;
                })}
                <circle cx="300" cy="300" r="75" fill="#03180e" stroke="#f6d26d" strokeWidth="9"/>
                <circle cx="300" cy="300" r="62" fill="#07552d" stroke="#23e96c" strokeWidth="3"/>
                <path d="M300 260 C278 242 258 261 272 282 C281 296 296 300 300 301 C304 300 319 296 328 282 C342 261 322 242 300 260Z" fill="#09bd50" stroke="#001d0c" strokeWidth="3"/>
                <path d="M300 300 Q299 318 282 330 M300 300 Q315 315 326 330" fill="none" stroke="#001d0c" strokeWidth="3"/>
                <text x="300" y="352" textAnchor="middle" fill="#fff" fontSize="19" fontWeight="900" letterSpacing="1">EDUARVEN</text>
              </svg>
            </div>
            <div className="wheel-center-glow"/>
          </div>
          <div className="spin-controls">
            <span className="chevron">‹‹</span>
            <button className="spin-button" onClick={spin} disabled={spinning}><span className={spinning?"button-spinner":"button-arrow"}>{spinning?"◌":"↻"}</span><span>{spinning?"GIRANDO...":"¡GIRAR RULETA!"}</span><b>✦</b></button>
            <span className="chevron">››</span>
          </div>
          <p className="spin-hint">{spinning?"LA SUERTE ESTÁ EN MOVIMIENTO":"PRESIONA PARA DESCUBRIR TU ANIMALITO"}</p>
        </section>

        <aside className="side-card right-card"><div className="side-title">✧ TU SUERTE ✧</div><div className="feature"><span>✓</span><p><b>Juego justo</b><small>Selección aleatoria</small></p></div><div className="feature"><span>⚡</span><p><b>Giro dinámico</b><small>Animación fluida</small></p></div><div className="feature"><span>🏆</span><p><b>¡Mucha suerte!</b><small>Que gane tu favorito</small></p></div><div className="pot">🪙<span>LA FORTUNA<br/>TE ESPERA</span></div></aside>
      </section>

      <section className={`result-panel ${winner?"has-winner":""}`} aria-live="polite">
        <div className="result-animal">{winner?.emoji || "🍀"}</div>
        <div className="result-number"><span>{winner?"RESULTADO":"TU RESULTADO"}</span><strong>{winner?.number ?? "—"}</strong><b>{winner?.name ?? "Aún por descubrir"}</b></div>
        <div className="result-message"><span>✦</span><p>¡Espero tengas<br/><em>mucha suerte!</em></p><Clover className="result-clover"/></div>
      </section>

      <section className="history-panel"><div className="history-title"><span>ÚLTIMOS RESULTADOS</span><small>HISTORIAL DE ESTA SESIÓN</small></div><div className="history-items">{history.length?history.map((item,i)=><div className="history-chip" key={`${item.number}-${i}`}><span>{item.emoji}</span><b>{item.number}</b><small>{item.name}</small></div>):<p className="empty-history">Tus resultados aparecerán aquí después del primer giro.</p>}</div></section>
      <footer><Clover className="footer-clover"/><span>EDUARVEN LUCKY</span><i/> EXPERIENCIA DE JUEGO RECREATIVA <i/> 38 ANIMALITOS</footer>
    </div>
  </main>;
}
