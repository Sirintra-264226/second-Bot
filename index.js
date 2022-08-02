const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: "rBblqP95y8+sOL19tp9pOh86nRYVjYTrW2iO6uB8DgGc5NuRkL3EHF3VWXnCn1zztEvDClydXsLp/g9hKy36t+cDJm3IJQc9rZ7WSotCoDXhvM8QPFnTu08amlK6t5jDRGu8VptC5L8VHKyLo72QLwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "2837cd75503debeb14f28f233fb008c6",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// การ Routing ไปที่ Webhook , ตัวเชื่อมของไลน์ , Request กับ Respond ที่ /webhook จะรับ-ส่ง
// console.log เพื่อเห็น Request เมื่อส่งข้อความแล้วมี Event เกิดขึ้นจะเคลื่อนที่ไปตาม Webhook 
// และมาที่ Server ของเรามันถึงจะรับเมื่อมี Event เกิดขึ้น โดยการเริ่มต้นจากการส่งข้อความ
// return การเช็ค ถ้ามี Event ส่งข้อความมา ให้เรียกฟังก์ชั่น events.map เข้าไป ถ้าไม่มีอะไรใ้ขึ้น Ok เฉยๆ
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => {
      console.log(result);
      return res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  } 
    else if (event.message.type === "text" || event.message.includes("เช็คยอด") ) {
    const payload = {
      type: "text",
      text: "เลือกประเภทได้เลยครับ ลงทะเบียน ลงชื่อ สั่งอาหาร สั่งน้ำ สั่งขนมอิอิ "
    };
    return client.replyMessage(event.replyToken, payload);
  }
    else if(event.message.type === "text" || event.message.includes("ลงทะเบียน") ) {
    const payload = {
      type: "text",
      text: "หัวข้อลงทะเบียนอะไรดีครับ"
    };
    return client.replyMessage(event.replyToken, payload);
  }
   if(event.message.type === "text" || event.message.text === "ประชุม") {
    const payload = {
      type: "text",
      text: "ขอรายละเอียดด้วยครับ"
    };
    return client.replyMessage(event.replyToken, payload);
  }
  if(event.message.type === "text" || event.message.text === "ประชุมการทำงาน") {
    const payload = {
      type: "text",
      text: "หมายเลข #"
    };
    return client.replyMessage(event.replyToken, payload);
  }
   if(event.message.type === "text" || event.message.text === "ลงชื่อ") {
    const payload = {
      type: "text",
      text: "หัวข้อลงชื่ออะไรดีครับ"
    };
    return client.replyMessage(event.replyToken, payload);
  }
   if(event.message.type === "text" || event.message.text === "ลงชื่อไปเที่ยวต่างจังหวัด ลงชื่อไปกิจกรรม ลงชื่อลาพักร้อน ") {
    const payload = {
      type: "text",
      text: "หมายเลข #"
    };
    return client.replyMessage(event.replyToken, payload);
  }
   if(event.message.type === "text" || event.message.text === "สั่งอาหาร") {
    const payload = {
      type: "text",
      text: "ร้านไหนดีครับ"
    };
    return client.replyMessage(event.replyToken, payload);
  }
   if(event.message.type === "text" || event.message.text === "ก๋วยเตี๋ยว ข้าวราดแกง KFC") {
    const payload = {
      type: "text",
      text: "ขอรายละเอียดด้วยครับ"
    };
    return client.replyMessage(event.replyToken, payload);
  }
   if(event.message.type === "text" || event.message.text === "กระเพราไข่ดาว") {
    const payload = {
      type: "text",
      text: "หมายเลข #"
    };
    return client.replyMessage(event.replyToken, payload);
  }
   if(event.message.type === "text" || event.message.text === "เช็คยอดกระเพราไข่ดาว") {
    const payload = {
      type: "text",
      text: "อาหารตามสั่ง เช็คยอดกระเพราไข่ดาว โดยการพิมพ์ +1 "
    };
    return client.replyMessage(event.replyToken, payload);
  }

}

// การเปิด port เพื่อให้สามารถใช้งานได้
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
