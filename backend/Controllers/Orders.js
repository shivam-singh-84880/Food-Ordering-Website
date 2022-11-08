const Orders = require('../Models/Orders');

exports.saveOrderDetails = (req, res) => {
    const { placedBy, placedByUserId, placedOn, items, restaurantId, amount } = req.body;

    const ordersObj = new Orders({
        placedBy,
        placedByUserId,
        placedOn,
        items,
        restaurantId,
        amount
    });

    ordersObj.save()
        .then(response => {
            res.status(200).json(
                {
                    message: "orders Added Succesfully",
                    orders: response
                }
            )
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getOrdersByUserId = (req, res) => {
    const { userId } = req.params;

    Orders.find({ placedByUserId: userId })
        .then(response => {
            res.status(200).json(
                {
                    message: "Orders Fetched Succesfully",
                    orders: response
                }
            )
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}