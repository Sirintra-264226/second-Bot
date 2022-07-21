const line = require('@line/bot-sdk')
const express = require('express')
const axios = require('axios').default
const dotenv =require('dotenv')

const env = dotenv.config().parsed
const app = express()

const lineConfig = {
    channelAccessToken: env.ACCESS_TOKEN,
    channelSecret: env.SECRET_TOKEN
}

//create client
const client = new line.Client(lineConfig);

// การ Routing ไปที่ Webhook , ตัวเชื่อมของไลน์ , Request กับ Respond ที่ /webhook จะรับ-ส่ง
// console.log เพื่อเห็น Request เมื่อส่งข้อความแล้วมี Event เกิดขึ้นจะเคลื่อนที่ไปตาม Webhook 
// และมาที่ Server ของเรามันถึงจะรับเมื่อมี Event เกิดขึ้น โดยการเริ่มต้นจากการส่งข้อความ
// return การเช็ค ถ้ามี Event ส่งข้อความมา ให้เรียกฟังก์ชั่น events.map เข้าไป ถ้าไม่มีอะไรใ้ขึ้น Ok เฉยๆ

app.post('/webhook', line.middleware(lineConfig), async (req, res) => {
    try {
        const events = req.body.events
        console.log('event=>>>>',events)
        return events.length > 0 ? await events.map(item => handleEvent(item)) : res.status(200).send("OK")

    } catch (error) {
    res.status(500).end()   
    }
});

const handleEvent = async (event) => {
    // 
    if(event.type !== 'message' || event.message.type !== 'text'){
        return null;
    }
    else if (event.type === 'message'){
        
        return client.replyMessage(event.replyToken,{ type:'text',text:'Test' }); //reply message   
    }
    // return client.replyMessage(event.replyToken,{ type:'text',text:'Test' }); //reply message
    
    }


//การเปิด port เพื่อให้สามารถใช้งานได้
app. listen(4000, () => {
    console.log('listening on 4000');
});