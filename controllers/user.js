const index = (req, res, next) => {
    return res.status(200).json({
        message: 'You requested to uer handle'
    })
}

module.exports = {
    getAllUser: index
}