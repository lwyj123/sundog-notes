import languages from './assets/data/languages';

const converter = {
  languageToExtension(language) {
    if (languages.filter(l => l.name === language).length > 0) {
      return languages.filter(l => l.name === language)[0].extension;
    }
    return 'txt';
  },
  extensionToLanguage(extension) {
    if (languages.filter(l => l.extension === extension).length > 0) {
      return languages.filter(l => l.extension === extension)[0].name;
    }
    return 'text';
  },
  gistToNote(gist) {
    const files = [];

    Object.keys(gist.files).forEach(key => {
      files.push({
        name: key.split('.')[0],
        language: this.extensionToLanguage(key.split('.')[1]),
        content: gist.files[key].content,
      });
    });

    return {
      id: gist.id,
      url: gist.html_url,
      public: gist.public,
      name: 'Gist',
      description: gist.description,
      files,
    };
  },
  noteToGist(note) {
    const files = {};

    note.files.forEach(file => {
      files[`${file.name}.${this.languageToExtension(file.language)}`] = {
        content: file.content,
      };
    });

    return {
      id: note.id,
      public: note.public,
      description: note.description,
      files,
    };
  },
};

export default converter;
