module.exports = {

    index: async (req, res) => {
        res.render('movies/index.html')
    },
    create: async (req, res) => {
        res.render('movies/create.html')
    },
    insert: async (req, res) => {
        res.status(200).json({
            body: req.body,
            files: req.files
        })
    },

}