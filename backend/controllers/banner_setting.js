const BannerModule = require("");

exports.createBanner = async (req, res) => {
  const {
    ch_id,
    basic_settings_type,
    content_type,
    channel_name,
    website,
    discription,
  } = req.body;

  let file = req.file?.filename;
  try {
    if (!file) {
      throw new Error("Please upload a image");
    }
    const BasicSettingss = new BannerModule({
      ch_id,
      basic_settings_type,
      content_type,
      channel_name,
      website,
      chennel_logo: file,
      discription,
    });

    const BasicSettingssssave = await BasicSettingss.save();
    if (BasicSettingssssave) {
      return res.status(200).json({
        data: BasicSettingssssave,
        message: "Create BasicSettings Successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({ err: "internal error" });
  }

  // }
};
