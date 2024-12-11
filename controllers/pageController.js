const getIndexPage = (req, res) => {
    res.render('index', {
        link: "index"
    });
}


export
{
    getIndexPage
};