#!/usr/bin/env node
const fs = require('fs');
const tts = require('google-translate-tts');
const translate = require('@vitalets/google-translate-api');
const shell = require('shelljs');
var readline = require('readline');
var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
});

function online(text) {
	translate(text, {to: 'en', from: 'de'}).then(eng => {
        if(eng.from.text.value) {
            console.log("\x1b[36m%s\x1b[0m", eng.from.text.value);
            return online(eng.from.text.value.replace('[', '').replace(']', ''));
        }
        console.log("\x1b[36m%s\x1b[0m", eng.text);

        translate(text, {to: 'fa', from: 'de'}).then(farsi => console.log("\x1b[36m%s\x1b[0m", farsi.text));
        tts.synthesize({ text, voice: 'de', slow: false }).then(buffer => {
            fs.writeFileSync('/tmp/voice.mp3', buffer);
            shell.exec('mpg123 /tmp/voice.mp3 > /dev/null 2>&1');
            shell.exec('afplay /tmp/voice.mp3 > /dev/null 2>&1');
        });
    });
}

rl.on('line', online);
