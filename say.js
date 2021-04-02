#!/usr/bin/env node
const fs = require('fs');
const tts = require('google-translate-tts');
const translate = require('@vitalets/google-translate-api');
const shell = require('shelljs');

const text = process.argv.slice(2).join(' ');

// function run() {
	console.log(text);
	translate(text, {to: 'fa', from: 'de'}).then(farsi => console.log(farsi.text));
	translate(text, {to: 'en', from: 'de'}).then(eng => console.log(eng.text));

    tts.synthesize({ text, voice: 'de', slow: false }).then(buffer => {
		fs.writeFileSync('/tmp/voice.mp3', buffer);
		shell.exec('mpg123 /tmp/voice.mp3 > /dev/null 2>&1');
	});
	// const farsi = await translate(text, {to: 'fa', from: 'de'})
	// console.log(farsi.text);
	// const engl = await translate(text, {to: 'en', from: 'de'})
	// console.log(engl.text);
    // const buffer = await tts.synthesize({ text, voice: 'de', slow: false });
// }

// run();
