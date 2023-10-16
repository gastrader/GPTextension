<img src="src/assets/img/icon-128.png" width="64"/>

# GPTassistant

This is a fully functional GPT assistant chrome extension that operates using the latest Manifest v3.

## Features

This application  leverages the OpenAI API to streamline common tasks for users. The application offers four key functionalities:
1) Respond to emails.
2) Summarize long text/articles.
3) Answer general questions.
4) Transform your sentences into professional language.

![Untitled design (3)](https://github.com/gastrader/GPTextension/assets/37260212/16cbfaf8-9a26-4517-ab98-bdcd35e677c5)

This allows users to quickly utilize the GPT functionality during standard every day operations. Whether they need to quickly summarize an article or help them write a more professional message to their manager, this chrome extension seamlesslu integrates into their workflows.



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


