const fs = require("fs");
const fetch = require("node-fetch");
require("dotenv").config();

// Lol

fetch("https://api.raindrop.io/rest/v1/raindrops/0?perpage=30", {
  headers: {
    Authorization: `Bearer ${process.env.RAINDROP_API_KEY}`,
  },
})
  .then((r) => r.json())
  .then((res) => {
    fs.writeFileSync(
      "./content/pages/bookmarks/index.mdx",
      `---
title: Bookmarks
slug: "/bookmarks"
---

${res.items
  .map(({ link, title }) => {
    return `- [${title}](${link})\n`;
  })
  .join("")}
    `
    );
  });
