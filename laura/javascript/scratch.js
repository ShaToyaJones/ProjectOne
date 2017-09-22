// STEPS TO CONSIDER ====================
// 


// SPOTIFY API ====================
//

// Spotify playlist endpoint
// GET https://api.spotify.com/v1/browse/featured-playlists
// limit is optional


// CLIENT CREDENTIALS CALL ====================

// POST -H "Authorization: Basic <base64 encoded e48c998d772a4106a1f14b7540552622:a9338a82078a4669af6c007d4edde014>" -d grant_type=client_credentials https://accounts.spotify.com/api/token




// AUTHORIZATION METHOD CALL -- HOPEFULLY THIS WAY ISN'T THE WAY WE'LL DO IT....
// 1st Authorization call
// GET https://accounts.spotify.com/authorize?client_id=e48c998d772a4106a1f14b7540552622&response_type=code&redirect_uri= **********need this

// Client ID e48c998d772a4106a1f14b7540552622
// Secret Client Key a9338a82078a4669af6c007d4edde014

// 4th Request refresh & access tokens
// POST https://accounts.spotify.com/api/token?grant_type=authorization_code&code= **********need this &redirect_uri= **********need this
// Authorization: Basic <base64 encoded client_id:client_secret>  ~like this?
// Authorization: Basic <base64 encoded e48c998d772a4106a1f14b7540552622:a9338a82078a4669af6c007d4edde014>  ~or this??
