const
  fs = require('fs')
  // _ = require('lodash'),
  // path = require('path'),
  // indentString = require('indent-string'),
  // sanitize = require('sanitize-filename');

class Snippet {
  constructor(name, path, templatePath) {
    this.name = name;
    this.path = path;
    this.templatePath = templatePath;
  }

  prepare () {
    this.snippet = new File(this.path);
    this.template = new File(this.templatePath);

    this.snippet.read();
    this.template.read();
  }

  render() {
    // const indentedSnippet = this._getIndentedSnippet();
    // const renderedContent = this.template.content.replace(/(\[snippet-code])/g, indentedSnippet);
    //
    //
    // // JAVA hack, because filename has to be the same of the class name
    // // We replace the template generique class name by the name of the test
    // if (this.language === 'java') {
    //   fs.writeFileSync(this.renderedSnippetPath, this._overrideClassName(renderedSnippet, snippetName));
    // } else {
    //   fs.writeFileSync(this.renderedSnippetPath, renderedSnippet);
    // }
    //
    // if (! fs.existsSync(this.renderedSnippetPath)) {
    //   const result = {
    //     code: 'MISSING_GENERATED_FILE',
    //     actual: `Missing generated file: ${this.renderedSnippetPath}`
    //   };
    //
    //   throw new TestResult(result);
    // }
  }

  _getIndentedSnippet() {
    // const
    //   matches = this.templateContent.match(/^.*snippet-code.*$/gm),
    //   snippetIndentation = matches[0].match(/^\s*/)[0].length,
    //   firstline = this.snippetContent.split('\n')[0];
    //
    // return firstline + indentString(this.snippetContent.replace(firstline, ''), snippetIndentation);
  }

  _sanitizeFileName(fileName) {
    // return sanitize(fileName).replace(' ', '_').toLowerCase();
  }
}

module.exports = Snippet;
