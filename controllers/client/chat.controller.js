const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    _io.once('connection', (socket) => {
        console.log("A user connected", socket.id);

        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            // Lưu vào database
            const chat = new Chat({
                user_id: userId,
                content: content
            });
            await chat.save();

            // Trả dữ liệu về client
            _io.emit("SERVER_RETURN_MESSAGE", {
                user_id: userId,
                fullName: fullName,
                content: content
            });
        });
    });

    // Lấy danh sách tin nhắn và thêm thông tin người dùng
    const chats = await Chat.find({ user_id: userId });
    for (const chat of chats) {
        const infoUser = await User.findOne({ _id: chat.user_id }).select("fullName");
        chat.infoUser = infoUser; // Gán thêm thông tin người dùng
    }

    // Render giao diện
    res.render("client/pages/chat/index", {
        pageTitle: "Trò chuyện",
        chats: chats
    });
};
