exports.get404Page = (req, res, next) => {
    res.status(404).render("404", {pageTitle: "Page Not Found", path: 'Error'})
}