# Papers (ALPHA)

This is a simple and light-weight PDF reader. For comparison, the build size is currently `<1MB`, while a fresh install of Adobe Reader on Windows is about `450MB`. This project also takes a web first approach, and is designed to be used on any device with a modern web browser for maximum portability and compatibility.

## Features

The focus of this project is to provide a simple and light-weight PDF reader with the ability to highlight and annotate text, as well as syncing the annotations and personal library across devices. For now, no files are saved locally or on the server to simplify the app, and everything is fetched on demand from publicly available sources. We plan to add the ability to upload and save files locally or on the server in the future.

## Tech Stack

- React
- Vite
- Tailwind CSS
- DaisyUI
- *Backend (Separate Project)*

And a lot of the heavy lifting is done by [react-pdf-highlighter](https://github.com/agentcooper/react-pdf-highlighter). We hope to reduce some of the dependencies in the future after implementing most of the essential features.
