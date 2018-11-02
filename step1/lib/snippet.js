const
  path = require('path'),
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

    return Promise.all([
      this.snippet.read(),
      this.template.read()
    ]);
  }

  render() {
    const indentedContent = this._getIndentedContent();
    const renderedContent = this.template.content.replace(/(\[snippet-code])/g, indentedContent);

    const renderedSnippetPath = this._renderedSnippetPath(this.snippet.name, this.template.name);
    const renderedSnippet = new File(renderedSnippetPath);

    return renderedSnippet.write(renderedContent);
  }

  // Method without side effect
  _renderedSnippetPath (snippet, template) {
    const snippetName = path.basename(snippet, '.js');
    const templateName = path.basename(template, '.js');

    return `${snippetName}-${templateName}.js`;
  }

  _indentedContent () {
    const matches = this.template.content.match(/^.*snippet-code.*$/gm);
    const indentation = matches[0].match(/^\s*/)[0].length;
    const firstline = this.snippet.content.split('\n')[0];

    return firstline + indentString(this.snippet.content.replace(firstline, ''), indentation);
  }
}

module.exports = Snippet;
