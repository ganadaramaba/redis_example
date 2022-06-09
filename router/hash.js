
const express = require("express");
const router = express.Router();
const redis = require("redis").createClient();
const key = "hash";

// 전부 가져오기
router.get("", async (req, res) => {
    console.log("redis.hGetAll");
    const result = {
        success: false,
        data: null
    }
    
    try {
        await redis.connect();

        console.log("redis.exists(key):", redis.exists(key));
        console.log("typeof(redis.exists(key)):", typeof(redis.exists(key)));

        if (await redis.exists(key)) {
            result.data = await redis.hGetAll(key, 0, -1);
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

// 특정 필드의 값 가져오기
router.get("", async (req, res) => {
    console.log("redis.hGet");
    const result = {
        success: false,
        data: null
    }
    
    try {
        await redis.connect();

        console.log("redis.exists(key):", redis.exists(key));
        console.log("typeof(redis.exists(key)):", typeof(redis.exists(key)));

        if (await redis.exists(key)) {
            result.data = await redis.hGet(key, "field1");
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

// 필드 추가
router.post("", async (req, res) => {
    console.log("redis.zAdd");
    const receive = {
        field1: req.body.data1,
        field2: req.body.data2
    }
    const result = {
        success: false,
        data: null
    }
    
    try {
        await redis.connect();

        console.log("redis.exists(key):", redis.exists(key));
        console.log("typeof(redis.exists(key)):", typeof(redis.exists(key)));

        result.data = await redis.hSet("key", {"field1": receive.field1, "field2": receive.field2});
        console.log("result.data:", result.data);
        console.log("typeof(result.data):", typeof(result.data));

        // if (await redis.exists(key)) {
        //     result.data = await redis.zAdd(key, {"value": receive.value, "score": receive.score});
        //     console.log("result.data:", result.data);
        //     console.log("typeof(result.data):", typeof(result.data));
        // }
        // else {
        //     result.data = "key is not existed";
        //     console.log("key is not existed");
        // }

        result.success = true;
    } catch(err) {
        console.log("Err:", err);
    }

    await redis.disconnect();

    res.send(result);
});

// 특정 필드의 값 수정. 입력과 같다.
router.put("", async (req, res) => {
    console.log("redis.hSet");
    const receive = {
        field1: req.body.data1
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
            result.data = await redis.hSet(key, {"field1": receive.field1});
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

// 특정 필드 삭제
router.delete("", async (req, res) => {
    console.log("redis.hDel");
    const receive = {
        fieldName: req.body.fieldName
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
            result.data = await redis.hDel(key, receive.fieldName);
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

// Hash 테스트
// console.log("hGetAll:", await redis.hGetAll("key", 0, -1));

// console.log("key exists:", await redis.exists("key"));
// console.log("hSet:", await redis.hSet("key", {"field1": "data1", "field2": "data2" }));
// console.log("hGetAll:", await redis.hGetAll("key"));

// console.log("key exists:", await redis.exists("key"));
// console.log("hSet:", await redis.hSet("key", {"field3": "data3", "field4": "data4" }));
// console.log("hGetAll:", await redis.hGetAll("key"));

// console.log("key exists:", await redis.exists("key"));
// console.log("hSet:", await redis.hSet("key", {"field5": "data5", "field6": "data6" }));
// console.log("hGetAll:", await redis.hGetAll("key"));

// console.log("key exists:", await redis.exists("key"));
// console.log("hSet:", await redis.hSet("key", {"field1": "data7", "field8": "data8" }));
// console.log("hGetAll:", await redis.hGetAll("key"));

// console.log("key exists:", await redis.exists("key"));
// console.log("hSet:", await redis.hSet("key", {"field9": "data9", "field0": "data0" }));
// console.log("hGetAll:", await redis.hGetAll("key"));