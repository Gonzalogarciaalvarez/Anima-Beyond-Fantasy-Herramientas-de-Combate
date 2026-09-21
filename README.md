# 🧩 Anima Herramientas de Combate

**Anima Herramientas de Combate** es una aplicación de escritorio y Android pensada para agilizar los combates en el sistema de rol *Anima: Beyond Fantasy*.
Gestiona a tus combatientes, resuelve la iniciativa de cada asalto y calcula el resultado de un ataque, todo sin salir de una única pantalla.

No requiere cuenta, servidor ni conexión a internet: todos los datos viven solo en tu partida, mientras tienes la app abierta.

---

## 🚀 Características principales

- 📋 **Ficha de combatientes**: añade tantos como necesites, con nombre, HP, iniciativa base, ataque, defensa, daño y dos campos libres para lo que quieras anotar (efectos, notas, etc.).
- 🎲 **Nuevo asalto con un clic**: calcula automáticamente el turno de cada combatiente con una tirada abierta de iniciativa (incluye pifias) y los reordena de mayor a menor.
- ⚔️ **Resolución de ataque**: introduce habilidad de ataque, habilidad de defensa, daño del golpe y TA (Total de Armadura) del defensor, y la app calcula si hay contraataque, si el ataque falla pero el defensor pierde su acción, o el daño final ya restada la armadura.
- 🌗 **Modo claro / oscuro**, con detección automática de la preferencia del sistema y botón para forzarlo.
- 🖥️📱 Disponible como **ejecutable portable para Windows** y **APK para Android**.

---

## 🧠 Tecnologías utilizadas

| Componente | Tecnología |
|-------------|-------------|
| Frontend | React + TypeScript |
| Build web | Vite |
| Empaquetado PC | Tauri 2.x |
| Empaquetado Android | Capacitor |

---

## 📦 Instalación

### 🔹 Versión PC
1. Descarga el `.exe` desde la sección [**Releases**](https://github.com/Gonzalogarciaalvarez/Anima-Beyond-Fantasy-Herramientas-de-Combate/releases) del repositorio.
2. Ejecútalo directamente: es portable, no hace falta instalar nada.

### 🔹 Versión Android
1. Descarga el **APK** desde la misma sección de [**Releases**](https://github.com/Gonzalogarciaalvarez/Anima-Beyond-Fantasy-Herramientas-de-Combate/releases).
2. Al no venir de Play Store, tu móvil puede pedirte permitir la instalación desde "orígenes desconocidos" la primera vez. Acéptalo e instala el APK con normalidad.

---

## 🧩 Uso básico

1. Pulsa **"Añadir combatiente"** por cada personaje o criatura en la escena y rellena su ficha (HP, iniciativa, ataque, defensa...).
2. Pulsa **"Nuevo asalto"**: la app tira la iniciativa abierta de todos y los ordena para que sepas quién actúa primero.
3. Cuando alguien ataque, usa la sección **"Resolución de ataque"**: mete habilidad de ataque, de defensa, daño del golpe y la TA del objetivo, y pulsa **"Calcular daño"** para ver el resultado.
4. Repite "Nuevo asalto" en cada ronda para recalcular el orden de turnos.
