// Use this inside controllers after you fetch a doc
function ensureOwner(doc, req, res) {
  if (!doc) return res.status(404).json({ message: 'Not found' });
  if (String(doc.userId) !== String(req.user.id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  return null; // ok
}
module.exports = ensureOwner;
