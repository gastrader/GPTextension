<img src="src/assets/img/icon-128.png" width="64"/>

#GPTassistant

This is a fully functional GPT assistant chrome extension that operates using the latest Manifest v3.

## Features

This application takes an OpenAI API key and allows users to easily paste code from their browser to do 1 of 4 functionalities:
Response to emails.
Summarize long texts.
Answer questions.
Professionalize wording.

![Untitled design (3)](https://github.com/gastrader/GPTextension/assets/37260212/16cbfaf8-9a26-4517-ab98-bdcd35e677c5)

This allows users to quickly utilize the GPT functionality during standard every day operations. Whether they need to quickly summarize an article or help them write a more professional message to their manager, this chrome extension can help.



## Installing and Running

### Procedures:

1. Check if your [Node.js](https://nodejs.org/) version is >= **18**.
2. Clone this repository.
3. Change the package's `name`, `description`, and `repository` fields in `package.json`.
4. Change the name of your extension on `src/manifest.json`.
5. Run `npm install` to install the dependencies.
6. Run `npm start`
7. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
8. Happy hacking.

## Structure

All your extension's code must be placed in the `src` folder.



---

Michael Xieyang Liu | [Website](https://lxieyang.github.io)
