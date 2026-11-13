import { useEffect, useRef, useState } from "react";
import Fireworks from "./Fireworks";

const animals = [
  { number: "0", name: "Delfín" },
  { number: "00", name: "Ballena" },
  { number: "1", name: "Carnero" },
  { number: "2", name: "Toro" },
  { number: "3", name: "Ciempiés" },
  { number: "4", name: "Alacrán" },
  { number: "5", name: "León" },
  { number: "6", name: "Rana" },
  { number: "7", name: "Perico" },
  { number: "8", name: "Ratón" },
  { number: "9", name: "Águila" },
  { number: "10", name: "Tigre" },
  { number: "11", name: "Gato" },
  { number: "12", name: "Caballo" },
  { number: "13", name: "Mono" },
  { number: "14", name: "Paloma" },
  { number: "15", name: "Zorro" },
  { number: "16", name: "Oso" },
  { number: "17", name: "Pavo" },
  { number: "18", name: "Burro" },
  { number: "19", name: "Chivo" },
  { number: "20", name: "Cochino" },
  { number: "21", name: "Gallo" },
  { number: "22", name: "Camello" },
  { number: "23", name: "Cebra" },
  { number: "24", name: "Iguana" },
  { number: "25", name: "Gallina" },
  { number: "26", name: "Vaca" },
  { number: "27", name: "Perro" },
  { number: "28", name: "Zamuro" },
  { number: "29", name: "Elefante" },
  { number: "30", name: "Caimán" },
  { number: "31", name: "Lapa" },
  { number: "32", name: "Ardilla" },
  { number: "33", name: "Pescado" },
  { number: "34", name: "Venado" },
  { number: "35", name: "Jirafa" },
  { number: "36", name: "Culebra" },
];

const guacharoAnimals = [
  { number: "0", name: "Delfín" },
  { number: "00", name: "Ballena" },
  { number: "01", name: "Carnero" },
  { number: "02", name: "Toro" },
  { number: "03", name: "Ciempiés" },
  { number: "04", name: "Alacrán" },
  { number: "05", name: "León" },
  { number: "06", name: "Rana" },
  { number: "07", name: "Perico" },
  { number: "08", name: "Ratón" },
  { number: "09", name: "Águila" },
  { number: "10", name: "Tigre" },
  { number: "11", name: "Gato" },
  { number: "12", name: "Caballo" },
  { number: "13", name: "Mono" },
  { number: "14", name: "Paloma" },
  { number: "15", name: "Zorro" },
  { number: "16", name: "Oso" },
  { number: "17", name: "Pavo" },
  { number: "18", name: "Burro" },
  { number: "19", name: "Chivo" },
  { number: "20", name: "Cochino" },
  { number: "21", name: "Gallo" },
  { number: "22", name: "Camello" },
  { number: "23", name: "Cebra" },
  { number: "24", name: "Iguana" },
  { number: "25", name: "Gallina" },
  { number: "26", name: "Vaca" },
  { number: "27", name: "Perro" },
  { number: "28", name: "Zamuro" },
  { number: "29", name: "Elefante" },
  { number: "30", name: "Caimán" },
  { number: "31", name: "Lapa" },
  { number: "32", name: "Ardilla" },
  { number: "33", name: "Pescado" },
  { number: "34", name: "Venado" },
  { number: "35", name: "Jirafa" },
  { number: "36", name: "Culebra" },
  { number: "37", name: "Tortuga" },
  { number: "38", name: "Búfalo" },
  { number: "39", name: "Lechuza" },
  { number: "40", name: "Avispa" },
  { number: "41", name: "Canguro" },
  { number: "42", name: "Tucán" },
  { number: "43", name: "Mariposa" },
  { number: "44", name: "Chigüire" },
  { number: "45", name: "Garza" },
  { number: "46", name: "Puma" },
  { number: "47", name: "Pavo Real" },
  { number: "48", name: "Puercoespín" },
  { number: "49", name: "Pereza" },
  { number: "50", name: "Canario" },
  { number: "51", name: "Pelícano" },
  { number: "52", name: "Pulpo" },
  { number: "53", name: "Caracol" },
  { number: "54", name: "Grillo" },
  { number: "55", name: "Oso Hormiguero" },
  { number: "56", name: "Tiburón" },
  { number: "57", name: "Pato" },
  { number: "58", name: "Hormiga" },
  { number: "59", name: "Pantera" },
  { number: "60", name: "Camaleón" },
  { number: "61", name: "Panda" },
  { number: "62", name: "Cachicamo" },
  { number: "63", name: "Cangrejo" },
  { number: "64", name: "Gavilán" },
  { number: "65", name: "Araña" },
  { number: "66", name: "Lobo" },
  { number: "67", name: "Avestruz" },
  { number: "68", name: "Jaguar" },
  { number: "69", name: "Conejo" },
  { number: "70", name: "Bisonte" },
  { number: "71", name: "Guacamaya" },
  { number: "72", name: "Gorila" },
  { number: "73", name: "Hipopótamo" },
  { number: "74", name: "Turpial" },
  { number: "75", name: "Guácharo" },
];


