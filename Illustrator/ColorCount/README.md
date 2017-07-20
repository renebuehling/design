_Read this text in: [German (Deutsch)](README.de.md)_

# Count Colors in Illustrator

Iterates over all shapes in the current document, adds a new layer named "ColorCount" where
color sample rectangles are inserted followed by text that shows how often each color is used.

## Usage

Open Illustrator CS3, choose File > Scripts > Other... and select the jsx file.
Follow onscreen instructions.

If a layer named "ColorCount" exists when the script is executed:

- it will NOT be removed or changed 	(the script will simply add another "ColorCount" layer for results presentation)
- it will be skipped for counting 	(otherwise the previous color count results would be included into the count itself)

## Images

![How often does each color appear?](https://raw.githubusercontent.com/renebuehling/design/master/Illustrator/ColorCount/(readme-files)/ColorCountAI-01.jpg "How often does each color appear")

![Options of ColorCount Script.](https://raw.githubusercontent.com/renebuehling/design/master/Illustrator/ColorCount/(readme-files)/ColorCountAI-02.jpg "Options of ColorCount Script.")

![Results of  short report](https://raw.githubusercontent.com/renebuehling/design/master/Illustrator/ColorCount/(readme-files)/ColorCountAI-03.jpg "Results of  short report")

![Results of full report](https://raw.githubusercontent.com/renebuehling/design/master/Illustrator/ColorCount/(readme-files)/ColorCountAI-04.jpg "Results of full report")
