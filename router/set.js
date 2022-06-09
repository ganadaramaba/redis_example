
const express = require("express");
const router = express.Router();
const redis = require("redis").createClient();
const key = "set";

// 전부 가져오기
router.get("", async (req, res) => {
    console.log("redis.sMembers");
    const result = {
        success: false,
        data: null
    }
    
    try {
        await redis.connect();

        console.log("redis.exists(key):", redis.exists(key));
        console.log("typeof(redis.exists(key)):", typeof(redis.exists(key)));

        if (await redis.exists(key)) {
            result.data = await redis.sMembers(key);
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

// 무작위 삽입. 중복 불가
router.post("", async (req, res) => {
    console.log("redis.sAdd");
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
        
        result.data = await redis.sAdd(key, receive.value);
        console.log("result.data:", result.data);
        console.log("typeof(result.data):", typeof(result.data));

        // if (!(await redis.exists(key))) {
        // }
        // else {
        //     result.data = "key is already existed";
        //     console.log("key is already existed");
        // }

        result.success = true;
    } catch(err) {
        console.log("Err:", err);
    }

    await redis.disconnect();

    res.send(result);
});

// 특정 값 삭제
router.delete("", async (req, res) => {
    console.log("redis.sRem");
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
            result.data = await redis.sRem(key, receive.value);
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





module.exports = router;