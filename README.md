# FLS International

## [Live Site](https://fls.netlify.app/)

## Overview

This FLS International web app is built using [Gatsby](https://www.gatsbyjs.com/), a React.js based static site framework. The app is primarily based around React components in a Node.js environment. The app has more in common with a static site than a web app. As such, the app does not maintain a "standard" back end, in the sense that there is no "traditional" database, relational or otherwise. Rather, [Netlify CMS](https://www.netlifycms.org/) provides a UI for the admins of FLS International to add, delete, or otherwise modify the site's dynamic content. Content entered into the CMS is piped into the repo in the form of Markdown files (by default, stored in [/src/netlify-content](./src/netlify-content)). Gatsby, by way of [gatsby-plugin-netlify-cms](https://www.npmjs.com/package/gatsby-plugin-netlify-cms) and [gatsby-transformer-remark](https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/), is able to parse these Markdown files into [POJOs](https://masteringjs.io/tutorials/fundamentals/pojo) that can then be rendered on the site. Hosting, deployment, build management, and other site administration is handled through the [Netlify dashboard](https://app.netlify.com/teams/flsinternational/overview).

(For the record, Netlify and Netlify CMS are two different services, owned by the same organization. I agree, it is confusing. Netlify is the dashboard, Netlify CMS is... well, the CMS, and is expressly responsibly for handling the site's dynamic content)


## Running Locally
* **Note:** The app will not function correctly unless there is a `.env.development` file in the root of the repo with the appropriate keys and values. `.env.sample` contains the necessary key names. See the [Google Doc](https://docs.google.com/document/d/10vJser2UQQnUcDWYj61Jk-a38K6K8GoTkNgWqzzBMFQ/edit) for the values.

* You will need Node installed, as well as the [Gatsby CLI].

```bash
npm install -g gatsby-cli
```

* As always, also ensure that you install dependencies.

```bash
# This needs to be run from the repo's root directory
npm install
```

* With the Gatsby CLI installed, starting the app for local development is as simple as running the following command:

```bash
gatsby develop
```

* This will start the development server, which, by default, will hot reload the app every time a change is made in the local repo. You can see the app at [http://localhost:8000](http://localhost:8000).

* In order to run the CMS locally, all you need to do is run the following command (provided you've installed all NPM dependencies):

```
npm run netlify
```

* This will make the CMS available at [http://localhost:8000/admin](http://localhost:8000/admin).

## Deploying to Netlify
* The app uses Netlify to handle deploys, builds, continuous integration, and anything else that has to do with maintaining the site. Deploying to Netlify is done through Netlify's continuous integration with the [GitHub repo](https://github.com/flsinternationaldev/fls-international). The short of it is, every time you push to the `master` branch, a deploy is triggered. Check out [these docs](https://docs.netlify.com/configure-builds/get-started/#basic-build-settings) if you want to control when and how builds are triggered.

* You will need an `.env.production` file for this to work properly. As the name suggests, Gatsby and Netlify work together intelligently to use the correct `.env` file when working locally vs deploying to production.

## Repo Structure
A quick look at the top-level files and directories you'll see in this Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

9. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

10. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.