// Orden oficial de las casillas según la ruleta de referencia compartida.
// El 75 queda reservado al medallón central y no se repite en los anillos.
const guacharoOuterOrder = [
  "0", "50", "04", "34", "17", "28", "09", "44", "15", "65",
  "39", "20", "41", "25", "01", "70", "19", "53", "61", "00",
  "12", "55", "37", "60", "22", "10", "74", "43", "29", "40",
  "03", "58", "32", "14", "48", "24", "07", "33"
];
const guacharoInnerOrder = [
  "06", "49", "18", "56", "13", "27", "46", "66", "30", "02",
  "21", "69", "72", "52", "26", "16", "42", "68", "51", "31",
  "23", "11", "73", "35", "45", "59", "63", "67", "54", "36",
  "08", "71", "62", "47", "64", "57", "38", "05"
];
const guacharoByNumber = new Map(guacharoAnimals.map((animal) => [animal.number, animal]));
const guacharoOuterAnimals = guacharoOuterOrder.map((number) => guacharoByNumber.get(number));
const guacharoInnerAnimals = guacharoInnerOrder.map((number) => guacharoByNumber.get(number));
const guacharoWheelAnimals = [...guacharoOuterAnimals, ...guacharoInnerAnimals];
// El 75 no ocupa una casilla de los anillos: participa como resultado central.
const guacharoCenterAnimal = guacharoByNumber.get("75");
const guacharoDrawAnimals = [...guacharoWheelAnimals, guacharoCenterAnimal];

// Guacharito Millonario: 100 casillas (0, 00 y 01–98) + 99 central.
// Los números 76–98 conservan su identificación numérica hasta contar con
// un catálogo oficial de animalitos para esas posiciones.
const millonarioAnimals = Array.from({ length: 100 }, (_, index) => {
  const number = index === 0 ? "0" : index === 1 ? "00" : String(index - 1).padStart(2, "0");
  const known = guacharoByNumber.get(number);
  return known || { number, name: `Animalito ${number}` };
});
const millonarioOuterAnimals = millonarioAnimals.slice(0, 50);
const millonarioInnerAnimals = millonarioAnimals.slice(50, 100);
const millonarioCenterAnimal = { number: "99", name: "Guacharito" };
const millonarioDrawAnimals = [...millonarioAnimals, millonarioCenterAnimal];

const animalEmojis = {
  "Delfín": "🐬", "Ballena": "🐳", "Carnero": "🐏", "Toro": "🐂", "Ciempiés": "🐛",
  "Alacrán": "🦂", "León": "🦁", "Rana": "🐸", "Perico": "🦜", "Ratón": "🐭",
  "Águila": "🦅", "Tigre": "🐅", "Gato": "🐈", "Caballo": "🐎", "Mono": "🐒",
  "Paloma": "🕊️", "Zorro": "🦊", "Oso": "🐻", "Pavo": "🦃", "Burro": "🫏",
  "Chivo": "🐐", "Cochino": "🐖", "Gallo": "🐓", "Camello": "🐪", "Cebra": "🦓",
  "Iguana": "🦎", "Gallina": "🐔", "Vaca": "🐄", "Perro": "🐕", "Zamuro": "🦅",
  "Elefante": "🐘", "Caimán": "🐊", "Lapa": "🦜", "Ardilla": "🐿️", "Pescado": "🐟",
  "Venado": "🦌", "Jirafa": "🦒", "Culebra": "🐍", "Tortuga": "🐢", "Búfalo": "🐃",
  "Lechuza": "🦉", "Avispa": "🐝", "Canguro": "🦘", "Tucán": "🐦", "Mariposa": "🦋",
  "Chigüire": "🦫", "Garza": "🪽", "Puma": "🐆", "Pavo Real": "🦚", "Puercoespín": "🦔",
  "Pereza": "🦥", "Canario": "🐤", "Pelícano": "🦤", "Pulpo": "🐙", "Caracol": "🐌",
  "Grillo": "🦗", "Oso Hormiguero": "🐜", "Tiburón": "🦈", "Pato": "🦆", "Hormiga": "🐜",
  "Pantera": "🐈‍⬛", "Camaleón": "🦎", "Panda": "🐼", "Cachicamo": "🦔", "Cangrejo": "🦀",
  "Gavilán": "🦅", "Araña": "🕷️", "Lobo": "🐺", "Avestruz": "🪶", "Jaguar": "🐆",
  "Conejo": "🐇", "Bisonte": "🦬", "Guacamaya": "🦜", "Gorila": "🦍", "Hipopótamo": "🦛",
  "Turpial": "🐦", "Guácharo": "🦉"
};
const animalEmoji = (animal) => animalEmojis[animal?.name] || "🐾";
const animalAssetNumber = (number) => number === "00" ? "00" : String(Number(number));

const wheelOrder = [
  // Sector A
  "35", "14", "2", "0", "28", "9", "26",
  // Sector B
  "30", "11", "7", "20", "32", "17",
  // Sector C
  "5", "22", "34", "15", "3", "24",
  // Sector D
  "36", "13", "1", "00", "27", "10", "25",
  // Sector E
  "29", "12", "8", "19", "31", "18",
  // Sector F
  "6", "21", "33", "16", "4", "23"
];

const redNumbers = new Set([
  "1", "3", "5", "7", "9",
  "12", "14", "16", "18", "19",
  "21", "23", "25", "27", "30",
  "32", "34", "36"
]);

const blackNumbers = new Set([
  "2", "4", "6", "8", "10",
  "11", "13", "15", "17", "20",
  "22", "24", "26", "28", "29",
  "31", "33", "35"
]);

