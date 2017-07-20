# Farben zählen in Illustrator

Aus gegebenem Anlass habe ich ein Automatisierungsscript für Illustrator geschrieben, das die in einem Dokument verwendeten Farben zählt und einen Report ausgibt. Hintergrund ist z.B. die Frage "Wie viele Flächen (Pfadobjekte) sind mit der Farbe X gefüllt?".

Mein Script durchläuft nun alle Ebenen und Pfadobjekte des Dokuments und zählt, welche Pfade die gleiche Füllfarbe aufweisen. Anschließend wird eine neue Ebene hinzugefügt und in dieser die Auswertung in Form von Farbfeld-Text-Elementen hinzugefügt.

Das Script ist hier kostenlos verfügbar (Lizenz: MIT) und wurde für und mit Illustrator CS3 getestet. Natürlich gibt es noch einiges an Entwicklungsspielraum. So könnten z.B. weitere Elementtypen und Gruppen ebenfalls berücksichtigt werden.

## Verwendung

 * Illustrator öffnen, Datei > Scripte > Andere... und die jsx-Datei auswählen.
 * Den Anweisungen auf dem Bildschirm folgen.

Wenn eine Ebene namens "ColorCount" existiert, dann:
 * wird diese NICHT verändert oder entfernt (das Script wird einfach eine weitere Ebene mit den Ergebnissen hinzufügen)
 * wird diese Ebene in der Zählung übersprungen (sonst würden die bisherigen Ergebnisse ja auch als Farbflächen zählen)


## Bilder
![Wie oft kommt jede Farbe vor?](https://raw.githubusercontent.com/renebuehling/design/master/Illustrator/ColorCount/(readme-files)/ColorCountAI-01.jpg "Wie oft kommt jede Farbe vor?")

![Optionen des ColorCount Scripts.](https://raw.githubusercontent.com/renebuehling/design/master/Illustrator/ColorCount/(readme-files)/ColorCountAI-02.jpg "Optionen des ColorCount Scripts.")

![Ergebnis des Mini-Reports](https://raw.githubusercontent.com/renebuehling/design/master/Illustrator/ColorCount/(readme-files)/ColorCountAI-03.jpg "Ergebnis des Mini-Reports")

![Ergebnis des ausführlichen Reports ](https://raw.githubusercontent.com/renebuehling/design/master/Illustrator/ColorCount/(readme-files)/ColorCountAI-04.jpg "Ergebnis des ausführlichen Reports")
