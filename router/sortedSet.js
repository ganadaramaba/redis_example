
const express = require("express");
const router = express.Router();
const redis = require("redis").createClient();
const key = "sortedSet";

// 전부 가져오기
router.get("", async (req, res) => {
    console.log("redis.zRange");
    const result = {
        success: false,
        data: null
    }
    
    try {
        await redis.connect();

        console.log("redis.exists(key):", redis.exists(key));
        console.log("typeof(redis.exists(key)):", typeof(redis.exists(key)));

        if (await redis.exists(key)) {
            result.data = await redis.zRange(key, 0, -1);
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

// 하나 추가. score순 정렬
router.post("", async (req, res) => {
    console.log("redis.zAdd");
    const receive = {
        score: req.body.score,
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

        result.data = await redis.zAdd(key, {"value": receive.value, "score": receive.score});
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

// 특정 값 삭제
router.delete("", async (req, res) => {
    console.log("redis.zRem");
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
            result.data = await redis.zRem(key, receive.value);
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

// Sorted Set 테스트
// console.log("zRange:", await redis.zRange("key", 0, -1));

// console.log("key exists:", await redis.exists("key"));
// console.log("zAdd:", await redis.zAdd("key", {"value": "data1", "score": 1}));
// console.log("zRange:", await redis.zRange("key", 0, -1, 'withscores'));

// console.log("key exists:", await redis.exists("key"));
// console.log("zAdd:", await redis.zAdd("key", {"value": "data2", "score": 3}));
// console.log("zRange:", await redis.zRange("key", 0, -1));

// console.log("key exists:", await redis.exists("key"));
// console.log("zAdd:", await redis.zAdd("key", {"value": "data3", "score": 2}));
// console.log("zRange:", await redis.zRange("key", 0, -1));

// console.log("key exists:", await redis.exists("key"));
// console.log("zAdd:", await redis.zAdd("key", {"value": "data4", "score": 4}));
// console.log("zRange:", await redis.zRange("key", 0, -1));

// console.log("key exists:", await redis.exists("key"));
// console.log("zAdd:", await redis.zAdd("key", {"value": "data5", "score": 5}));
// console.log("zRange:", await redis.zRange("key", 0, -1));

// console.log("key exists:", await redis.exists("key"));
// console.log("zAdd:", await redis.zAdd("key", [{"value": "data6", "score": 6},
//                                             {"value": "data7", "score": 7},
//                                             {"value": "data8", "score": 8},
//                                             {"value": "data9", "score": 9}]));
// console.log("zRange:", await redis.zRange("key", 0, -1));