const omitDeep = require('omit-deep');

module.exports = (dato, root, i18n) => {

  // inside the "post" directory...
  root.directory("site/content/post", (dir) => {

    // ...iterate over the "post" records...
    dato.posts.forEach(post => {

      const onlyContent = [post.introBlock, post.contentContainer.toMap().map(container => container.content)].join('\n\n');

      const contentWithoutSEO = omitDeep(post.contentContainer.toMap(), ['seoMetaTags']);

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
              continent: post.country.continent.name
          },
          destination: post.country.continent.name,
          feature_image: post.featureImage.url(),
          feature_image_data: post.featureImage.toMap(),
          intro: post.introBlock,
          content: contentWithoutSEO
        },
        content: onlyContent
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
