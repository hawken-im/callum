const fs = require('fs');
const path = require('path');
const SDK = require('rum-sdk-nodejs');

(async () => {
  fs.rmSync(path.join(__dirname, 'db.json'), { recursive: true, force: true });
  SDK.cache.Group.clear();
  console.log('Removed local data ✅ ');
})();
