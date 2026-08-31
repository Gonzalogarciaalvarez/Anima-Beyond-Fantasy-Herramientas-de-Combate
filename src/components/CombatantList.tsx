import React from "react";

export interface Combatant { //Aqui definimos los tipos de datos que definen al combatiente
  id: number; //Id su numero unico para identificarlo
  name: string; //Nombre del combatiente
  hp: number; //Puntos de vida
  initiative: number; //Iniciativa base
  turn: number; //Turno en el asalto
  attack: number; //Ataque
  defense: number; //Defensa
  damage: number; //Daño
  extra1: string;
  extra2: string;
}

interface Props {
  combatants: Combatant[];
  onUpdate: (updated: Combatant[]) => void;
}

export const CombatantList: React.FC<Props> = ({ combatants, onUpdate }) => {
  const updateField = (id: number, field: keyof Combatant, value: string | number) => { 
    /*Aqui recibe la informacion de el id (combatiente que quieres modificar), en field se selecciona que propiedad quieres 
    cambiar (name, iniciative, hp...) y value el nuevo valor*/
    const updated = combatants.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ); //Y cuando encuentra el combatiente con la id correcta con ese id, crea una copia con el campo actualizado
    onUpdate(updated); //Y llama a onUpdate para avisar al componente padre
  };

  return (
    <div>
      {combatants.map(c => (//Usaremos input separados para poder editar cada campo sin afectar a los demas
        <div key={c.id} className="combatant-row">
          <input
            type="text"
            value={c.name}
            onChange={e => updateField(c.id, "name", e.target.value)}
            placeholder="Nombre"
          />
          <input
            type="number"
            value={c.hp === 0 || c.hp === undefined ? "" : c.hp}
            onChange={e => updateField(c.id, "hp", Number(e.target.value))}
            placeholder="HP"
          />
          <input
            type="number"
            value={c.initiative === 0 ? "" : c.initiative}
            onChange={e => updateField(c.id, "initiative", Number(e.target.value))}
            placeholder="Iniciativa"
          />
          <input
            type="number"
            value={c.turn === 0 ? "" : c.turn}
            onChange={e => updateField(c.id, "turn", Number(e.target.value))}
            placeholder="Turno"
          />
          <input
            type="number"
            value={c.attack === 0 ? "" : c.attack}
            onChange={e => updateField(c.id, "attack", Number(e.target.value))}
            placeholder="Ataque"
          />
          <input
            type="number"
            value={c.defense === 0 ? "" : c.defense}
            onChange={e => updateField(c.id, "defense", Number(e.target.value))}
            placeholder="Defensa"
          />
          <input
            type="number"
            value={c.damage === 0 ? "" : c.damage}
            onChange={e => updateField(c.id, "damage", Number(e.target.value))}
            placeholder="Daño"
          />
          <input
            type="text"
            value={c.extra1}
            onChange={e => updateField(c.id, "extra1", e.target.value)}
            placeholder="Extra 1"
          />
          <input
            type="text"
            value={c.extra2}
            onChange={e => updateField(c.id, "extra2", e.target.value)}
            placeholder="Extra 2"
          />
          <button onClick={() => {
            const updated = combatants.filter(x => x.id !== c.id);
            onUpdate(updated);
            }}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};
