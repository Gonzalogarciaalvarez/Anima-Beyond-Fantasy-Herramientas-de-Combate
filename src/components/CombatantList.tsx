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
    <div className="combatant-list">
      {combatants.map(c => (//Cada combatiente es una tarjeta con etiquetas visibles por campo (mejor para movil)
        <div key={c.id} className="combatant-card">
          <div className="field field-name">
            <label>Nombre</label>
            <input
              type="text"
              value={c.name}
              onChange={e => updateField(c.id, "name", e.target.value)}
              placeholder="Nombre"
            />
          </div>

          <div className="field-grid">
            <div className="field">
              <label>HP</label>
              <input
                type="number"
                value={c.hp === 0 || c.hp === undefined ? "" : c.hp}
                onChange={e => updateField(c.id, "hp", Number(e.target.value))}
                placeholder="HP"
              />
            </div>
            <div className="field">
              <label>Iniciativa</label>
              <input
                type="number"
                value={c.initiative === 0 ? "" : c.initiative}
                onChange={e => updateField(c.id, "initiative", Number(e.target.value))}
                placeholder="Iniciativa"
              />
            </div>
            <div className="field">
              <label>Turno</label>
              <input
                type="number"
                value={c.turn === 0 ? "" : c.turn}
                onChange={e => updateField(c.id, "turn", Number(e.target.value))}
                placeholder="Turno"
              />
            </div>
            <div className="field">
              <label>Ataque</label>
              <input
                type="number"
                value={c.attack === 0 ? "" : c.attack}
                onChange={e => updateField(c.id, "attack", Number(e.target.value))}
                placeholder="Ataque"
              />
            </div>
            <div className="field">
              <label>Defensa</label>
              <input
                type="number"
                value={c.defense === 0 ? "" : c.defense}
                onChange={e => updateField(c.id, "defense", Number(e.target.value))}
                placeholder="Defensa"
              />
            </div>
            <div className="field">
              <label>Daño</label>
              <input
                type="number"
                value={c.damage === 0 ? "" : c.damage}
                onChange={e => updateField(c.id, "damage", Number(e.target.value))}
                placeholder="Daño"
              />
            </div>
            <div className="field">
              <label>Extra 1</label>
              <input
                type="text"
                value={c.extra1}
                onChange={e => updateField(c.id, "extra1", e.target.value)}
                placeholder="Extra 1"
              />
            </div>
            <div className="field">
              <label>Extra 2</label>
              <input
                type="text"
                value={c.extra2}
                onChange={e => updateField(c.id, "extra2", e.target.value)}
                placeholder="Extra 2"
              />
            </div>
          </div>

          <button
            className="btn-delete"
            onClick={() => {
              const updated = combatants.filter(x => x.id !== c.id);
              onUpdate(updated);
            }}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};
