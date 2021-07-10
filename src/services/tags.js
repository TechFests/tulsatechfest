const { toSlug } = require('../../lib/slug');
const { getLinks, getTags } = require('../../lib/links');

module.exports = async function() {
  const data = (await getLinks()).map(item => ({
    ...item,
    slug: toSlug(item.name)
  }));

  const tags = getTags(data)
    .map(tag => ({
      name: tag,
      title: tag,
      slug: `${toSlug(tag)}`,
      items: data.filter(item => item.tags.includes(tag))
    }))
    .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));

  const homeTag = {
    name: 'All',
    title: 'Home',
    slug: 'home',
    items: data
  };

  return [homeTag, ...tags];
};