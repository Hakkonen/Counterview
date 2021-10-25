import React from 'react';
import axios from 'axios';
// Takes in type of api call and value to search, returns JSON data
const Fetch = async (type, value) => {
    // const res = await fetch(`https://xchain.io/api/${type}/${value}`)
    // const json = await res.json()
    // return json

    const url = "http://public.coindaddy.io:4000/api/"
    const headers = {'content-type': 'application/json'}
    // const auth = HTTPBasicAuth('rpc', "1234")

    if(type == "asset") {
        console.log("asset POST")
        const response = await axios.post(url, {
            
                "method": "get_asset_info",
                "params": {
                    // # "filter": "asset_name", "op": "==", "value": asset
                    // # "asset": asset
                    "assets": [value]
                },
                "jsonrpc": "2.0",
                "id": 0
            },
            { auth: {
                username: "rpc",
                password: "1234"
            } }
        )
        console.log(response.data.result)
        const result = response.data.result
        return result[0]

    } else if(type == "balances") {
        console.log("balance POST")
        const response = await axios.post(url, {
            
                "method": "get_balances",
                "params": {
                    "filters": 
                        [
                            {"field": "address", "op": "==", "value": value},
                            {"field": "quantity", "op": ">", "value": "0"}
                        ],
                    "filterop": "AND"
                },
                "jsonrpc": "2.0",
                "id": 0
            },
            { auth: {
                username: "rpc",
                password: "1234"
            } }
        )
        console.log(response.data.result)
        const result = response.data.result
        return result
    } else {
        console.log("not found")
        return null
    }
}

export default Fetch