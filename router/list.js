
const express = require("express");
const router = express.Router();
const redis = require("redis").createClient();
const key = "list";

// 전부 가져오기
router.get("", async (req, res) => {
    console.log("redis.lRange");
    const result = {
        success: false,
        data: null
    }
    
    try {
        await redis.connect();

        console.log("redis.exists(key):", redis.exists(key));
        console.log("typeof(redis.exists(key)):", typeof(redis.exists(key)));

        if (await redis.exists(key)) {
            result.data = await redis.lRange(key, 0, -1);
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

// 특정 인덱스 가져오기
router.get("/index", async (req, res) => {
    console.log("redis.lIndex");
    const receive = {
        index: req.body.index
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
            result.data = await redis.lIndex(key, receive.index);
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

// 맨 앞에 삽입. 중복 가능
router.post("", async (req, res) => {
    console.log("redis.lPush");
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

        result.data = await redis.lPush(key, receive.value);
        console.log("result.data:", result.data);
        console.log("typeof(result.data):", typeof(result.data));

        // if (!(await redis.exists(key))) {
        //     result.data = await redis.lPush(key, receive.value);
        //     console.log("result.data:", result.data);
        //     console.log("typeof(result.data):", typeof(result.data));
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

// 특정 인덱스 수정
router.put("/index", async (req, res) => {
    console.log("redis.lSet");
    const receive = {
        index: req.body.index,
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
            result.data = await redis.lSet(key, receive.index, receive.value);
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

// 특정 값 제거
router.delete("", async (req, res) => {
    console.log("redis.lRem");
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
            result.data = await redis.lRem(key, receive.value);
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

// List 테스트
// console.log("lRange:", await redis.lRange("key", 0, -1));

// console.log("key exists:", await redis.exists("key"));
// console.log("lPush:", await redis.lPush("key", "data1"));
// console.log("lRange:", await redis.lRange("key", 0, -1));

// console.log("key exists:", await redis.exists("key"));
// console.log("lPush:", await redis.lPush("key", "data2"));
// console.log("lRange:", await redis.lRange("key", 0, -1));

// console.log("key exists:", await redis.exists("key"));
// console.log("lPush:", await redis.lPush("key", "data3"));
// console.log("lRange:", await redis.lRange("key", 0, -1));

// console.log("key exists:", await redis.exists("key"));
// console.log("lPush:", await redis.lPush("key", "data4"));
// console.log("lRange:", await redis.lRange("key", 0, -1));

// console.log("key exists:", await redis.exists("key"));
// console.log("lPush:", await redis.lPush("key", "data5"));
// console.log("lRange:", await redis.lRange("key", 0, -1));

// console.log("key exists:", await redis.exists("key"));
// console.log("lPush:", await redis.lPush("key", ["data6", "data7", "data8", "data9"]));
// console.log("lRange:", await redis.lRange("key", 0, -1));

// console.log("key[0]:", await redis.lIndex("key", 0));