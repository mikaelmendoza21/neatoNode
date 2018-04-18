exports.render = (req, res) => {
    // Route "/"
    res.render('index', {
        title: 'neatoNode - Personal Server'
    });
};