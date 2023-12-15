const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { User } = require("./Model/User");


passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		async(accessToken,refreshToken,profile,done)=>{
            try {
                let user = await User.findOne({googleId:profile.id});
    
                if(!user){
                    user = new User({
                        googleId:profile.id,
                        name:profile.displayName,
                        email:profile.emails[0].value,
                    });
    
                    await user.save();
                }
    
                return done(null,user)
            } catch (error) {
                return done(error,null)
            }
        }
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});