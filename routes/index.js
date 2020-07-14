const express = require('express');
const router = express.Router();
const functionDB = require('../functions/functions-db');
const functionTranslate = require('../functions/functions-translator');
const parseString = require('xml2js').parseString;

router.get("/getOrders", async (req, res) => {

    let orders = await functionDB.order.getOrders();
    if(orders) res.status(200).json(orders);
    else res.status(400).json({});
})

router.post("/addOrders", async (req,res) => {
    let regex = /\r?\n|\r/g;

    let xml = req.body.content;
    xml.replace(regex, '');

    if(req.body.content == "" ) {
        res.status(400).json({});
        return false;
    }
    
    parseString(xml, async (err, result) => {
        if(!err) {
            let processedResult = await functionTranslate.processText(result);
            let orderData = {
                original_order : xml,
                final_order : await functionTranslate.translateObjData(processedResult)
            }

            let orders = await functionDB.order.addOrders(orderData);
            if(orders) res.status(200).json(orders); 
            else res.status(400).json({});

        } else {
            res.status(400).json({})
        }
        
    });
})

module.exports = router;