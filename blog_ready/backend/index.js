const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const postsRouter = require('./routery/post_router');
const commentsRouter = require('./routery/comment_router');

app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

const PORT = 5170;


app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});