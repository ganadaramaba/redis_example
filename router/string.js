
const express = require("express");
const router = express.Router();
const redis = require("redis").createClient();
const key = "string";

router.get("", async (req, res) => {
    console.log("redis.get");
    const result = {
        success: false,
        data: null
    }
    
    try {
        await redis.connect();

        console.log("redis.exists(key):", redis.exists(key));
        console.log("typeof(redis.exists(key)):", typeof(redis.exists(key)));

        if (await redis.exists(key)) {
            result.data = await redis.get(key);
            console.log("result.data:", result.data);
            console.log("typeof(result.data):", typeof(result.data));
        }
        else {
            result.data = "key is not existed";
            console.log("key is not existed");
        }

        result.success = true;
    } catch(err) {
        console.log("Err:", err);
    }
    await redis.disconnect();

    res.send(result);
});

router.post("", async (req, res) => {
    console.log("redis.set");
    const receive = {
        value: req.body.value
    }
    const result = {
        success: false,
        data: null
    }
    
    try {
        await redis.connect();

        console.log("redis.exists(key):", redis.exists(key));
        console.log("typeof(redis.exists(key)):", typeof(redis.exists(key)));

        if (!(await redis.exists(key))) {
            result.data = await redis.set(key, receive.value);
            console.log("result.data:", result.data);
            console.log("typeof(result.data):", typeof(result.data));
        }
        else {
            result.data = "key is already existed";
            console.log("key is already existed");
        }

        result.success = true;
    } catch(err) {
        console.log("Err:", err);
    }
    await redis.disconnect();

    res.send(result);
});

router.put("", async (req, res) => {
    console.log("redis.set");
    const receive = {
        value: req.body.value
    }
    const result = {
        success: false,
        data: null
    }
    
    try {
        await redis.connect();

        console.log("redis.exists(key):", redis.exists(key));
        console.log("typeof(redis.exists(key)):", typeof(redis.exists(key)));

        if (await redis.exists(key)) {
            result.data = await redis.set(key, receive.value);
            console.log("result.data:", result.data);
            console.log("typeof(result.data):", typeof(result.data));
        }
        else {
            result.data = "key is not existed";
            console.log("key is not existed");
        }

        result.success = true;
    } catch(err) {
        console.log("Err:", err);
    }
    await redis.disconnect();

    res.send(result);
});

router.delete("", async (req, res) => {
    console.log("redis.del");
    const result = {
        success: false,
        data: null
    }
    
    try {
        await redis.connect();

        console.log("redis.exists(key):", redis.exists(key));
        console.log("typeof(redis.exists(key)):", typeof(redis.exists(key)));

        if (await redis.exists(key)) {
            result.data = await redis.del(key);
            console.log("result.data:", result.data);
            console.log("typeof(result.data):", typeof(result.data));
        }
        else {
            result.data = "key is not existed";
            console.log("key is not existed");
        }

        result.success = true;
    } catch(err) {
        console.log("Err:", err);
    }
    await redis.disconnect();

    res.send(result);
});

module.exports = router;

// String 테스트
// const resultofset = await redis.set("key", "data");
// console.log("setReturn:", resultofset);
// console.log("setReturnType:", typeof(resultofset));
// const resultofset2 = await redis.set("key", "data");
// console.log("setReturn2:", resultofset2);
// console.log("setReturnType:", typeof(resultofset2));
// console.log(
//     await redis.exists("key")
// )
// console.log("key:", await redis.get("key"))
// console.log(
//     await redis.exists("key")
// )
// console.log("key:", await redis.del("key"))
// console.log(
//     await redis.exists("key")
// )
// console.log("key:", await redis.get("key"))
// console.log(
//     await redis.exists("key")
// )