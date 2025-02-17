app.get('/api/news', async (req, res) => {
  let articles = [];
  
  for (let feedUrl of rssFeeds) {
      try {
          const feed = await parser.parseURL(feedUrl);
          feed.items.forEach(item => {
              // Skip articles with non-English titles or summaries
              if (!item.title || !item.title.match(/[a-zA-Z]/)) return; // Ensure title contains English letters
              if (item.contentSnippet && !item.contentSnippet.match(/[a-zA-Z]/)) return; // Ensure summary contains English letters

              // Extract image URL from content or enclosure
              let imageUrl = '';
              if (item.enclosure && item.enclosure.url) {
                  imageUrl = item.enclosure.url; // Use enclosure for images
              } else if (item.content) {
                  const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
                  if (imgMatch) {
                      imageUrl = imgMatch[1]; // Extract image URL from content
                  }
              }

              articles.push({
                  title: item.title,
                  link: item.link,
                  published: item.pubDate,
                  summary: item.contentSnippet,
                  imageUrl: imageUrl // Add image URL to the article
              });
          });
      } catch (error) {
          console.error(`Failed to fetch feed: ${feedUrl}`, error);
      }
  }
  
  res.json(articles);
});