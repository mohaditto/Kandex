function requireRole(role) {
    return (req, res, next) => {
        if (req.user && req.user.rol === role) {
            return next();
        }
        res.status(403).send('Acceso denegado');
    };
}

module.exports = { requireRole };