




export const generateToken = (user, message, statusCode, res) => {
  try {
    const token = user.generateJsonWebToken();

    // Determine the cookie name based on the user's role
    const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

    // Use fallback if COOKIE_EXPIRE is not set
    const cookieExpireDays = process.env.COOKIE_EXPIRE || 7;

    res
      .status(statusCode)
      .cookie(cookieName, token, {
        expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
        httpOnly: true,
        
      })
      .json({
        success: true,
        message,
        user,
        token,
      });

    // Optional: log in dev
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Token Generated] Role: ${user.role}, Token: ${token}`);
    }

  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error while generating token",
    });
  }
}; 
