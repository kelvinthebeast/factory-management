// const SettingGeneral =  require("../../middlewares/client/setting.middleware")

const SettingGeneral = require("../../models/settings-general.model")
module.exports.settingGeneral = async (req, res, next) => {
    const settingGeneral = await SettingGeneral.findOne({});
    // console.log("Setting General Middleware:", settingGeneral); // Kiểm tra giá trị
    res.locals.settingGeneral = settingGeneral; 
    next();
}