// Saves options to chrome.storage
function saveOptions() {
  var urls = document.getElementById('include-list').value.split('\n');
  chrome.storage.sync.set({
    includeList: urls,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Bubble updated successfully.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// restore list from chrome.storage.
function fetchOptions() {
  chrome.storage.sync.get(['includeList'], function(items) {
    document.getElementById('include-list').value = items.includeList.join('\n');
  });
}

// setup listeners
document.addEventListener('DOMContentLoaded', fetchOptions);
document.getElementById('save').addEventListener('click', saveOptions);