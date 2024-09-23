const { Recipe } = require("../models");
/**
 * Create recipe
 * @param {object} reqBody
 * @returns {Promise<User>}
 */
const createRecipe = async (reqBody) => {
  return Recipe.create(reqBody);
};

/**
 * Get recipe list
//  */

const getAllRecipes = async () => {
  return await Recipe.find().populate('userid'); // Assuming Recipe is a model representing your recipes in the database
};

const getRecipeById = async (recipeId) => {
  return await Recipe.findById(recipeId);
};

const updateRecipe = async (recipeId, updateBody) => {
  return Recipe.findByIdAndUpdate(recipeId, { $set: updateBody });
};

const deleteRecipe = async (recipeId) => {
  return Recipe.findByIdAndDelete(recipeId);
};

module.exports={
  createRecipe,
    getAllRecipes,updateRecipe,deleteRecipe,
    getRecipeById,
};
