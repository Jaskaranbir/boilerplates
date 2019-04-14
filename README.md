## Webpack 4 + TypeScript starter
---

The goal is to enforce strict coding style (demanding more type-safety and immutability). For now, this setup is intended for TypeScript-based **backend-projects**, but feel free to adapt and use how you like it.

*This is still a WIP, contributions/suggestions are welcome* :smile:.

### Features:

* Webpack 4
* TypeScript 3.4.x
* A very-strict set of rules for TSLint (especially focused on better type-safety, immutability, functional and declarative code)
* Hot Module Reloading (might need to be improved)
* Includes Jest for testing
* Bundles all dependencies on production-biulds (so you don't have to install them while deploying). This might change in future (feel free to put your poinion about this).

### How to use:

```Bash
$ git clone https://github.com/Jaskaranbir/ts-webpack-starter <your-project-name>

$ cd  <your-project-name>

# You might wanna reinitialize this as your own GitHub project
$ rm -rf .git

# Install dependencies
$ npm i

# ========> Available Commands <========

# Start the development server
$ npm run dev

# Build your app with minification (for production)
npm run build

# Run TSLint on your application
npm run lint

# Run Jest tests with linter:
npm run test

# Run Jest tests but don't run linter
npm run test:no-lint

# Run Jest tests in watch mode
npm run test:watch
```

### Contributions:

This starter is all about enforcing best-practices and consistent/strict coding-style.
Any contributions/ideas will be much appreciated.
