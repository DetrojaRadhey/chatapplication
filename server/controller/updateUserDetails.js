const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")
const UserModel = require("../models/UserModel")

async function updateUserDetails(request, response) {
    try {
        console.log(request.body)
        const token = request.cookies.token || ""
        const user = await getUserDetailsFromToken(token)

        const { name, profile_pic } = request.body

        const updatedUser = await UserModel.findByIdAndUpdate(
            user._id,
            { name: name, profile_pic: profile_pic }
        )

        return response.json({
            message: "User updated successfully",
            data: updatedUser,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = updateUserDetails