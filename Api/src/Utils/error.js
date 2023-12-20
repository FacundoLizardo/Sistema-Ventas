const handlerHttp = (res, error) => {
    res.status(500);
    res.send({ error })
}

module.exports = handlerHttp