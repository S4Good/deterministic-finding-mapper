# Deterministic Finding Mapper

Ein kleines, öffentlich teilbares Lernprojekt in TypeScript. Es demonstriert,
wie ein technisches Scanner-Finding **deterministisch** einer fiktiven
Compliance-Anforderung zugeordnet wird.

Alle Scanner, Findings, Frameworks und Controls in diesem Repository sind
frei erfunden. Es enthält keine Kunden-, Arbeitgeber-, ISO-, BSI-, DORA- oder
anderen vertraulichen Daten.

## Die Idee

```text
Scanner-Finding
  → exakte Regel für Tool + Finding-ID suchen
  → Titel, Benchmark und Version prüfen
  → fiktives Control ausgeben
```

Beispiel:

```text
demo-scanner / AUTH-001
  → DemoSec 2026 / AC-01 – Protected authentication
```

Ein unbekanntes Finding wird bewusst nicht geraten:

```text
new-scanner / UNKNOWN-001
  → no_rule
```

Ein veränderter Titel wird ebenfalls nicht still übernommen:

```text
bekannte Finding-ID, anderer Titel
  → stale_rule
```

## Start

Voraussetzung: Node.js 22 oder neuer.

```bash
npm install
npm test
npm run demo
```

## Projektstruktur

| Datei | Aufgabe |
|---|---|
| `src/types.ts` | Datenmodelle |
| `src/mapper.ts` | reine Entscheidungslogik |
| `src/demo-data.ts` | vollständig erfundene Demo-Regeln und Findings |
| `src/demo.ts` | führt die Demo aus |
| `test/mapper.test.ts` | drei automatisierte Tests |

## Wichtige Grenze

Dieses Projekt zeigt eine feste Regelbibliothek. Es kann unbekannte Finding-
Familien nicht selbst fachlich verstehen oder korrekt zuordnen. Dafür braucht
man entweder neue Regeln oder eine separate KI-/semantische Suchkomponente.

## Lizenz

MIT
