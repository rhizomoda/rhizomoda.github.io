all:
	cat vendor/ace.min.js vendor/ext-linking.min.js \
	vendor/ext-searchbox.min.js vendor/mode-c_cpp.min.js \
	vendor/theme-ambiance.min.js vendor/jdmenubar.min.js \
	src/mode-rhizomoda.js src/editor.js \
	src/main.js > static/bundle.js
