// facebook.js
export function getFacebookCookies() {
  const cookies = document.cookie.split('; ').reduce((acc, entry) => {
    const [name, val] = entry.split('=');
    acc[name] = val;
    return acc;
  }, {});
  return {
    fbp: cookies['_fbp'] || null,
    fbc: cookies['_fbc'] || null
  };
}
