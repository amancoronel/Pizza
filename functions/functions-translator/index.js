exports.processText = async (object) => {
    let string = JSON.stringify(object);
    string = string.split("$").join("attrib");
   return JSON.parse(string);
}

exports.translateObjData = async (object) => {
    let newObject = {};
    let oldObject = object.order;

    newObject.order = {
        number : oldObject.attrib.number,
        pizza : []
    }

    oldObject.pizza.map(async (order) => {
        newObject.order.pizza.push(
            {
                number : order.attrib.number,
                size : (order.size) ? order.size[0] : "large",
                crust: (order.crust) ? order.crust[0] : "hand-tossed",
                type : (order.type) ? order.type[0] : "pepperoni feast",
                toppings : (order.type[0] === "custom") ? await exports.processToppings(order.toppings) : []
            }            
        );
    })

    return newObject;

}

exports.processToppings = async (order) => {
    let toppingsArray = [];
    
    if(!order || order.length === 0) return [];
    order.map(async (topping) => {
        toppingsArray.push({
            area : await exports.getToppingArea(topping.attrib.area),
            item : topping.item
        });
    })

    return toppingsArray;
}

exports.getToppingArea = async (code) => {
    switch(code) {
        case "0" : return "Whole Pizza";
        case "1" : return "First Half";
        case "2" : return "Second Half";
    }
}