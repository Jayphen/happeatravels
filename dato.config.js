module.exports = (dato, root, i18n) => {

  // inside the "post" directory...
  root.directory("site/content/post", (dir) => {

    // ...iterate over the "post" records...
    dato.posts.forEach(post => {

      const onlyContent = post.contentContainer.toMap().filter((container) => container.content).map(container => container.content);

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
          feature_image: post.featureImage.url(),
          intro: post.introBlock,
          content: post.contentContainer.toMap()
        },
        content: onlyContent
      });
    });
  });
}
