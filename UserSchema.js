const UserSchema - new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim= true,
    },
    profilePicture: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Standard User', 'Organizer', 'System Admin']
    }
}, 
    { timestamp: true});
)
const User= mongoose.model('User', UserSchema);
module.exports= User;