const multer = require("multer");
const {db} = require(process.env.PWD+'/lib/firestoreconnect.js');


exports.list = async (req, res) => {
    const data = [];
    const {datacount, page} = req.query;
    if(datacount === undefined || page === undefined) {
        return res.json({"link" : `http://localhost:8800/general/list?datacount=${datacount}&page=${page}`});
    } else {
        const limit = (datacount === null ? null : parseInt(datacount))
        const offset = (page === null ? null : parseInt(page))*limit - limit;
        // console.log(limit, offset);
        var general = null;
        if(offset === null)
            general = await db.collection('general').limit(limit).get();
        else
            general = await db.collection('general').offset(offset).limit(limit).get();

        general.forEach((doc) => {
            data.push({"id": doc.id, "data": doc.data()})
            // console.log(doc.id, '=>', doc.data());
        });


        return res.json({"data" : data});
    }
}




exports.create = async (req, res) => {
    const data = [];
    const {facebook, instagram, youtube} = req.query;
    if(facebook === undefined || instagram === undefined || youtube === undefined) {
        return res.json({"link" : `http://localhost:8800/general/create?facebook=${facebook}&instagram=${instagram}&youtube=${youtube}`});
    } else {
        const general = await db.collection('general').add({
            facebook: facebook,
            instagram: instagram,
            youtube: youtube
        });
        
        data.push({"id": general.id});

        return res.json(JSON.stringify({"data" : data}));
    }
}




exports.update = async (req, res) => {
    const data = [];
    const {id, facebook, instagram, youtube} = req.query;
    if(likes === undefined || views === undefined) {
        return res.json({"link" : `http://localhost:8800/general/update?id=${id}&facebook=${facebook}&instagram=${instagram}&youtube=${youtube}`});
    } else {
        const general = await db.collection('general').doc(id).update({
            facebook: facebook,
            instagram: instagram,
            youtube: youtube
        });
        
        data.push({"id": general.id});
        // console.log(req.query);
        return res.json(JSON.stringify({"data" : data}));
    }
}