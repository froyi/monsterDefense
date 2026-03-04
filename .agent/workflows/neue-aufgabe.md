---
description: Neue Trello-Aufgabe starten – Ticket auswählen, Branch erstellen, Tests laufen lassen, Implementierungsplan schreiben
---

# Neue Aufgabe starten

// turbo-all

## 1. Trello-Board laden

Setze das **🐉 Monster Defense** Board (`69a686b7fcd20ba7cbeb6703`) als aktives Board.

## 2. Backlog-Tickets anzeigen

Hole alle Karten aus der **📋 Backlog**-Liste (`69a686f0d7285b46a7ae74c2`) und zeige sie dem User als nummerierte Liste mit Name, Label und Beschreibung.

**Frage den User**, welches Ticket er bearbeiten möchte.

## 3. Ticket nach "In Progress" verschieben

Verschiebe die gewählte Karte in die **🚧 In Progress**-Liste (`69a686f3de4378c930cb7174`).

## 4. Feature-Branch erstellen

```bash
cd /Users/maikschoessler/projects/antigravity/monsterDefense
git checkout master
git pull
git checkout -b <branch-name>
```

Branch-Naming:
- Feature: `feature/<kurzer-name>`
- Bug: `fix/<kurzer-name>`
- Hotfix: `hotfix/<kurzer-name>`

## 5. Tests laufen lassen

```bash
npx vitest run
```

Stelle sicher, dass alle Tests bestehen (Clean State).

## 6. Codebase analysieren

- Relevante Dateien finden und lesen
- Root-Cause-Analyse bei Bugs
- Bestehende Tests prüfen

## 7. Implementierungsplan schreiben

Erstelle `implementation_plan.md` als Artifact und frage den User nach Review/Approval, bevor mit der Umsetzung begonnen wird.
