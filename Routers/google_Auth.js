const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).json({
        user: {
          name: req.user.displayName,
          email: req.user.email,
        },
      });
    } else {
      res.status(403).json({ message: "Not Authorized" });
    }
  });

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login/failed" }),
    (req, res) => {
      res.redirect(process.env.CLIENT_URL);
    }
  );

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router;