module.exports = {
  checkAdmin: (req, res, next) => {
    console.log(req.tokenPayload);
    if (req.tokenPayload) {
      if (req.tokenPayload.isAdmin) {
        next();
      } else {
        res.status(401).json('This operation is only open to admins');
      }
    } else {
      res.status(401).json('This operation is reseved for logged in admin accounts');
    }
  },
};