const wheelAnimals = wheelOrder.map((number) => {
  const animal = animals.find(
    (item) => String(item.number) === number
  );

  if (!animal) {
    throw new Error(`Animalito no encontrado: ${number}`);
  }

  return {
    ...animal,
    color:
      number === "0" || number === "00"
        ? "green"
        : redNumbers.has(number)
          ? "red"
          : "black"
  };
});

const STEP = 360 / wheelAnimals.length;
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
  const [screen, setScreen] = useState("selector");
  const [guacharoRotation, setGuacharoRotation] = useState(0);
  const [guacharoSpinning, setGuacharoSpinning] = useState(false);
  const [guacharoWinner, setGuacharoWinner] = useState(null);
  const [guacharoHistory, setGuacharoHistory] = useState([]);
  const [showGuacharoPopup, setShowGuacharoPopup] = useState(false);
  const [guacharoPopupExiting, setGuacharoPopupExiting] = useState(false);
  const guacharoPopupTimerRef = useRef(null);
  const guacharoPopupExitTimerRef = useRef(null);
  const guacharoRotationRef = useRef(0);
  const guacharoSelectedRef = useRef(null);
  const guacharoLedTimerRef = useRef(null);
  const [guacharoLedIndex, setGuacharoLedIndex] = useState(null);
  const [showWinner, setShowWinner] = useState(false);
  const [winnerExiting, setWinnerExiting] = useState(false);
  const winnerTimerRef = useRef(null);
  const winnerExitTimerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);
  const [soundOn, setSoundOn] = useState(true);
  const [millonarioSpinning, setMillonarioSpinning] = useState(false);
  const [millonarioWinner, setMillonarioWinner] = useState(null);
  const [millonarioHistory, setMillonarioHistory] = useState([]);
  const [millonarioLedIndex, setMillonarioLedIndex] = useState(null);
  const [showMillonarioPopup, setShowMillonarioPopup] = useState(false);
  const [millonarioPopupExiting, setMillonarioPopupExiting] = useState(false);
  const millonarioSelectedRef = useRef(null);
  const millonarioLedTimerRef = useRef(null);
  const millonarioPopupTimerRef = useRef(null);
  const millonarioPopupExitTimerRef = useRef(null);
  const rotationRef = useRef(0);
  const selectedRef = useRef(null);
  const sound = useWheelSound(soundOn);

  useEffect(() => () => {
    clearTimeout(guacharoPopupTimerRef.current);
    clearTimeout(guacharoPopupExitTimerRef.current);
    clearTimeout(guacharoLedTimerRef.current);
    clearTimeout(winnerTimerRef.current);
    clearTimeout(winnerExitTimerRef.current);
    clearTimeout(millonarioLedTimerRef.current);
    clearTimeout(millonarioPopupTimerRef.current);
    clearTimeout(millonarioPopupExitTimerRef.current);
  }, []);

  const spin = () => {
    if (spinning) return;

    const index = Math.floor(
      Math.random() * wheelAnimals.length
    );

    // Seleccionar el animalito correspondiente al índice
    const chosen = wheelAnimals[index];

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

    const finalRotation =
      rotationRef.current + turns * 360 + correction;

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
      setScreen("selector");
    }, 7000);
  };

  const spinGuacharo = () => {
    if (guacharoSpinning) return;

    // Sorteo equitativo entre 76 casillas de los anillos y el 75 central.
    const targetIndex = Math.floor(Math.random() * guacharoDrawAnimals.length);
    const chosen = guacharoDrawAnimals[targetIndex];
    guacharoSelectedRef.current = chosen;
    const isCenterWinner = chosen.number === "75";

    clearTimeout(guacharoPopupTimerRef.current);
    clearTimeout(guacharoPopupExitTimerRef.current);
    clearTimeout(guacharoLedTimerRef.current);
    setShowGuacharoPopup(false);
    setGuacharoPopupExiting(false);
    setGuacharoWinner(null);
    setGuacharoLedIndex(null);
    setGuacharoSpinning(true);
    sound.start();

    // El LED recorre las 76 casillas reales de los anillos. Si gana el 75,
    // termina iluminando el medallón central en lugar de una casilla inexistente.
    const ringTotal = guacharoWheelAnimals.length;
    const startIndex = isCenterWinner ? 0 : (targetIndex + 1) % ringTotal;
    const ledSequence = Array.from(
      { length: ringTotal },
      (_, step) => (startIndex + step) % ringTotal
    );
    if (isCenterWinner) ledSequence.push(ringTotal);
    let step = 0;

    const advanceLed = () => {
      setGuacharoLedIndex(ledSequence[step]);

      // La secuencia comienza rápida y se ralentiza gradualmente al acercarse al ganador.
      const progress = step / Math.max(ledSequence.length - 1, 1);
      const delay = 38 + Math.pow(progress, 2.15) * 185;

      if (step === ledSequence.length - 1) {
        guacharoLedTimerRef.current = window.setTimeout(finishGuacharoSpin, delay + 220);
        return;
      }

      step += 1;
      guacharoLedTimerRef.current = window.setTimeout(advanceLed, delay);
    };
    advanceLed();
  };

  const finishGuacharoSpin = () => {
    clearTimeout(guacharoLedTimerRef.current);
    sound.stop();
    sound.win();
    const selected = guacharoSelectedRef.current;
    setGuacharoLedIndex(selected?.number === "75"
      ? guacharoWheelAnimals.length
      : guacharoWheelAnimals.findIndex((animal) => animal.number === selected?.number));
    setGuacharoWinner(selected);
    setGuacharoHistory((old) => [selected, ...old].slice(0, 5));
    setGuacharoSpinning(false);
    setGuacharoPopupExiting(false);
    setShowGuacharoPopup(true);
    guacharoPopupTimerRef.current = window.setTimeout(() => {
      setGuacharoPopupExiting(true);
    }, 6300);
    guacharoPopupExitTimerRef.current = window.setTimeout(() => {
      setShowGuacharoPopup(false);
      setGuacharoPopupExiting(false);
      setScreen("selector");
    }, 7000);
  };

  const finishMillonarioSpin = () => {
    clearTimeout(millonarioLedTimerRef.current);
    sound.stop();
    sound.win();
    const selected = millonarioSelectedRef.current;
    setMillonarioLedIndex(selected?.number === "99" ? 100 : millonarioAnimals.findIndex((animal) => animal.number === selected?.number));
    setMillonarioWinner(selected);
    setMillonarioHistory((old) => [selected, ...old].slice(0, 5));
    setMillonarioSpinning(false);
    setMillonarioPopupExiting(false);
    setShowMillonarioPopup(true);
    millonarioPopupTimerRef.current = window.setTimeout(() => setMillonarioPopupExiting(true), 6300);
    millonarioPopupExitTimerRef.current = window.setTimeout(() => {
      setShowMillonarioPopup(false);
      setMillonarioPopupExiting(false);
      setScreen("selector");
    }, 7000);
  };

  const spinMillonario = () => {
    if (millonarioSpinning) return;
    const targetIndex = Math.floor(Math.random() * millonarioDrawAnimals.length);
    const chosen = millonarioDrawAnimals[targetIndex];
    millonarioSelectedRef.current = chosen;
    const isCenterWinner = chosen.number === "99";
    clearTimeout(millonarioLedTimerRef.current);
    clearTimeout(millonarioPopupTimerRef.current);
    clearTimeout(millonarioPopupExitTimerRef.current);
    setShowMillonarioPopup(false); setMillonarioPopupExiting(false);
    setMillonarioWinner(null); setMillonarioLedIndex(null); setMillonarioSpinning(true);
    sound.start();
    const startIndex = isCenterWinner ? 0 : (targetIndex + 1) % 100;
    const sequence = Array.from({ length: 100 }, (_, step) => (startIndex + step) % 100);
    if (isCenterWinner) sequence.push(100);
    let step = 0;
    const advance = () => {
      setMillonarioLedIndex(sequence[step]);
      const progress = step / Math.max(sequence.length - 1, 1);
      const delay = 28 + Math.pow(progress, 2.1) * 170;
      if (step === sequence.length - 1) { millonarioLedTimerRef.current = window.setTimeout(finishMillonarioSpin, delay + 220); return; }
      step += 1; millonarioLedTimerRef.current = window.setTimeout(advance, delay);
    };
    advance();
  };

  const makeMillonarioRing = (items, innerRadius, outerRadius, ringName) => {
    const step = 360 / items.length;
    const point = (radius, degrees) => ({ x: 300 + radius * Math.cos(degrees * Math.PI / 180), y: 300 + radius * Math.sin(degrees * Math.PI / 180) });
    return items.map((animal, index) => {
      const globalIndex = ringName === "outer" ? index : 50 + index;
      const start = -90 + index * step + 0.18, end = -90 + (index + 1) * step - 0.18, middle = (start + end) / 2;
      const a = point(outerRadius, start), b = point(outerRadius, end), c = point(innerRadius, end), d = point(innerRadius, start);
      const numberPoint = point(outerRadius - 15, middle);
      const iconPoint = point((innerRadius + outerRadius) / 2, middle);
      const fill = animal.number === "0" || animal.number === "00" ? "#087c3c" : (index % 2 === (ringName === "outer" ? 0 : 1) ? "#b51d27" : "#111a18");
      const active = millonarioLedIndex === globalIndex;
      return <g key={`${ringName}-${animal.number}`} className={active ? "millonario-led-active" : ""}>
        <path d={`M ${a.x} ${a.y} A ${outerRadius} ${outerRadius} 0 0 1 ${b.x} ${b.y} L ${c.x} ${c.y} A ${innerRadius} ${innerRadius} 0 0 0 ${d.x} ${d.y} Z`} fill={fill} stroke="#e8c36c" strokeWidth="1.1" />
        <text x={numberPoint.x} y={numberPoint.y + 3} textAnchor="middle" dominantBaseline="middle" className="millonario-number">{animal.number}</text>
        <text x={iconPoint.x} y={iconPoint.y + 3} textAnchor="middle" dominantBaseline="middle" className="millonario-animal">{animal.number === "0" || animal.number === "00" ? animalEmoji(animal) : (animal.number <= "75" ? animalEmoji(animal) : "🐾")}</text>
      </g>;
    });
  };
  const millonarioOuterRing = makeMillonarioRing(millonarioOuterAnimals, 222, 286, "outer");
  const millonarioInnerRing = makeMillonarioRing(millonarioInnerAnimals, 130, 194, "inner");

  const guacharoColor = (animal, ringName, index) => {
    if (animal.number === "0" || animal.number === "00") return "#087c3c";
    // Colores alternados como en el tablero de referencia, sin alterar la posición.
    const isRed = ringName === "outer" ? index % 2 === 1 : index % 2 === 0;
    return isRed ? "#b51d27" : "#111a18";
  };

  const makeGuacharoRing = (items, innerRadius, outerRadius, ringName) => {
    const step = 360 / items.length;
    const point = (radius, degrees) => ({
      x: 300 + radius * Math.cos(degrees * Math.PI / 180),
      y: 300 + radius * Math.sin(degrees * Math.PI / 180),
    });
    const pocketInner = outerRadius - 34;
    return items.map((animal, index) => {
      const start = -90 + index * step + 0.22;
      const end = -90 + (index + 1) * step - 0.22;
      const middle = (start + end) / 2;
      const numberPoint = point(outerRadius - 17, middle);
      const iconPoint = point(innerRadius + (pocketInner - innerRadius) * 0.52, middle);
      const sectorPath = (inner, outer) => {
        const a = point(outer, start), b = point(outer, end);
        const c = point(inner, end), d = point(inner, start);
        return `M ${a.x} ${a.y} A ${outer} ${outer} 0 0 1 ${b.x} ${b.y} L ${c.x} ${c.y} A ${inner} ${inner} 0 0 0 ${d.x} ${d.y} Z`;
      };
      const numberFill = guacharoColor(animal, ringName, index);
      const iconSize = ringName === "outer" ? 13 : 12;
      const imageSize = ringName === "outer" ? 19 : 17;
      return (
        <g key={`${ringName}-${animal.number}`} className={guacharoLedIndex === (ringName === "outer" ? index : guacharoOuterAnimals.length + index) ? "guacharo-led-active" : ""}>
          {/* Casilla numerada: mismo acabado rojo, negro y verde de Lotto */}
          <path d={sectorPath(pocketInner, outerRadius)} fill={numberFill} stroke="#e8c36c" strokeWidth="1.65" />
          <path d={sectorPath(innerRadius, pocketInner)} fill="#08783b" stroke="#c99b3d" strokeWidth="1.25" />
          <path d={sectorPath(innerRadius, outerRadius)} fill="none" stroke="#fff0bd" strokeOpacity=".16" strokeWidth=".55" />
          <text x={numberPoint.x} y={numberPoint.y + 3} textAnchor="middle" dominantBaseline="middle" className="guacharo-number">{animal.number}</text>
          <text x={iconPoint.x} y={iconPoint.y + 4} textAnchor="middle" dominantBaseline="middle" className="guacharo-animal-icon" style={{ fontSize: iconSize }}>{animalEmoji(animal)}</text>
          <image href={`/animalitos/${animalAssetNumber(animal.number)}.png`} x={iconPoint.x - imageSize / 2} y={iconPoint.y - imageSize / 2} width={imageSize} height={imageSize} preserveAspectRatio="xMidYMid meet" />
        </g>
      );
    });
  };
  const guacharoOuterRing = makeGuacharoRing(guacharoOuterAnimals, 202, 286, "outer");
  const guacharoInnerRing = makeGuacharoRing(guacharoInnerAnimals, 112, 194, "inner");

  const wheelPockets = wheelAnimals.map((animal, index) => {
    const isGreen = animal.color === "green";
    const isRed = animal.color === "red";

    const fill = isGreen
      ? "#087c3c"
      : isRed
        ? "#b51d27"
        : "#111a18";

    const center = -90 + (index + 0.5) * STEP;

    const numberPoint = polar(238, center);
    const animalPoint = polar(178, center);

    return (
      <g key={animal.number}>
        {/* Casilla numerada con su color correspondiente */}
        <path
          d={ringSector(index, 211, 265)}
          fill={fill}
          stroke="#e8c36c"
          strokeWidth="1.8"
        />

        {/* Anillo interior */}
        <path
          d={ringSector(index, 146, 211)}
          fill="#08783b"
          stroke="#c99b3d"
          strokeWidth="1.2"
        />

        {/* Número */}
        <g
          transform={`rotate(${center + 90} ${numberPoint.x} ${numberPoint.y})`}
        >
          <text
            x={numberPoint.x}
            y={numberPoint.y + 7}
            textAnchor="middle"
            className="roulette-number"
            fontSize={animal.number.length > 1 ? 21 : 25}
          >
            {animal.number}
          </text>
        </g>

        {/* Animalito */}
        <g
          transform={`rotate(${center + 90} ${animalPoint.x} ${animalPoint.y})`}
        >
          <image
            href={`/animalitos/${animal.number}.png`}
            x={animalPoint.x - 15}
            y={animalPoint.y - 15}
            width="25"
            height="25"
            preserveAspectRatio="xMidYMid meet"
            className="roulette-animal"
          />
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

        {screen === "selector" && (
          <section className="mode-selector">
            <div className="mode-kicker">✦ TU SUERTE ✦</div>
            <h2>ELIGE TU RULETA</h2>
            <p>Selecciona la modalidad que deseas jugar</p>
            <div className="mode-options">
              <button className="mode-card" onClick={() => setScreen("lotto")}>
                <div className="mode-logos">
                  <span className="mode-number"><img src="/lotto-activo.webp" alt="Lotto Activo" /></span>
                  <span className="mode-number"><img src="/guacharito-millonario.png" alt="Guácharo Activo" /></span>
                  <span className="mode-number"><img src="/selva-plus.webp" alt="Selva Plus" /></span>
                </div>
                <strong>LOTTO ACTIVO</strong><small>La ruleta clásica para Lotto Activo, La Granjita y Selva Plus de 38 animalitos</small><b>RULETA CLÁSICA ↗</b>
              </button>
              <button className="mode-card" onClick={() => setScreen("guacharo")}>
                <span className="mode-number"><img src={`/guacharo-activo.png`} /></span><strong>GUÁCHARO ACTIVO</strong><small>Ruleta para Guácharo Activo de 77 animalitos</small><b>RULETA GUÁCHARO ACTIVO ↗</b>
              </button>
              <button className="mode-card" onClick={() => setScreen("millonario")}>
                <span className="mode-number"><img src={`/guacharito-millonario.png`} /></span><strong>GUACHARITO MILLONARIO</strong><small>Ruleta de Guacharito Millonario de 101 animalitos</small><b>GIRAR GUACHARITO MILLONARIO ↗</b>
              </button>
            </div>
          </section>
        )}

        {screen === "guacharo" && (
          <section className="guacharo-screen">
            {/*<button className="back-mode" onClick={() => setScreen("selector")}>← VOLVER A TU SUERTE</button>*/}
            <section className="hero-grid guacharo-hero-grid">
              <aside className="side-card left-card">
                <div className="side-icon">✦</div>
                <p className="script-copy">¡Gira,<br />descubre y<br /><em>gana!</em></p>
                <div className="side-rule" />
                <div className="coin-stack"><span>✿</span><span>✿</span><span>✿</span></div>
              </aside>

              <section className="game-area" aria-label="Ruleta Guácharo Activo de 77 animalitos">
                <div className="wheel-heading"><span className="live-dot" /> RULETA GUÁCHARO ACTIVO <span className="heading-line" /></div>
                <div className="wheel-wrap guacharo-wrap">
                  <div className="wheel-halo" />
                  <div className="wheel-disc guacharo-disc">
                    <svg viewBox="0 0 600 600" role="img" aria-label="Ruleta Guácharo Activo: 76 casillas y el 75 central, 77 resultados posibles">
                      <defs>
                        <radialGradient id="guacharoWood" cx="42%" cy="35%" r="75%">
                          <stop offset="0%" stopColor="#9b5720" />
                          <stop offset="48%" stopColor="#66300f" />
                          <stop offset="100%" stopColor="#2a1008" />
                        </radialGradient>
                        <linearGradient id="guacharoGold" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#fff0a5" />
                          <stop offset="30%" stopColor="#d99a2d" />
                          <stop offset="58%" stopColor="#fff0a0" />
                          <stop offset="100%" stopColor="#88500d" />
                        </linearGradient>
                        <pattern id="guacharoWoodgrain" width="110" height="45" patternUnits="userSpaceOnUse">
                          <path d="M0 12 C25 2 42 25 70 13 S100 7 110 15 M-8 32 C20 20 45 42 78 29 S103 25 118 32" fill="none" stroke="#d18a42" strokeOpacity=".18" strokeWidth="2" />
                          <path d="M12 0 C22 13 17 27 31 45 M87 0 C75 14 94 26 81 45" fill="none" stroke="#210d06" strokeOpacity=".22" strokeWidth="3" />
                        </pattern>
                      </defs>
                      <circle cx="300" cy="300" r="298" fill="url(#guacharoWood)" stroke="url(#guacharoGold)" strokeWidth="7" />
                      <circle cx="300" cy="300" r="292" fill="url(#guacharoWoodgrain)" stroke="#5c310e" strokeWidth="2" />
                      <circle cx="300" cy="300" r="273" fill="none" stroke="#d9a64a" strokeWidth="2" />
                      <circle cx="300" cy="300" r="267" fill="none" stroke="#321608" strokeWidth="3" />
                      <circle cx="300" cy="300" r="211" fill="#064c2a" stroke="url(#guacharoGold)" strokeWidth="5" />
                      {guacharoOuterRing}
                      {guacharoInnerRing}
                      <circle cx="300" cy="300" r="199" fill="none" stroke="url(#guacharoGold)" strokeWidth="6" />
                      <circle cx="300" cy="300" r="188" fill="none" stroke="#e3b957" strokeWidth="2" />
                      <circle cx="300" cy="300" r="116" fill="url(#guacharoWood)" stroke="url(#guacharoGold)" strokeWidth="9" />
                      <circle cx="300" cy="300" r="105" fill="url(#guacharoWoodgrain)" stroke="#3c1b0a" strokeWidth="2" />
                      <circle cx="300" cy="300" r="96" fill="none" stroke="#d59b3a" strokeWidth="2" />
                      <text x="300" y="275" textAnchor="middle" className="guacharo-center-kicker">GUÁCHARO</text>
                      <text x="300" y="343" textAnchor="middle" className={`guacharo-center-number ${guacharoLedIndex === guacharoWheelAnimals.length ? "guacharo-center-led-active" : ""}`}>75</text>
                      <path d="M 266 357 Q 300 373 334 357" fill="none" stroke="#e7c36c" strokeWidth="2" strokeLinecap="round" />
                      {Array.from({ length: 16 }, (_, i) => { const p = polar(281, i * 22.5); return <circle key={`guacharo-rivet-${i}`} cx={p.x} cy={p.y} r="3.2" fill="#f2cf76" stroke="#75410d" strokeWidth="1" />; })}
                    </svg>
                  </div>
                </div>
                <div className="spin-controls">
                  <span className="chevron">‹‹</span>
                  <button className="spin-button" onClick={spinGuacharo} disabled={guacharoSpinning}>
                    <span className={guacharoSpinning ? "button-spinner" : "button-arrow"}>{guacharoSpinning ? "◌" : "✦"}</span>
                    <span>{guacharoSpinning ? "RULETA EN MARCHA..." : "¡GIRA LA RULETA!"}</span><b>✦</b>
                  </button>
                  <span className="chevron">››</span>
                </div>
                <p className="spin-hint">{guacharoSpinning ? "GIRANDO · BUSCANDO EL NÚMERO GANADOR..." : "PRESIONA PARA INICIAR LA RULETA"}</p>
                <section className="history-panel">
                  <div className="history-title"><span>ÚLTIMOS RESULTADOS · GUÁCHARO</span><small>HISTORIAL</small></div>
                  <div className="history-items">{guacharoHistory.length ? guacharoHistory.map((item, i) => <div className="history-chip" key={`${item.number}-${i}`}><span className="guacharo-history-animal">{animalEmoji(item)}</span><b>{item.number}</b><small>{item.name}</small></div>) : <p className="empty-history">Tus resultados aparecerán aquí después del primer giro.</p>}</div>
                </section>
              </section>

              <aside className="side-card right-card">
                <div className="side-title">✧ TU SUERTE ✧</div>
                <button className="mini-mode-button" onClick={() => setScreen("selector")}>CAMBIAR RULETA</button>
                <div className="feature"><span>✓</span><p><b>Juego recreativo</b><small>Selección aleatoria</small></p></div>
                <div className="feature"><span>🏆</span><p><b>¡Mucha suerte!</b><small>Que gane tu favorito</small></p></div>
                <div className="pot">🪙<span>LA FORTUNA<br />TE ESPERA</span></div>
              </aside>
            </section>
          </section>
        )}

        {screen === "millonario" && (
          <section className="guacharo-screen millonario-screen">
            {/*<button className="back-mode" onClick={() => setScreen("selector")}>← VOLVER A TU SUERTE</button>*/}
            <section className="hero-grid millonario-hero-grid">
              <aside className="side-card left-card"><div className="side-icon">✦</div><p className="script-copy">¡La fortuna<br />está en tus<br /><em>manos!</em></p><div className="side-rule" /><div className="coin-stack"><span>✿</span><span>✿</span><span>✿</span></div></aside>
              <section className="game-area" aria-label="Guacharito Millonario, 101 resultados posibles">
                <div className="wheel-heading"><span className="live-dot" /> GUACHARITO MILLONARIO <span className="heading-line" /></div>
                <div className="wheel-wrap guacharo-wrap millonario-wrap"><div className="wheel-halo" /><div className="wheel-disc guacharo-disc millonario-disc">
                  <svg viewBox="0 0 600 600" role="img" aria-label="Dos anillos de 50 casillas y el 99 de Guacharito en el centro">
                    <defs><radialGradient id="millonarioGold" cx="45%" cy="35%" r="70%"><stop offset="0%" stopColor="#fff4b5" /><stop offset="55%" stopColor="#bd8427" /><stop offset="100%" stopColor="#50300d" /></radialGradient><linearGradient id="millonarioCenter" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fff1a4" /><stop offset="50%" stopColor="#c58a2b" /><stop offset="100%" stopColor="#4a260c" /></linearGradient></defs>
                    <circle cx="300" cy="300" r="298" fill="#211208" stroke="url(#millonarioGold)" strokeWidth="8" />
                    <circle cx="300" cy="300" r="292" fill="none" stroke="#f4d77e" strokeWidth="2" />
                    <circle cx="300" cy="300" r="211" fill="#1b1710" stroke="url(#millonarioGold)" strokeWidth="7" />
                    {millonarioOuterRing}{millonarioInnerRing}
                    <circle cx="300" cy="300" r="126" fill="url(#millonarioCenter)" stroke="#f9e5a0" strokeWidth="8" className={millonarioLedIndex === 100 ? "millonario-center-led-active" : ""} />
                    <circle cx="300" cy="300" r="111" fill="#173c25" stroke="#8c5d19" strokeWidth="4" />
                    <circle cx="300" cy="300" r="99" fill="#f2d78b" stroke="#fff0b4" strokeWidth="3" />
                    <text x="300" y="260" textAnchor="middle" className={`millonario-center-number ${millonarioLedIndex === 100 ? "millonario-center-led-active" : ""}`}>99</text>
                    <text x="300" y="330" textAnchor="middle" className="millonario-mascot">🦉</text>
                    <text x="300" y="360" textAnchor="middle" className="millonario-center-name">GUACHARITO</text>
                    <circle cx="300" cy="300" r="116" fill="none" stroke="#b21e28" strokeWidth="5" strokeDasharray="12 8" />
                    {Array.from({ length: 20 }, (_, i) => { const p = polar(280, i * 18); return <circle key={`mill-rivet-${i}`} cx={p.x} cy={p.y} r="2.8" fill="#fff0a0" stroke="#805116" />; })}
                  </svg>
                </div></div>
                <div className="spin-controls"><span className="chevron">‹‹</span><button className="spin-button" onClick={spinMillonario} disabled={millonarioSpinning}><span className={millonarioSpinning ? "button-spinner" : "button-arrow"}>{millonarioSpinning ? "◌" : "✦"}</span><span>{millonarioSpinning ? "RULETA EN MARCHA..." : "¡GIRA LA RULETA!"}</span><b>✦</b></button><span className="chevron">››</span></div>
                {/*<p className="spin-hint">{millonarioSpinning ? "GIRANDO · BUSCANDO EL NÚMERO GANADOR..." : "0 · 00 · 01–98 EN LOS ANILLOS · 99 EN EL CENTRO"}</p>*/}
                <p className="spin-hint">{guacharoSpinning ? "GIRANDO · BUSCANDO EL NÚMERO GANADOR..." : "PRESIONA PARA INICIAR LA RULETA"}</p>
                <section className="history-panel"><div className="history-title"><span>ÚLTIMOS RESULTADOS · GUACHARITO</span><small>HISTORIAL</small></div><div className="history-items">{millonarioHistory.length ? millonarioHistory.map((item, i) => <div className="history-chip" key={`${item.number}-${i}`}><span className="guacharo-history-animal">{item.number === "99" ? "🦉" : animalEmoji(item)}</span><b>{item.number}</b><small>{item.name}</small></div>) : <p className="empty-history">Tus resultados aparecerán aquí después del primer giro.</p>}</div></section>
              </section>
              <aside className="side-card right-card"><div className="side-title">✧ TU SUERTE ✧</div><button className="mini-mode-button" onClick={() => setScreen("selector")}>CAMBIAR RULETA</button><div className="feature"><span>✓</span><p><b>101 resultados</b><small>Selección aleatoria</small></p></div><div className="feature"><span>🏆</span><p><b>99 · Guacharito</b><small>También puede ganar</small></p></div><div className="pot">🪙<span>LA FORTUNA<br />TE ESPERA</span></div></aside>
            </section>
          </section>
        )}

        {screen === "lotto" && <>
          {/*<div className="mode-toolbar"><button className="back-mode" onClick={() => setScreen("selector")}>← CAMBIAR MODALIDAD</button></div>*/}
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
                  <span>{spinning ? "GIRANDO..." : "¡GIRA LA RULETA!"}</span>
                  <b>✦</b>
                </button>
                <span className="chevron">››</span>
              </div>
              <p className="spin-hint">{spinning ? "ESCUCHA LA RULETA EN MOVIMIENTO..." : "PRESIONA PARA DESCUBRIR TU ANIMALITO"}</p>
            </section>

            <aside className="side-card right-card">
              <div className="side-title">✧ TU SUERTE ✧</div>
              <button className="mini-mode-button" onClick={() => setScreen("selector")}>CAMBIAR RULETA</button>
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
              {/* Fuegos artificiales y confeti */}
              <Fireworks />

              <div className="winner-popup">

                <div className="winner-header">
                  ✦ ¡TENEMOS GANADOR! ✦
                </div>

                <div className="result-animal">
                  <img
                    src={`/animalitos/${winner.number}.png`}
                    alt={winner.name}
                  />
                </div>

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
                <div className="history-chip" key={`${item.number}-${i}`}>
                  <span>
                    <img
                      src={`/animalitos/${item.number}.png`}
                      alt={item.name}
                    />
                  </span>
                  <b>{item.number}</b>
                  <small>{item.name}</small>
                </div>
              )) : <p className="empty-history">Tus resultados aparecerán aquí después del primer giro.</p>}
            </div>
          </section>

        </>}

        {showGuacharoPopup && guacharoWinner && (
          <div className={`winner-overlay ${guacharoPopupExiting ? "is-exiting" : ""}`} role="dialog" aria-modal="true" aria-label="Resultado ganador de Guácharo Activo">
            <Fireworks />
            <div className="winner-popup guacharo-winner-popup">
              <div className="winner-header">✦ ¡TENEMOS GANADOR! ✦</div>
              <div className="result-animal guacharo-winner-art">
                <span>{animalEmoji(guacharoWinner)}</span>
                <img src={`/animalitos/${animalAssetNumber(guacharoWinner.number)}.png`} alt={guacharoWinner.name} onError={(event) => { event.currentTarget.style.display = "none"; }} />
              </div>
              <div className="result-number winner-number">
                <span>RESULTADO GANADOR · GUÁCHARO ACTIVO</span>
                <strong>{guacharoWinner.number}</strong>
                <b>{guacharoWinner.name}</b>
              </div>
              <div className="result-message"><span>✦</span><p>¡Espero tengas mucha suerte!</p><Clover className="result-clover" /></div>
            </div>
          </div>
        )}

        {showMillonarioPopup && millonarioWinner && (
          <div className={`winner-overlay ${millonarioPopupExiting ? "is-exiting" : ""}`} role="dialog" aria-modal="true" aria-label="Resultado ganador de Guacharito Millonario">
            <Fireworks />
            <div className="winner-popup guacharo-winner-popup millonario-winner-popup">
              <div className="winner-header">✦ ¡TENEMOS GANADOR! ✦</div>
              <div className="result-animal guacharo-winner-art"><span>{millonarioWinner.number === "99" ? "🦉" : animalEmoji(millonarioWinner)}</span></div>
              <div className="result-number winner-number"><span>RESULTADO GANADOR · GUACHARITO MILLONARIO</span><strong>{millonarioWinner.number}</strong><b>{millonarioWinner.name}</b></div>
              <div className="result-message"><span>✦</span><p>¡La suerte está de tu lado!</p><Clover className="result-clover" /></div>
            </div>
          </div>
        )}

        <footer><Clover className="footer-clover" /><span>SPINNER LUCKY EDUARVEN</span><i /> EXPERIENCIA DE JUEGO RECREATIVA <i /></footer>
      </div>
    </main>
  );
}
