import { useState } from "react";
import { CombatantList } from "./components/CombatantList";
import type { Combatant } from "./components/CombatantList";


function App() {//La tabla con los placeholder
  const [combatants, setCombatants] = useState<Combatant[]>([ 
    {id: 1,name: "PJ 1",hp: 0,initiative: 0,turn: 0,attack: 0,defense: 0,damage: 0,extra1: "",extra2: "",},
    {id: 2,name: "PJ 2",hp: 0,initiative: 0,turn: 0,attack: 0,defense: 0,damage: 0,extra1: "",extra2: "",},
  ]);
    const [attackSkill, setAttackSkill] = useState(0);
    const [defenseSkill, setDefenseSkill] = useState(0);
    const [baseDamage, setBaseDamage] = useState(0);
    const [ta, setTa] = useState(0);
    const [attackResult, setAttackResult] = useState<string>("");


  /*
  // TIRADA CON PIFIA INCLUIDA
  const rollOpenWithFumble = () => {
  let total = 0;
  let openRange = 90; // primera abierta en 90–100

  const roll = Math.floor(Math.random() * 100) + 1;

  //  PIFIA DE ANIMA (1–3)
  if (roll <= 3) {
    const secondRoll = Math.floor(Math.random() * 100) + 1;
    return roll - secondRoll; // solo se resta UNA tirada
  }

  //  TIRADA NORMAL O ABIERTA
  total += roll;

  // abiertas con rango que se reduce
let currentRoll = roll;
while (currentRoll >= openRange) {
  openRange++;
  currentRoll = Math.floor(Math.random() * 100) + 1;
  total += currentRoll;
}


  return total;
};
  */
const rollOpen = () => {
  let total = 0;
  let openRange = 90;

  // Primera tirada
  const roll = Math.floor(Math.random() * 100) + 1;

  // PIFIA EN INICIATIVA
  if (roll <= 3) {
    if (roll === 3) return -75;
    if (roll === 2) return -100;
    if (roll === 1) return -125;
  }

  // TIRADA NORMAL O ABIERTA
  total += roll;

  let currentRoll = roll;
  while (currentRoll >= openRange) {
    openRange++;
    currentRoll = Math.floor(Math.random() * 100) + 1;
    total += currentRoll;
  }

  return total;
};


  const newRound = () => {
  const updated = combatants.map(c => {
    const openRoll = rollOpen();
    return {
      ...c,
      turn: c.initiative + openRoll,
    };
  });


  const ordered = updated.sort((a, b) => b.turn - a.turn);

  setCombatants(ordered);
};

const resolveAttack = () => {
  const diff = attackSkill - defenseSkill;

  // 1. CONTRAATAQUE (diferencia negativa)
  if (diff < 0) {
    const absDiff = Math.abs(diff);
    const half = absDiff / 2;
    const counter = Math.floor(half / 5) * 5;

    setAttackResult(
      `Contraataque del defensor: ${counter} puntos (diferencia ${diff}).`
    );
    return;
  }

  // 2. ATAQUE SIN DAÑO PERO EL DEFENSOR PIERDE ACCIÓN (0 < diff <= 20)
  if (diff >= 0 && diff <= 20) {
    setAttackResult(
      `El ataque no causa daño, pero el defensor pierde su acción. (Diferencia ${diff})`
    );
    return;
  }

  // 3. ATAQUE NORMAL (diff > 20)
  if (diff > 20) {
    const damagePercent = diff;
    const rawDamage = baseDamage * (damagePercent / 100);

    const armor = 20 + ta * 10;
    let finalDamage = rawDamage - armor;

    if (finalDamage < 0) finalDamage = 0;

    setAttackResult(
      `Diferencia AT-DF: ${diff} (${damagePercent}% del daño). Daño final tras armadura: ${Math.floor(
        finalDamage
      )}`
    );
    return;
  }
};




  const addCombatant = () => { //Añadir combatiente
    const newId =
      combatants.length > 0
        ? combatants[combatants.length - 1].id + 1
        : 1;

    const newCombatant: Combatant = {
      id: newId,
      name: "Nuevo combatiente",
      hp: 0,
      initiative: 0,
      turn: 0,
      attack: 0,
      defense: 0,
      damage: 0,
      extra1: "",
      extra2: "",
    };

    setCombatants([...combatants, newCombatant]);
  };

 return (
  <>
    <div style={{ padding: "1rem" }}>
      <h2>Anima Herramientas de Combate</h2>

      <button onClick={addCombatant}>
        Añadir combatiente
      </button>

      <CombatantList combatants={combatants} onUpdate={setCombatants} />

      <button onClick={newRound}>
        Nuevo asalto
      </button>
    </div>

    <div className="attack-section">
      <h2>Resolución de ataque</h2>

      <div>
        <label>Habilidad de ataque:</label>
        <input
          type="number"
          value={attackSkill}
          onChange={e => setAttackSkill(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Habilidad de defensa:</label>
        <input
          type="number"
          value={defenseSkill}
          onChange={e => setDefenseSkill(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Daño del golpe:</label>
        <input
          type="number"
          value={baseDamage}
          onChange={e => setBaseDamage(Math.max(0, Number(e.target.value)))}
        />
      </div>

      <div>
        <label>TA del defensor:</label>
        <input
          type="number"
          value={ta}
          onChange={e => setTa(Math.max(0, Number(e.target.value)))}
        />
      </div>

      <button onClick={resolveAttack}>Calcular daño</button>

      <div style={{ marginTop: "1rem" }}>
        <strong>Resultado:</strong> {attackResult}
      </div>
    </div>
  </>
);
}

export default App;