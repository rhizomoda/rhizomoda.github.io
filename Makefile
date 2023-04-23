all: vendor concat lein

vendor:
	rm -r assets/javascripts && \
	mkdir assets/javascripts && cd assets/javascripts && \
	wget -nv https://raw.githubusercontent.com/ajaxorg/ace-builds/master/src-noconflict/ace.js && \
	wget -nv https://raw.githubusercontent.com/ajaxorg/ace-builds/master/src-noconflict/ext-linking.js && \
	wget -nv https://raw.githubusercontent.com/ajaxorg/ace-builds/master/src-noconflict/ext-searchbox.js && \
	wget -nv https://raw.githubusercontent.com/ajaxorg/ace-builds/master/src-noconflict/theme-ambiance.js && \
	wget -nv https://raw.githubusercontent.com/midstar/jdmenubar/main/jdmenubar.js && \
	wget -nv https://raw.githubusercontent.com/midstar/jdmenubar/main/jdmenubar.css

concat:
	cd assets/javascripts && cat ace.js ext-linking.js ext-searchbox.js theme-ambiance.js jdmenubar.js |\
	tee bundle.js > /dev/null

lein:
	lein cljsbuild once
