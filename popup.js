let includeList = [];

const cleanItem = (url) => {
  return url.replace(/^www./, '');
};

const searchBubble = () => {
  const query = document.getElementById('search-bubble').value;
  const includeListQuery = includeList.map((item) => `site:${cleanItem(item)}`).join(' OR ');
  const searchQuery = `${query} AND ${includeListQuery}`;
  window.location = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
};

// restore list from chrome.storage.
function fetchOptions() {
  chrome.storage.sync.get(['includeList'], function(items) {
    includeList = items.includeList;
  });
}

// setup listeners
document.addEventListener('DOMContentLoaded', fetchOptions);