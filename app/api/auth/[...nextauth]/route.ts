import spotifyApi,{ LOGIN_URL } from "@/lib/spotify"
import NextAuth from "next-auth"
import Spotifyprovider from "next-auth/providers/spotify"

async function refreshAccessToken(token : any){
  try{
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken); 

    const { body : refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("Refreshed token is ", refreshedToken); 
    return {
      ...token,
      accessToken : refreshedToken.access_token,
      accessTokenExpires : Date.now() + (refreshedToken.expires_in * 1000), // = 1 hour as 3600 returns from spotify API
      refreshToken : refreshedToken.refresh_token ?? token.refreshToken
      // if spotify gives us a new refresh token, use it, else fall back to old refresh token
    }
  
  } catch(error){
    console.log(error); 
    return {
      ...token,
      error : "RefreshAccessTokenError",
    };
  }
}

export default NextAuth ({ 
  // Configure one or more authentication providers
  providers: [
    Spotifyprovider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret : process.env.JWT_SECRET, 
  pages : {
    signIn : '/login',
  },
  callbacks : {
    async jwt({token, account, user}){
      // initial sign in
      if(account && user){
        return {
          ...token,
          accessToken : account.access_token,
          refreshToken : account.refresh_token,
          username : account.providerAccountId,
          accessTokenExpires : (account.expires_at as number) * 1000, // we are handling expiry times in ms hence * 1000
        };
      }

      // access token is still valid
      if(Date.now() < (token.accessTokenExpires as number)){
        console.log("Access token is valid");
        return token;
      }
      // access token has expired, we need to refresh it
      console.log("Access token has expired, refreshing...");
      return await refreshAccessToken(token);
     },
    async session({session, user, token}){
      (session.user as any).accessToken = token.accessToken;
      (session.user as any).refreshToken = token.refreshToken;
      (session.user as any).username = token.username; 
      return session;
    }
    },

});
