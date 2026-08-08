export const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map((e) => e.message);
    return res
      .status(400)
      .json({ success: false, message: "Validation failed", details });
  }

  if (err.name === "CastError") {
    return res
      .status(400)
      .json({ success: false, message: `Invalid ${err.path}: ${err.value}` });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res
      .status(409)
      .json({ success: false, message: `${field} already exists` });
  }

  console.error(err);
  res.status(500).json({ success: false, message: "Something went wrong" });
};
