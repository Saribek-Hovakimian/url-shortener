import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(
        () => console.log('DB Connected'),
        err => console.log(`DB connection error: ${err.message}`)
    );

    return handler(req, res);
};

export default connectDB;