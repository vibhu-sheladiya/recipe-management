const { recipeService } = require("../services");

/** create recipe*/
const addRecipe = async (req, res) => {
  // console.log()
  try {
    const reqBody = req.body;
      console.log(reqBody,'+++++++++++ reqBody.recipe');
    const recipe = await recipeService.createRecipe(reqBody);
    if (!recipe) {
      throw new Error("Something went wrong, please try again or later!");
    }

    res.status(200).json({
      success: true,
      message: "create recipe succefully",
      data: { reqBody },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
  
  /** Get recipe list */
  const getRecipeList = async (req, res) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.status(200).json({
      success: true,
       recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }  
  };


    /** Get recipe by id list */
  const getRecipeById = async (req, res) => {
    // Extract recipeId from req.body
    const { recipeId } = req.body; // Destructure recipeId from the request body
    
    try {
      const recipe = await recipeService.getRecipeById(recipeId);
      
      if (!recipe) {
        return res.status(404).json({
          success: false,
          message: "Recipe not found.",
        });
      }
      
      res.status(200).json({
        success: true,
        data: recipe,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

    /** Get recipe update */
  const updateRecipe = async (req, res) => {
    try {
      const recipeId = req.body.recipeId;
      const RecipeEx = await recipeService.getRecipeById(recipeId);
      if (!RecipeEx) {
        throw new Error("recipeId does not exist");
      }
      await recipeService.updateRecipe(recipeId, req.body);
      res.status(201).json({
        success: true,
        message: "successfully updated",
        data: { RecipeEx },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

    /** Get recipe delete */
  const deleteRecipeById = async (req, res) => {
    try {
      const recipeId = req.body.recipeId;
      const recipeExists = await  recipeService.getRecipeById(recipeId);
      if (!recipeExists) {
        throw new Error("recipe not found!");
      }
  
      await recipeService.deleteRecipe(recipeId);
  
      res.status(200).json({
        success: true,
        message: "recipe delete successfully!",
        data: recipeExists,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };


  module.exports = {
    addRecipe,getRecipeList,getRecipeById,updateRecipe,deleteRecipeById

  };