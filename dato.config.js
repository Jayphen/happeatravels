module.exports = (dato, root, i18n) => {

  // inside the "post" directory...
  root.directory("site/content/post", (dir) => {

    // ...iterate over the "post" records...
    dato.posts.forEach(post => {

      // ...and create a markdown file for each article!
      dir.createPost(`${post.slug}.md`, "yaml", {
        frontmatter: {
          draft: post.draft,
          title: post.title,
          subtitle: post.subtitle,
          author: post.author.firstName,
          type: "post",
          tags: post.tag.map(tag => tag.slug),
          category: post.category.name,
          date: post.date,
          country: post.country.name,
          feature_image: post.featureImage.url()
        },
        content: post.content
      });
    });
  });
}
