

module.exports = (mongoose, connection) => {
    const orderSchema = new mongoose.Schema({
        "original_order"     : {type : String},
        "final_order"        : {type : Object}
    })

    const orderModel = connection.model("orders", orderSchema);
    return orderModel;
}