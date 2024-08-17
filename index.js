
const getValue = async(type) => {
    const result = await fetch(
        "https://corsproxy.io/?https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search",
        {
            body:
                JSON.stringify({
    "fiat": "LAK",
    "page": 1,
    "rows": 1,
    "tradeType": type,
    "asset": "USDT",
    "countries": [],
    "proMerchantAds": false,
    "shieldMerchantAds": false,
    "filterType": "all",
    "periods": [],
    "additionalKycVerifyFilter": 0,
    "publisherType": null,
    "payTypes": [],
    "classifies": [
        "mass",
        "profession",
        "fiat_trade"
    ]
}),
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            }
        }
    )

    const resultJSON = await result.json();
    return resultJSON.data?.[0].adv?.price;
}

const main = async () => {
    console.log("test")
    const buy = await getValue("BUY")
    const sell = await getValue("SELL")
    const mid = (parseInt(buy) + parseInt(sell)) / 2
    const rounded = Math.floor(mid / 100) * 100
    document.getElementById("rate").innerText = rounded;
}