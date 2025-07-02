const UserModel = require("../models/UserModel.js");
const PetModel = require("../models/pet_model");

async function handleUserByAdmin(req, res) {
  try {
    const { newName, newEmail, newRole, email, role } = req.body;

    const user = await UserModel.findOne({ email, role });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = newName || user.name;
    user.email = newEmail || user.email;
    user.role = newRole || user.role;

    await user.save();
    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update user" });
  }
}

async function handlePetByAdmin(req, res) {
  try {
    const { newName, newSeller, id, name, seller } = req.body;

    const pet = await PetModel.findOne({ _id: id, name, seller });
    if (!pet) return res.status(404).json({ error: "Pet not found" });

    const ownerUser = await UserModel.findOne({ email: seller });
    if (!ownerUser) return res.status(404).json({ error: "Seller not found" });

    pet.name = newName || pet.name;
    pet.seller = newSeller || pet.seller;

    await pet.save();
    return res.status(200).json({ message: "Pet updated successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update pet" });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find({}, "-password"); // exclude password field
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: "Error fetching users" });
  }
}

async function getAllPets(req, res) {
  try {
    const pets = await PetModel.find({});
    return res.status(200).json(pets);
  } catch (err) {
    return res.status(500).json({ error: "Error fetching pets" });
  }
}

// Delete User
async function deleteUserByAdmin(req, res) {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete user" });
  }
}


module.exports = {
  handleUserByAdmin,
  handlePetByAdmin,
  getAllUsers,
  getAllPets,
  deleteUserByAdmin
};
