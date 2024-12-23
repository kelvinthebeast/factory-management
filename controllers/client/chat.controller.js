const Chat = require("../../models/chat.model");
const User = require("../../models/user.model")
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;

    _io.once('connection', (socket) => {
        console.log("a user connected ",socket.id);
        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            // luuw vao database
            const chat = new Chat({
                user_id: userId,
                content: content
            })
            await chat.save();
            // end luu vao database
        })
    });

    const chats = await Chat.find({ user_id: userId })
    for (const chat of chats) {
        const infoUser = await User.findOne({ _id: chat.user_id }).select("fullName");
        chat.infoUser = infoUser; // Gán thêm thông tin người dùng
    }
    


    res.render("client/pages/chat/index", {
        pageTitle: "Trò chuyện",
        chats: chats
    })}