import connectDB from '../../../middleware/connectDB.js';
import Link from '../../../models/link';

/*
    API Route: /api/add-link
    Body parameters:
        customPath (required): the custom short path that the user inputted
        originalLink (required): the original link to redirect to
*/
const handler = async (req, res) => {
    if (req.method == "GET") {
        Link.findOne({ customPath: req.query.customPath}, (err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            } else if (!result) {
                return res.status(400).json({ error: "Custom path does not exist!" });
            }
            
            return res.status(200).json(result);
        });
    }
}

export default connectDB(handler);