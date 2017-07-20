/*
		Color Count Script for Illustrator				
		----------------------------------
		VERSION: 2015-08-12		
		Tested with Illustrator CS3
		
		
		SUMMARY: 
		
		Iterates over all shapes in the current document, adds a new layer named "ColorCount" where
		color sample rectangles are inserted followed by text that shows how often each color is used.
		
		If a layer named "ColorCount" exists when the script is executed:
		- it will NOT be removed or changed 	(the script will simply add another "ColorCount" layer for results presentation)
		- it will be skipped for counting 	(otherwise the previous color count results would be included into the count itself)
		

		USAGE:
		
		Open Illustrator CS3, choose File > Scripts > Other... and select the jsx file.
		Follow onscreen instructions.
		
		
		LICENSE:
		
		The MIT License (MIT)

		Copyright (c) 2015 René Bühling, www.buehling.org

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	
	
*/




/*
	showCodes: output color codes
	showObjNames: list all object names having this color
	onlyVisible: skip hidden elements
	onlySelected: iterate through current selection
*/
function execute(showCodes, showObjNames, onlyVisible, onlySelected)
{
	$.writeln("_______________________");
	var colorValues=new Array(); // [colorhash]=ColorObj
	var colors=new Array();	     // [colorhash]=array(PathItem1, PathItem2, ...)


	function c2s(color) //color to string, also used as hash generator
	{
		return "("+color+color.red+","+color.green+","+color.blue+")";
	}

	function process(pi)//PathItem
	{
		$.writeln("pathitem: '"+pi.name); //+"', "+c2s(pi.fillColor));
		if (onlyVisible && pi.hidden) {$.writeln("skipping hidden "+pi.name);return;}
		
		var hash=c2s(pi.fillColor);
		colorValues[hash]=pi.fillColor;
		if (colors[hash]==null) colors[hash]=new Array();
		colors[hash].push(pi);
	}

	var doc = app.activeDocument;
	function iterate(layers) //recursively walk through all layers
	{
		for(var i=0; i<layers.length; i++)
		{
			if (layers[i].name=="ColorCount"){$.writeln("Skipping ColorCount layer...");continue;}
			if (onlyVisible && !layers[i].visible) {$.writeln("Skipping invisible layer "+layers[i].name+"...");continue;}
			
			$.writeln(layers[i].name+" has "+layers[i].layers.length+" sublayers and "+layers[i].pathItems.length+" path items.");
			if (layers[i].layers.length>0) iterate(layers[i].layers);
			
			//walk through all shapes and record/count color:
			for(var j=0; j<layers[i].pathItems.length; j++)
			{
				process(layers[i].pathItems[j]); //PathItem				
			}
		}
	}
	function iterateSelection()
	{
		alert("Selection iteration not yet implemented! :("); //because activedocument.selection is always empty???
		/*
		var sel=app.activeDocument.selection;
		$.writeln(app.activeDocument.selection.length);
		for(var i=0; i<sel.length; i++)
		{
			$.writeln("sel="+sel[i]);
		}*/
	}

	$.writeln("__ Inspect layers __");
	
	if (onlySelected)
		iterateSelection();
	else 
		iterate(doc.layers);

	var resultCount=0; for(var hash in colors) resultCount+=1; //.length does not work as the array is associative, not indexed.

	$.writeln("__ Create results __     ("+resultCount+" colors found)");
	if (resultCount==0) 
		alert("No colors found.\n\n(Elements may have been skipped due to constraints and conditions.)");
	else 
	{
		var lineX=10; var lineY=-10; var maxheight=0;
		var outputLayer = app.activeDocument.layers.add();
		outputLayer.name="ColorCount";
		
		var paper = outputLayer.pathItems.rectangle(0,0,10,10);
		var white=new RGBColor(); white.red=255;white.green=255;white.blue=255;
		paper.fillColor=white;
		paper.strokeColor=new RGBColor();
		
		for(var hash in colors)
		{
			var s=(showCodes?hash:"")+" × "+colors[hash].length;
			$.writeln("- color: "+hash+", "+colorValues[hash]+" have "+ colors[hash].length +" items:");
			if (showObjNames) for(var j in colors[hash]){s+="\n\r"+colors[hash][j].name;}

			var p = outputLayer.pathItems.rectangle(0,0,10,10);
			p.position=[lineX,lineY];
			p.fillColor=colorValues[hash];
			

			var t = outputLayer.textFrames.add();
			// Set the contents and position of the text frame
			t.position = [p.position[0]+p.width+4,p.position[1]];
			t.contents = s;
			t.fillColor = colorValues[hash];
			$.writeln(t.kind);
						
			if (t.height>maxheight) maxheight=t.height; //determine line height			
			lineX=t.position[0]+t.width+15; //next horizontal pos
		
			//scale paper to cover all created contents
			if (paper.width<lineX) paper.width=lineX;
			if (paper.height<(lineY*-1+maxheight)) paper.height=lineY*-1+maxheight;
			
			if (lineX>=app.activeDocument.width) //newline
			{
				lineX = 10;
				lineY-=(maxheight+15);
				maxheight=0;
			}
		}	
		//paper.width+=20;
		paper.height+=20;
	
		
	}//end results found
	$.writeln("_______________________ done");
}
//execute();





var win, windowResource;
 
windowResource = "dialog {  \
    orientation: 'column', \
    alignChildren: ['fill', 'top'],  \
    preferredSize:[300, 130], \
    text: 'ColorCounter',  \
    margins:15, \
    \ "+
	/*
    sliderPanel: Panel { \
        orientation: 'row', \
        alignChildren: 'right', \
        margins:15, \
        text: ' PANEL ', \
        st: StaticText { text: 'Value:' }, \
        sl: Slider { minvalue: 1, maxvalue: 100, value: 30, size:[220,20] }, \
        te: EditText { text: '30', characters: 5, justify: 'left'} \
        } \
	*/
	"\
	cbVisi: Checkbox { text:'Visible objects only', value: true}, \
	cbSel: Checkbox { text:'Selected Layers only (not implemented yet)', value: false, enabled:false }, \
	cbCodes: Checkbox { text:'Include color codes', value: false }, \
	cbList: Checkbox { text:'List color holding objects', value: false }, \
    \
    bottomGroup: Group{ \
        cancelButton: Button { text: 'Cancel', properties:{name:'cancel'}, size: [120,24], alignment:['right', 'center'] }, \
        applyButton: Button { text: 'Run', properties:{name:'ok'}, size: [120,24], alignment:['right', 'center'] }, \
    }\
}";

win = new Window(windowResource);
win.bottomGroup.cancelButton.onClick = function() {
  return win.close();
};
win.bottomGroup.applyButton.onClick = function() {
  execute(win.cbCodes.value, win.cbList.value, win.cbVisi.value, win.cbSel.value);
  return win.close();
};
win.show();