import connectDB from '../../../middleware/connectDB.js';
import Link from '../../../models/link';
import { isValidURL } from '../../../helpers/patterns.js';

/*
    API Route: /api/add-link
    Body parameters:
        customPath (required): the custom short path that the user inputted
        originalLink (required): the original link to redirect to
*/
const handler = async (req, res) => {
    if (req.method == "POST") {
        let { customPath, originalLink } = req.body;

        if (!customPath) {
            return res.status(400).json({ error: "Missing custom path!" });
        } else if (!originalLink) {
            return res.status(400).json({ error: "Missing original link!" });
        } else if (!isValidURL(originalLink)) {
            return res.status(400).json({ error: "Inavlid Url!" });
        }

        const customPathExists = await Link.findOne({ customPath: customPath });
        if (customPathExists) {
            return res.status(403).json({ error: 'Short link taken!' });
        }

        // replace white space with "-"
        customPath = customPath.replace(/ /g, "-")

        let link = new Link({customPath, originalLink});

        await link.save((err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            return res.status(200).json(result);
        });
    }
}

export default connectDB(handler);