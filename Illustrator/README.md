# Count Colors in Illustrator

Iterates over all shapes in the current document, adds a new layer named "ColorCount" where
color sample rectangles are inserted followed by text that shows how often each color is used.

USAGE:

Open Illustrator CS3, choose File > Scripts > Other... and select the jsx file.
Follow onscreen instructions.

If a layer named "ColorCount" exists when the script is executed:

- it will NOT be removed or changed 	(the script will simply add another "ColorCount" layer for results presentation)
- it will be skipped for counting 	(otherwise the previous color count results would be included into the count itself)