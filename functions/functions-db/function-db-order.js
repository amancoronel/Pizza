const Model = require('../../models');

exports.addOrders = async (data) => {
    let newData = new Model.orders(data);
    return new Promise((resolve, reject) => {
        newData.save()
        .then(data => resolve(data))
        .catch(error => reject(error));
    })
}


exports.getOrders = async (condition = {}) => {
    return new Promise((resolve, reject) => {
        Model.orders.find(condition)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
    
}