const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
/* 
 app.use(express.urlencoded({extended: true})) 
 * express에 기본적으로 body-parser의 urlencoded가 내장되어 있음.
 * 하지만 권고사항은 body-parser를 따로 받아라고 되어있음.
 * 이유는 추후에 express에 body-parser가 빠질수도 있기 때문임.
 */
app.use(express.static(path.join(__dirname, 'public')));

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404page.html"));
});

app.listen(3000);