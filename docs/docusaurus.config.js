module.exports = {
  title: "msw-when-then",
  tagline: "A succinct 'when-then' style api for MSW",
  url: "https://redhwannacef.github.io/msw-when-then/",
  baseUrl: "/msw-when-then/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "redhwannacef",
  projectName: "msw-when-then",
  themeConfig: {
    navbar: {
      title: "msw-when-then",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "docs/getting-started/install",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        {
          href: "https://github.com/redhwannacef/msw-when-then/",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Getting Started",
              to: "docs/getting-started/install",
            },
            {
              label: "Features",
              to: "docs/features/mocking",
            },
            {
              label: "Api",
              to: "docs/api/when-then",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/redhwannacef/msw-when-then",
            },
            {
              label: "Edit Docs on GitHub",
              href: "https://github.com/redhwannacef/msw-when-then/edit/master/docs",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Redhwan Nacef and contributors.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/redhwannacef/msw-when-then/edit/master/docs/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
