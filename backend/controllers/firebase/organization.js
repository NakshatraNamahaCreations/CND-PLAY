const OrganizationModel = require("../../Model/organization");
const userModel = require("../../Model/userManagement");
exports.create = async (req, res) => {
  let { organization_name, website, tax_id, organization_type } = req.body;

  try {
    let CreateOrganization = new OrganizationModel({
      organization_name,
      website,
      tax_id,
      organization_type,
    });
    // console.log(CreateOrganization, "CreateOrganization");
    let SaveOrganization = await CreateOrganization.save();
    if (SaveOrganization) {
      return res.status(200).json({ data: SaveOrganization });
    }
  } catch (err) {
    return res.status(500).json({ err: "internal error" });
  }
};

exports.createuserManagement = async (req, res) => {
  let { organization_id, website, contact, email, organization_type } =
    req.body;

  try {
    let userManagement = new userModel({
      organization_id,
      website,
      contact,
      email,
      organization_type,
    });

    let saveUsers = await userManagement.save();
    if (saveUsers) {
      return res.status(200).json({ data: saveUsers });
    }
  } catch (err) {
    return res.status(500).json({ err: "internal error" });
  }
};

exports.getdata = async (req, res) => {
  try {
    const organization = await OrganizationModel.find({});
    if (organization) {
      return res.status(200).json({ data: organization });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};

exports.update = async (req, res) => {
  try {
    const userid = req.params.useridd;

    const { organization_name, website, tax_id, organization_type } = req.body;

    const findemovie = await OrganizationModel.findOne({
      _id: userid,
    });
    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.organization_name =
      organization_name || findemovie.organization_name;
    findemovie.website = website || findemovie.website;
    findemovie.tax_id = tax_id || findemovie.tax_id;
    findemovie.organization_type =
      organization_type || findemovie.organization_type;

    const updateMovie = await OrganizationModel.findOneAndUpdate(
      { _id: userid },
      findemovie,
      { new: true }
    );
    return res.json({
      message: "Updated successfully",
      date: updateMovie,
    });
  } catch (error) {
    // console.log("error", error);
    return res.status(500).json({ error: "Unable to update the movie" });
  }
};
exports.deleteorganization = async (req, res) => {
  let idd = req.params.iid;
  try {
    const organization = await OrganizationModel.findOneAndDelete({ _id: idd });
    if (organization) {
      return res.status(200).json({ data: organization });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};
exports.deleteuser = async (req, res) => {
  const userid = req.params.deleid;
  try {
    const userdata = await OrganizationModel.findOneAndDelete({ _id: userid });
    if (userdata) {
      return res
        .status(200)
        .json({ message: "Deleted successfully", user: userdata });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};
exports.changestatus = async (req, res) => {
  const data = [];
  const { status } = req.body.data.data;
  const { id } = req.body.data.filter;
  // console.log(status, "status");
  if (id === undefined || status === undefined) {
    return res.json({
      link: `https://api.cndplay.com/api/organization/update?id=${id}&active=${status}`,
    });
  } else {
    try {
      const result = await OrganizationModel.updateOne(
        { _id: id },
        { $set: { active: status === 1 ? true : false } }
      );

      if (result.nModified > 0) {
        data.push({ id: id });
        return res.json({ data: data });
      } else {
        return res.json({ error: "Document not found" });
      }
    } catch (error) {
      console.error("Error updating document:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
