const omitDeep = require('omit-deep');
const outdent = require('outdent');

module.exports = (dato, root, i18n) => {

  // inside the "post" directory...
  root.directory("site/content/post", (dir) => {

    // ...iterate over the "post" records...
    dato.posts.forEach(post => {

      const contentWithoutSEO = omitDeep(post.contentContainer.toMap(), ['seoMetaTags']);

      let content = [];

      post.contentContainer.toMap().forEach((val, index) => {
        switch (val.itemType) {
          case "text_block":
            content.push(`${val.content}`);
            break;
          case "single_image":
            content.push(outdent`
              {{% single_image url="${val.image.url}" caption="${val.caption ? val.caption : null}" alt="${val.image.alt === null ? '' : val.image.alt}" %}}
            `)
            break;
          case "gallery":
            // For each gallery item, create a string of values delimited by commas
            // put the strings in an array
            // Join the array by wrapping the strings in quotes
            let galleryItems = [];
            val.gallery.forEach(galleryItem => {
              galleryItems.push(`${galleryItem.height},${galleryItem.width},${galleryItem.url},${galleryItem.alt},${galleryItem.title}`);             
            })
            let items = galleryItems.join('" "');
            content.push(outdent`
              {{% gallery "${val.galleryType.galleryType}" "${items}" %}}
            `)
        }
      });

      // ...and create a markdown file for each article!
      dir.createPost(`${post.slug}.md`, "yaml", {
        frontmatter: {
          draft: post.draft,
          title: post.title,
          subtitle: post.subtitle,
          author: post.author.firstName,
          author_image: post.author.profilePicture.url(),
          author_id: post.author.id,
          type: "post",
          tags: post.tag.map(tag => tag.slug),
          category: post.category.name,
          date: post.date,
          country: {
              name: post.country.name,
              code: post.country.countryCode,
          },
          destination: post.country.continent.name,
          feature_image_data: post.featureImage.toMap(),
          intro: post.introBlock
        },
        content: content.join('\n\n')
      });
    });
  });

  root.directory("site/content", (dir) => {
    dir.createPost('about.md', "yaml", {
      frontmatter: {
        layout: "about",
        content: dato.about.content.toMap()
      },
    })
  })
}
