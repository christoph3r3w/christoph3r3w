/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
  const { url, request, cookies } = event;

  // check for Referer header to know where the user is navigating from
//   const referer = request.headers.get('Referer');
//   if (referer) {
//     const urlReferer = new URL(referer);
//     if (urlReferer.origin === url.origin) {
//       locals.internalReferer = urlReferer;
//     }
//   }

 const referer = request.headers.get('Referer');
  if (referer) {
    const urlReferer = new URL(referer);
    if (urlReferer.origin === url.origin) {
      cookies.set('hasNavigated', 'true', { path: '/' });
    }
  }

  const skipSplash = cookies.get('hasNavigated') === 'true';
  return await resolve(event, {
   	//  transformPageChunk: ({ html }) => html.replace('%splash-skip%', String(!!locals.internalReferer)),
	  transformPageChunk: ({ html }) => html.replace('%splash-skip%', String(skipSplash)),
  });
};
