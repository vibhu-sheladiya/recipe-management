const express=require('express');
const {recipeController}=require('../../controllers');

const router=express.Router();

// create recipe 
router.post("/create-recipe",
recipeController.addRecipe
);

// list recipe 
router.get("/list-recipe",
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
