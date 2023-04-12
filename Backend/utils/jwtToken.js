// Creating token and saving in cookie

exports.sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_DAY * 24 * 60 * 60 * 1000
    )
  }
  res.status(statusCode).cookie(
    'token',
    token,
    options
  ).json({
    success: true,
    user,
    token
  });
}