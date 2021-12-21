import dbConnect from '../../../lib/dbConnect';
import Link from '../../../models/link';
import { isValidURL } from '../../../lib/patterns.js';
import _ from 'lodash';

/*
    API Route: /api/links
    Body parameters:
        customPath (required): the custom short path that the user inputted
        originalLink (required): the original link to redirect to
*/
const handler = async (req, res) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
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
            customPath = _.split(customPath, " ");
            customPath = _.pull(customPath, "");
            customPath = _.join(customPath, "-");

            let finalLink = process.env.NEXT_PUBLIC_CLIENT_URL + "/" + customPath;

            // We check that the short url is a valid link using the user's custom path
            if (!isValidURL(finalLink, true)) {
                return res.status(400).json({ error: "Invalid Custom Path - Try Different Characters!" });
            }

            let link = new Link({customPath, originalLink});

            await link.save((err, result) => {
                if (err) {
                    return res.status(400).json({ error: err });;
                }

                return res.status(200).json(result);
            });
            break;
    default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
}

export default handler;