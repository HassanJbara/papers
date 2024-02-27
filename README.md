# Papers (ALPHA)

This is a simple and light-weight PDF reader. For comparison, the build size is currently `<1MB`, while a fresh install of Adobe Reader on Windows is about `450MB`. This project also takes a web first approach, and is designed to be used on any device with a modern web browser for maximum portability and compatibility.

## Important

This project is currently in the alpha stage and is still not ready for real world use. This means that, first and foremost, it is not secure and **should not be used to read sensitive documents or with any sensitive data**. It is also not feature complete and may contain bugs or other issues.

## Features

The focus of this project is to provide a simple and light-weight PDF reader with the ability to highlight and annotate text, as well as syncing the annotations and personal library across devices. For now, no files are saved locally or on the server to simplify the app, and everything is fetched on demand from publicly available sources. We plan to add the ability to upload and save files locally or on the server in the future.

- Read PDFs from the web directly
- Highlight and annotate text
- Sync annotations and personal library across devices
- Categories and tags for organizing library

### Planned Features

- [ ] Upload and save files locally or on the server
- [ ] Search and filter library
- [ ] Offline app (PWA)
- [ ] Annotate with rectangles
- [ ] Optimize for different screen sizes and devices

## Tech Stack

- React
- Vite
- Tailwind CSS
- DaisyUI
- *Backend (Separate Project)*

And a lot of the heavy lifting is done by [react-pdf-highlighter](https://github.com/agentcooper/react-pdf-highlighter). We hope to reduce some of the dependencies in the future after implementing most of the essential features.
