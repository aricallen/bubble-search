let includeList = [];
console.log('popup.js loaded');

const cleanItem = (url) => {
  return url.replace(/^www./, '');
};

const searchBubble = () => {
  const query = document.getElementById('search-bubble').value;
  const includeListQuery = includeList.map((item) => `site:${cleanItem(item)}`).join(' OR ');
  const searchQuery = `${query} AND ${includeListQuery}`;
  console.log('search query = ', searchQuery);
  const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
  console.log('attempting to navigate to', url);
  chrome.tabs.create({
    active: true,
    url,
  });
};

// restore list from chrome.storage.
const fetchOptions = () => {
  console.log('fetching options');
  chrome.storage.sync.get(['includeList'], (items) => {
    includeList = items.includeList;
    console.log('loading includeList', items.includeList.join(','));
  });
}

const submitOnEnter = (event) => {
  if (event.keyCode === 13 || event.key === 'Enter') {
    console.log('enter pressed');
    searchBubble();
  }
};

// setup listeners
const searchInput = document.getElementById('search-bubble');
document.getElementById('go').addEventListener('click', searchBubble);
searchInput.addEventListener('keyup', submitOnEnter);
document.addEventListener('DOMContentLoaded', fetchOptions);