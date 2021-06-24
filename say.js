#!/usr/bin/env node
const fs = require('fs');
const tts = require('google-translate-tts');
const translate = require('@vitalets/google-translate-api');
const shell = require('shelljs');
const child_process = require('child_process');



// let previousWord = '';
function online(text) {
	return translate(text, {to: 'en', from: 'de'}).then(eng => {
        if(eng.from.text.value) {
            console.log("\x1b[36m%s\x1b[0m", eng.from.text.value);
            return online(eng.from.text.value.replace('[', '').replace(']', ''));
        }
        child_process.fork(__filename, [text]);
        // setTimeout(() => {

        //     const slow = text == previousWord;
        //     previousWord = text;
        //     tts.synthesize({ text, voice: 'de', slow: slow }).then(buffer => {
        //         fs.writeFileSync('/tmp/voice.mp3', buffer);
        //         shell.exec('mpg123 /tmp/voice.mp3 > /dev/null 2>&1');
        //         shell.exec('afplay /tmp/voice.mp3 > /dev/null 2>&1');
        //     });
        // }, 0);
        return eng.text;
    });
}

if(process.argv[2]) {
    tts.synthesize({ text: process.argv[2], voice: 'de', slow: false }).then(buffer => {
        fs.writeFileSync('/tmp/voice.mp3', buffer);
        shell.exec('mpg123 /tmp/voice.mp3 > /dev/null 2>&1');
        shell.exec('afplay /tmp/voice.mp3 > /dev/null 2>&1');
    });
}
else {
    var repl = require("repl");
    function myEval(cmd, context, filename, callback) {
        cmd = cmd.trim();
        if(!cmd) {
            callback(null, '');
        } else {
            online(cmd).then(t => callback(null, t));
        }
    }
    repl.start({ prompt: '> ', eval: myEval });
}
