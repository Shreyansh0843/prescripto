import jwt from 'jsonwebtoken'

// User authentication middleware
const authUser = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.json({ success: false, message: "Not authorised. Login again." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;   // ⬅ FIXED (no more req.body)
    next();

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export default authUser;
