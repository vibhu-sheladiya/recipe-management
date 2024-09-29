const express=require('express');
const {recipeController}=require('../../controllers');
const { accessToken } = require('../../middlewares/auth');

const router=express.Router();

// create recipe 
router.post("/create-recipe",
recipeController.addRecipe
);

// list recipe 
router.get("/list-recipe",accessToken(),
    recipeController.getRecipeList
    );

    // list recipe by id
    router.get("/list-recipe-id",
        recipeController.getRecipeById
        );
    
        // update recipe by id
        router.put("/update-recipe-id",
            recipeController.updateRecipe
            );
        
// delete recipe  by id
            router.delete("/delete-recipe-id",
                recipeController.deleteRecipeById
                );
            

module.exports=router;
