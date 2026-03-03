---
description: Neue Trello-Aufgabe starten – Ticket auswählen, Branch erstellen, Tests laufen lassen, Implementierungsplan schreiben
---

# Neue Aufgabe starten

## 1. Trello Backlog anzeigen

Verwende das Trello MCP, um alle Karten aus der **📋 Backlog**-Liste zu laden. Die Backlog-Liste hat die ID `69a686f0d7285b46a7ae74c2` auf Board `69a686b7fcd20ba7cbeb6703`.

Zeige dem User eine übersichtliche Tabelle mit:
- Nummer
- Label (✨ Feature / 🐛 Bug / etc.)
- Kartenname
- Kurzbeschreibung (gekürzt auf ~60 Zeichen)

Frage den User, welche Aufgabe er angehen möchte. **Warte auf Antwort.**

## 2. Trello-Karte nach "In Progress" verschieben

Verschiebe die ausgewählte Karte in die **🚧 In Progress**-Liste (ID: `69a686f3de4378c930cb7174`).

## 3. Git: Pull + Branch erstellen + auschecken

// turbo
Führe `git pull origin master` im Projektverzeichnis `/Users/maikschoessler/projects/antigravity/monsterDefense` aus.

Erstelle einen Branch basierend auf dem Trello-Label und dem Kartennamen:
- **✨ Feature** → `feature/<kebab-case-name>`
- **🐛 Bug** → `fix/<kebab-case-name>`
- **Kein Label / sonstiges** → `chore/<kebab-case-name>`

Beispiel: Karte "Globale Leaderboard-Ansicht" mit Label "✨ Feature" → `feature/globale-leaderboard-ansicht`

// turbo
Führe aus:
```bash
git checkout -b <branch-name>
```

## 4. Tests laufen lassen

// turbo
Führe die komplette Testsuite aus:
```bash
cd /Users/maikschoessler/projects/antigravity/monsterDefense && npx vitest run tests/
```

Wenn Tests fehlschlagen, informiere den User und stoppe den Workflow. Sonst weiter.

## 5. Trello-Aufgabe im Detail lesen

Hole dir die vollständigen Details der ausgewählten Trello-Karte:
- Komplette Beschreibung
- Labels
- Kommentare (falls vorhanden)
- Checklisten (falls vorhanden)

## 6. Implementierungsplan erstellen

Analysiere den Code im Workspace und die Trello-Aufgabe. Erstelle einen **Implementierungsplan** als Artifact (`implementation_plan.md`) mit:
- Ist-Zustand / Problemanalyse
- Vorgeschlagene Änderungen (gruppiert nach Dateien/Komponenten)
- Offene Fragen an den User (falls nötig)
- Verifikationsplan (Tests, Browser-Tests etc.)

**WICHTIG:** Fange NICHT mit der Umsetzung an! Zeige den Plan dem User zur Freigabe.
