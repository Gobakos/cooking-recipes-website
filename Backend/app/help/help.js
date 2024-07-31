const db = require('../models/index')
const User = db.User
const Recipe=db.Recipe
const Ingredient=db.Ingredient
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');
require('dotenv').config();

async function addIngredients() {
    try {
        const ingredients = [{
            ingredient_name: 'All-Purpose Flour'
        }, {
           ingredient_name: 'Arborio Rice'
        }, {
           ingredient_name: 'Asparagus'
        }, {
           ingredient_name: 'Basmati Rice'
        }, {
           ingredient_name: 'Beef Broth'
        }, {
           ingredient_name: 'Beef Sirloin'
        }, {
           ingredient_name: 'Bell Peppers (Assorted Colors)'
        }, {
           ingredient_name: 'Black Pepper'
        }, {
           ingredient_name: 'Bread Crumbs'
        }, {
           ingredient_name: 'Broccoli Florets'
        }, {
           ingredient_name: 'Butter'
        }, {
           ingredient_name: 'Carrots'
        }, {
           ingredient_name: 'Cheddar Cheese'
        }, {
           ingredient_name: 'Chicken Breast'
        }, {
           ingredient_name: 'Chicken Breasts'
        }, {
           ingredient_name: 'Chicken Broth'
        }, {
           ingredient_name: 'Coconut Milk'
        }, {
           ingredient_name: 'Coriander'
        }, {
           ingredient_name: 'Cornstarch'
        }, {
           ingredient_name: 'Cumin'
        }, {
           ingredient_name: 'Curry Powder'
        }, {
           ingredient_name: 'Dijon Mustard'
        }, {
           ingredient_name: 'Egg'
        }, {
           ingredient_name: 'Egg Noodles'
        }, {
           ingredient_name: 'Eggs'
        }, {
           ingredient_name: 'Fettuccine Pasta'
        }, {
           ingredient_name: 'Fresh Basil'
        }, {
           ingredient_name: 'Fresh Basil Leaves'
        }, {
           ingredient_name: 'Fresh Dill'
        }, {
           ingredient_name: 'Fresh Mozzarella Cheese'
        }, {
           ingredient_name: 'Fresh Parsley'
        }, {
           ingredient_name: 'Fresh Tomatoes'
        }, {
           ingredient_name: 'Garlic'
        }, {
           ingredient_name: 'Ginger'
        }, {
           ingredient_name: 'Green Onions'
        }, {
           ingredient_name: 'Ground Beef'
        }, {
           ingredient_name: 'Heavy Cream'
        }, {
           ingredient_name: 'Lasagna Noodles'
        }, {
           ingredient_name: 'Lemon'
        }, {
           ingredient_name: 'Lemon Juice'
        }, {
           ingredient_name: 'Lemon Zest'
        }, {
           ingredient_name: 'Lettuce'
        }, {
           ingredient_name: 'Linguine Pasta'
        }, {
           ingredient_name: 'Marinara Sauce'
        }, {
           ingredient_name: 'Milk'
        }, {
           ingredient_name: 'Mixed Vegetables (Carrots, Peas, Corn)'
        }, {
           ingredient_name: 'Mozzarella Cheese'
        }, {
           ingredient_name: 'Mushrooms'
        }, {
           ingredient_name: 'Olive Oil'
        }, {
           ingredient_name: 'Onion'
        }, {
           ingredient_name: 'Pancetta'
        }, {
           ingredient_name: 'Parmesan Cheese'
        }, {
           ingredient_name: 'Parsley'
        }, {
           ingredient_name: 'Peas'
        }, {
           ingredient_name: 'Pie Crust (Store-bought or Homemade)'
        }, {
           ingredient_name: 'Pizza Dough'
        }, {
           ingredient_name: 'Potatoes'
        }, {
           ingredient_name: 'Red Pepper Flakes'
        }, {
           ingredient_name: 'Rice Vinegar'
        }, {
           ingredient_name: 'Ricotta Cheese'
        }, {
           ingredient_name: 'Ripe Tomatoes'
        }, {
           ingredient_name: 'Salmon Fillets'
        }, {
           ingredient_name: 'Salt'
        }, {
           ingredient_name: 'Sesame Oil'
        }, {
           ingredient_name: 'Sesame Seeds'
        }, {
           ingredient_name: 'Shrimp'
        }, {
           ingredient_name: 'Snap Peas'
        }, {
           ingredient_name: 'Sour Cream'
        }, {
           ingredient_name: 'Soy Sauce'
        }, {
           ingredient_name: 'Spaghetti'
        }, {
           ingredient_name: 'Spinach'
        }, {
           ingredient_name: 'Steamed Rice'
        }, {
           ingredient_name: 'Sugar'
        }, {
           ingredient_name: 'Taco Seasoning'
        }, {
           ingredient_name: 'Tomato'
        }, {
           ingredient_name: 'Tortillas'
        }, {
           ingredient_name: 'Turmeric'
        }, {
           ingredient_name: 'Vegetable Broth'
        }, {
           ingredient_name: 'White Wine'
        }, {
           ingredient_name: 'Worcestershire Sauce'
    }];

        await Ingredient.bulkCreate(ingredients);
        console.log('Ingredients added successfully.');
    } catch (error) {
        console.error('Error adding ingredients:', error);
    }
}

async function addCategories() {
    try {
        const categories = [{
            category_name: 'Pasta'
        },{
            category_name: 'Tacos'
        },{
            category_name: 'Seafood'
        },{
            category_name: 'Vegetarian'
        },{
            category_name: 'Pizza'
        },{
            category_name: 'Rice'
        },{
            category_name: 'Chicken'
        },{
            category_name: 'Soup'
        },{
            category_name: 'Beef'
        }];

        await db.Category.bulkCreate(categories);
        console.log('Categories added successfully.');
    } catch (error) {
        console.error('Error adding categories:', error);
    }
}

async function addSubcategories() {
    try {
        await addSubcategory('Pasta', 'Modern Italian');
        await addSubcategory('Pasta', 'Classic Italian');
        await addSubcategory('Pasta', 'Vegetarian');
        await addSubcategory('Tacos', 'Mexican Cuisine');
        await addSubcategory('Seafood', 'Grilled');
        await addSubcategory('Seafood', 'Pasta');
        await addSubcategory('Pasta', 'Seafood');
        await addSubcategory('Vegetarian', 'Curry');
        await addSubcategory('Vegetarian', 'Stir-Fry');
        await addSubcategory('Pizza', 'Meatless Meals');
        await addSubcategory('Rice', 'Italian Cuisine');
        await addSubcategory('Chicken', 'Homemade Italian');
        await addSubcategory('Chicken', 'Traditional Pie');
        await addSubcategory('Soup', 'Comfort Food');
        await addSubcategory('Beef', 'Russian Cuisine');

        console.log('Subcategories added successfully.');
    } catch (error) {
        console.error('Error adding subcategories:', error);
    }
}

async function addSubcategory(categoryName, subcategoryName) {
    try {
        // Find the category by name
        const category = await db.Category.findOne({ where: { category_name: categoryName } });

        // Create the subcategory and associate it with the category
        const subcategory = await db.Subcategory.create({ subcategory_name: subcategoryName });
        await subcategory.setCategory(category);

        console.log(`Subcategory '${subcategoryName}' added successfully to category '${categoryName}'.`);
    } catch (error) {
        console.error('Error adding subcategory:', error);
    }
}


async function addRecipes() {
    try {
        await addRecipeWithUserCategoryAndSubcategory(2, 'Classic Spaghetti Carbonara', 'Delicious and creamy spaghetti carbonara recip. Made with eggs, cheese, pancetta, and black pepper.', 2, 1, 10, 30, 'nikos', 'Pasta', 'Classic Italian');
        await addRecipeIngredient('Classic Spaghetti Carbonara', 'Spaghetti', 8, 'oz');
        await addRecipeIngredient('Classic Spaghetti Carbonara', 'Eggs', 4, 'whole');
        await addRecipeIngredient('Classic Spaghetti Carbonara', 'Parmesan Cheese', 1, 'cup (grated)');
        await addRecipeIngredient('Classic Spaghetti Carbonara', 'Pancetta', 4, 'oz (diced)');
        await addRecipeIngredient('Classic Spaghetti Carbonara', 'Black Pepper', 1, 'half teaspoon');

        await addRecipeTag('Classic Spaghetti Carbonara', 'Creamy');
        await addRecipeTag('Classic Spaghetti Carbonara', 'Quick and Easy');


        await addRecipeWithUserCategoryAndSubcategory(3, 'Chicken Alfredo Pasta', 'Creamy and savory chicken alfredo pasta. Contains garlic, parmesan cheese, and grilled chicken breast.', 3, 3, 15, 40, 'anna', 'Pasta', 'Modern Italian');
        await addRecipeIngredient('Chicken Alfredo Pasta', 'Chicken Breast', 2, 'pieces (boneless, skinless)');
        await addRecipeIngredient('Chicken Alfredo Pasta', 'Fettuccine Pasta', 8, 'oz');
        await addRecipeIngredient('Chicken Alfredo Pasta', 'Heavy Cream', 1, 'half cup');
        await addRecipeIngredient('Chicken Alfredo Pasta', 'Parmesan Cheese', 1, 'cup');
        await addRecipeIngredient('Chicken Alfredo Pasta', 'Garlic', 3, 'cloves');
        await addRecipeIngredient('Chicken Alfredo Pasta', 'Butter', 4, 'tablespoons');
        await addRecipeIngredient('Chicken Alfredo Pasta', 'Salt', 1, 'teaspoon');
        await addRecipeIngredient('Chicken Alfredo Pasta', 'Black Pepper', 1, 'half teaspoon');

        await addRecipeTag('Chicken Alfredo Pasta', 'Italian')
        await addRecipeTag('Chicken Alfredo Pasta', 'Creamy');
        await addRecipeTag('Chicken Alfredo Pasta', 'Savory');
        await addRecipeTag('Chicken Alfredo Pasta', 'Family Dinner');


        await addRecipeWithUserCategoryAndSubcategory(4, 'Beef Tacos', 'Authentic beef tacos. They are filled seasoned ground beef, lettuce, tomatoes, cheese, and sour cream. Served in warm tortillas.', 4, 4, 20, 20, 'dimitris', 'Tacos', 'Mexican Cuisine');
        await addRecipeIngredient('Beef Tacos', 'Ground Beef', 1, 'lb');
        await addRecipeIngredient('Beef Tacos', 'Taco Seasoning', 2, 'tablespoons');
        await addRecipeIngredient('Beef Tacos', 'Lettuce', 1, 'cup (shredded)');
        await addRecipeIngredient('Beef Tacos', 'Tomato', 1, 'whole (diced)');
        await addRecipeIngredient('Beef Tacos', 'Cheddar Cheese', 1, 'cup (shredded)');
        await addRecipeIngredient('Beef Tacos', 'Sour Cream', 1, 'half cup');
        await addRecipeIngredient('Beef Tacos', 'Tortillas', 8, 'pieces (soft)');

        await addRecipeTag('Beef Tacos', 'Mexican');
        await addRecipeTag('Beef Tacos', 'Authentic');
        await addRecipeTag('Beef Tacos', 'Easy Dinner');
        await addRecipeTag('Beef Tacos', 'Family-Friendly');

        
        await addRecipeWithUserCategoryAndSubcategory(5, 'Grilled Salmon with Asparagus', 'Healthy grilled salmon fillets. Seasoned with lemon, garlic, and herbs. Served with roasted asparagus spears.', 2, 4, 30, 60, 'nikos', 'Seafood', 'Grilled');
        await addRecipeIngredient('Grilled Salmon with Asparagus', 'Salmon Fillets', 4, '(6 oz each)');
        await addRecipeIngredient('Grilled Salmon with Asparagus', 'Lemon', 1, '(sliced)');
        await addRecipeIngredient('Grilled Salmon with Asparagus', 'Garlic', 3, 'cloves (minced)');
        await addRecipeIngredient('Grilled Salmon with Asparagus', 'Olive Oil', 2, 'tablespoons');
        await addRecipeIngredient('Grilled Salmon with Asparagus', 'Salt', 1, 'teaspoon');
        await addRecipeIngredient('Grilled Salmon with Asparagus', 'Black Pepper', 1, 'half teaspoon');
        await addRecipeIngredient('Grilled Salmon with Asparagus', 'Fresh Dill', 2, 'tablespoons (chopped)');
        await addRecipeIngredient('Grilled Salmon with Asparagus', 'Asparagus', 1, 'lb (trimmed)');

        await addRecipeTag('Grilled Salmon with Asparagus', 'Healthy');
        await addRecipeTag('Grilled Salmon with Asparagus', 'Easy');
        await addRecipeTag('Grilled Salmon with Asparagus', 'Dinner Party');

        
        await addRecipeWithUserCategoryAndSubcategory(6, 'Vegetable Curry', 'Delicious and aromatic vegetable curry. Made with potatoes, carrots, peas, and a blend of spices. Served with fluffy basmati rice.', 3, 2, 10, 20, 'anna', 'Vegetarian', 'Curry');
        await addRecipeIngredient('Vegetable Curry', 'Potatoes', 2, 'whole (peeled and diced)');
        await addRecipeIngredient('Vegetable Curry', 'Carrots', 2, 'whole (peeled and diced)');
        await addRecipeIngredient('Vegetable Curry', 'Peas', 1, 'cup');
        await addRecipeIngredient('Vegetable Curry', 'Onion', 1, 'whole (chopped)');
        await addRecipeIngredient('Vegetable Curry', 'Garlic', 3, 'cloves (minced)');
        await addRecipeIngredient('Vegetable Curry', 'Ginger', 1, 'tablespoon');
        await addRecipeIngredient('Vegetable Curry', 'Coconut Milk', 1, 'can (13.5 oz)');
        await addRecipeIngredient('Vegetable Curry', 'Curry Powder', 2, 'tablespoons');
        await addRecipeIngredient('Vegetable Curry', 'Turmeric', 1, 'teaspoon');
        await addRecipeIngredient('Vegetable Curry', 'Cumin', 1, 'teaspoon');
        await addRecipeIngredient('Vegetable Curry', 'Coriander', 1, 'teaspoon');
        await addRecipeIngredient('Vegetable Curry', 'Basmati Rice', 1, 'cup (uncooked)');

        await addRecipeTag('Vegetable Curry', 'Indian');
        await addRecipeTag('Vegetable Curry', 'Aromatic');
        await addRecipeTag('Vegetable Curry', 'Healthy');


        await addRecipeWithUserCategoryAndSubcategory(7, 'Margherita Pizza', 'Classic Margherita pizza. Topped with fresh tomatoes, mozzarella cheese, basil leaves, and a drizzle of olive oil.', 4, 3, 20, 70, 'dimitris', 'Pizza', 'Meatless Meals');
        await addRecipeIngredient('Margherita Pizza', 'Pizza Dough', 1, 'lb (store-bought or homemade)');
        await addRecipeIngredient('Margherita Pizza', 'Fresh Tomatoes', 2, 'medium');
        await addRecipeIngredient('Margherita Pizza', 'Fresh Mozzarella Cheese', 8, 'oz');
        await addRecipeIngredient('Margherita Pizza', 'Fresh Basil Leaves', 1, 'half cup');
        await addRecipeIngredient('Margherita Pizza', 'Olive Oil', 2, 'tablespoons');
        await addRecipeIngredient('Margherita Pizza', 'Salt', 1, 'half teaspoon');
        await addRecipeIngredient('Margherita Pizza', 'Black Pepper', 1, 'quarter teaspoon');

        await addRecipeTag('Margherita Pizza', 'Italian');
        await addRecipeTag('Margherita Pizza', 'Classic');
        await addRecipeTag('Margherita Pizza', 'Fresh');
        await addRecipeTag('Margherita Pizza', 'Homemade');


        await addRecipeWithUserCategoryAndSubcategory(8, 'Vegetarian Lasagna', 'Healthy and delicious vegetarian lasagna. Packed with spinach, mushrooms, ricotta, and marinara sauce.', 2, 4, 20, 40, 'nikos', 'Pasta', 'Vegetarian');
        await addRecipeIngredient('Vegetarian Lasagna', 'Lasagna Noodles', 9, 'sheets');
        await addRecipeIngredient('Vegetarian Lasagna', 'Spinach', 2 , 'cups (chopped)');
        await addRecipeIngredient('Vegetarian Lasagna', 'Mushrooms', 1, 'cup (sliced)');
        await addRecipeIngredient('Vegetarian Lasagna', 'Ricotta Cheese', 1, 'half cup');
        await addRecipeIngredient('Vegetarian Lasagna', 'Marinara Sauce', 2, 'cups');
        await addRecipeIngredient('Vegetarian Lasagna', 'Mozzarella Cheese', 1, 'half cup (shredded)');
        await addRecipeIngredient('Vegetarian Lasagna', 'Parmesan Cheese', 1, 'half cup (grated)');
        await addRecipeIngredient('Vegetarian Lasagna', 'Garlic', 2, 'cloves (minced)');
        await addRecipeIngredient('Vegetarian Lasagna', 'Olive Oil', 2, 'tablespoons');
        await addRecipeIngredient('Vegetarian Lasagna', 'Salt', 0, 'to taste');
        await addRecipeIngredient('Vegetarian Lasagna', 'Black Pepper', 0, 'to taste');

        await addRecipeTag('Vegetarian Lasagna', 'Italian');
        await addRecipeTag('Vegetarian Lasagna', 'Casserole');
        await addRecipeTag('Vegetarian Lasagna', 'Crowd-Pleaser');


        await addRecipeWithUserCategoryAndSubcategory(9, 'Shrimp Scampi Pasta', 'Garlicky and buttery shrimp scampi. Served over a bed of linguine pasta. Garnished with parsley and lemon wedges.', 2, 5, 30, 40, 'anna', 'Pasta', 'Seafood');
        await addRecipeIngredient('Shrimp Scampi Pasta', 'Linguine Pasta', 8, 'oz');
        await addRecipeIngredient('Shrimp Scampi Pasta', 'Shrimp', 1, 'lb (peeled and deveined)');
        await addRecipeIngredient('Shrimp Scampi Pasta', 'Garlic', 4, 'cloves (minced)');
        await addRecipeIngredient('Shrimp Scampi Pasta', 'Butter', 1, 'half cup');
        await addRecipeIngredient('Shrimp Scampi Pasta', 'White Wine', 1, 'quarter cup');
        await addRecipeIngredient('Shrimp Scampi Pasta', 'Lemon Juice', 2, 'tablespoons');
        await addRecipeIngredient('Shrimp Scampi Pasta', 'Parsley', 1, 'quarter cup (chopped)');
        await addRecipeIngredient('Shrimp Scampi Pasta', 'Olive Oil', 2, 'tablespoons');
        await addRecipeIngredient('Shrimp Scampi Pasta', 'Salt', 0, 'to taste');
        await addRecipeIngredient('Shrimp Scampi Pasta', 'Black Pepper', 0, 'to taste');
        await addRecipeIngredient('Shrimp Scampi Pasta', 'Red Pepper Flakes', 0, 'to taste');

        await addRecipeTag('Shrimp Scampi Pasta', 'Garlic');
        await addRecipeTag('Shrimp Scampi Pasta', 'Butter');
        await addRecipeTag('Shrimp Scampi Pasta', 'Elegant');


        await addRecipeWithUserCategoryAndSubcategory(10, 'Mushroom Risotto', 'Creamy and flavorful mushroom risotto. Made with Arborio rice, mushrooms, onions, garlic, white wine, and parmesan cheese.', 4, 3, 10, 40, 'dimitris', 'Rice', 'Italian Cuisine');
        await addRecipeIngredient('Mushroom Risotto', 'Arborio Rice', 1, 'half cups');
        await addRecipeIngredient('Mushroom Risotto', 'Mushrooms', 8, 'oz (sliced)');
        await addRecipeIngredient('Mushroom Risotto', 'Onion', 1, '(finely chopped)');
        await addRecipeIngredient('Mushroom Risotto', 'Garlic', 2, 'cloves (minced)');
        await addRecipeIngredient('Mushroom Risotto', 'White Wine', 1, 'half cup');
        await addRecipeIngredient('Mushroom Risotto', 'Vegetable Broth', 4, 'cups');
        await addRecipeIngredient('Mushroom Risotto', 'Parmesan Cheese', 1, 'half cup (grated)');
        await addRecipeIngredient('Mushroom Risotto', 'Butter', 2, 'tablespoons');
        await addRecipeIngredient('Mushroom Risotto', 'Olive Oil', 2, 'tablespoons');
        await addRecipeIngredient('Mushroom Risotto', 'Salt', 0, 'to taste');
        await addRecipeIngredient('Mushroom Risotto', 'Black Pepper', 0, 'to taste');
        await addRecipeIngredient('Mushroom Risotto', 'Fresh Parsley', 0, 'for garnish');

        await addRecipeTag('Mushroom Risotto', 'Italian');
        await addRecipeTag('Mushroom Risotto', 'Risotto');
        await addRecipeTag('Mushroom Risotto', 'Creamy');
        await addRecipeTag('Mushroom Risotto', 'Mushroom');
        await addRecipeTag('Mushroom Risotto', 'Gourmet');


        await addRecipeWithUserCategoryAndSubcategory(11, 'Chicken Parmesan', 'Crispy breaded chicken breast. Topped with marinara sauce and melted mozzarella cheese. Served with spaghetti.', 3, 4, 15, 45, 'nikos', 'Chicken', 'Homemade Italian');
        await addRecipeIngredient('Chicken Parmesan', 'Chicken Breasts', 4, '(boneless, skinless)');
        await addRecipeIngredient('Chicken Parmesan', 'Bread Crumbs', 1, 'cup');
        await addRecipeIngredient('Chicken Parmesan', 'Parmesan Cheese', 1, 'half cup (grated)');
        await addRecipeIngredient('Chicken Parmesan', 'Eggs', 2, '(beaten)');
        await addRecipeIngredient('Chicken Parmesan', 'Marinara Sauce', 2, 'cups');
        await addRecipeIngredient('Chicken Parmesan', 'Mozzarella Cheese', 1, 'cup (shredded)');
        await addRecipeIngredient('Chicken Parmesan', 'Spaghetti', 8, 'oz');
        await addRecipeIngredient('Chicken Parmesan', 'Olive Oil', 0, 'for frying');
        await addRecipeIngredient('Chicken Parmesan', 'Salt', 0, 'to taste');
        await addRecipeIngredient('Chicken Parmesan', 'Black Pepper', 0, 'to taste');
        await addRecipeIngredient('Chicken Parmesan', 'Fresh Basil', 0, 'for garnish');

        await addRecipeTag('Chicken Parmesan', 'Italian');
        await addRecipeTag('Chicken Parmesan', 'Breaded');
        await addRecipeTag('Chicken Parmesan', 'Cheesy');
        await addRecipeTag('Chicken Parmesan', 'Family Favorite');


        await addRecipeWithUserCategoryAndSubcategory(12, 'Beef Stroganoff', 'Classic beef stroganoff. Made with tender beef strips, onions, mushrooms, and sour cream. Served over egg noodles.', 4, 3, 20, 70, 'anna', 'Beef', 'Russian Cuisine');
        await addRecipeIngredient('Beef Stroganoff', 'Beef Sirloin', 1, 'lb (cut into thin strips)');
        await addRecipeIngredient('Beef Stroganoff', 'Onion', 1, '(sliced)');
        await addRecipeIngredient('Beef Stroganoff', 'Mushrooms', 8, 'oz (sliced)');
        await addRecipeIngredient('Beef Stroganoff', 'Beef Broth', 1, 'cup');
        await addRecipeIngredient('Beef Stroganoff', 'Sour Cream', 1, 'cup');
        await addRecipeIngredient('Beef Stroganoff', 'Worcestershire Sauce', 2, 'tablespoons');
        await addRecipeIngredient('Beef Stroganoff', 'Dijon Mustard', 1, 'tablespoon');
        await addRecipeIngredient('Beef Stroganoff', 'Egg Noodles', 8, 'oz');
        await addRecipeIngredient('Beef Stroganoff', 'Olive Oil', 2, 'tablespoons');
        await addRecipeIngredient('Beef Stroganoff', 'Salt', 0, 'to taste');
        await addRecipeIngredient('Beef Stroganoff', 'Black Pepper', 0, 'to taste');
        await addRecipeIngredient('Beef Stroganoff', 'Fresh Parsley', 0, 'for garnish');

        await addRecipeTag('Beef Stroganoff', 'Russian');
        await addRecipeTag('Beef Stroganoff', 'Creamy');
        await addRecipeTag('Beef Stroganoff', 'Dinner');


        await addRecipeWithUserCategoryAndSubcategory(13, 'Lemon Garlic Shrimp Pasta', 'Zesty lemon garlic shrimp pasta. Made with juicy shrimp, garlic, lemon zest, parsley, and linguine pasta.', 2, 4, 25, 50, 'anna', 'Seafood', 'Pasta');
        await addRecipeIngredient('Lemon Garlic Shrimp Pasta', 'Linguine Pasta', 8, 'oz');
        await addRecipeIngredient('Lemon Garlic Shrimp Pasta', 'Shrimp', 1, 'lb (peeled and deveined)');
        await addRecipeIngredient('Lemon Garlic Shrimp Pasta', 'Garlic', 4, 'cloves (minced)');
        await addRecipeIngredient('Lemon Garlic Shrimp Pasta', 'Lemon Zest', 1, 'from 1 lemon');
        await addRecipeIngredient('Lemon Garlic Shrimp Pasta', 'Lemon Juice', 1, 'from 1 lemon');
        await addRecipeIngredient('Lemon Garlic Shrimp Pasta', 'Parsley', 1, 'half cup (chopped)');
        await addRecipeIngredient('Lemon Garlic Shrimp Pasta', 'Olive Oil', 2, 'tablespoons');
        await addRecipeIngredient('Lemon Garlic Shrimp Pasta', 'Salt', 0, 'to taste');
        await addRecipeIngredient('Lemon Garlic Shrimp Pasta', 'Black Pepper', 0, 'to taste');
        await addRecipeIngredient('Lemon Garlic Shrimp Pasta', 'Red Pepper Flakes', 0, 'optional, to taste');

        await addRecipeTag('Lemon Garlic Shrimp Pasta', 'Lemon');
        await addRecipeTag('Lemon Garlic Shrimp Pasta', 'Garlic');
        await addRecipeTag('Lemon Garlic Shrimp Pasta', 'Quick Meal');


        await addRecipeWithUserCategoryAndSubcategory(14, 'Vegetable Stir-Fry', 'Healthy and colorful vegetable stir-fry. Made with broccoli, bell peppers, carrots, snap peas, and a savory sauce. Served with steamed rice.', 4, 5, 15, 60, 'dimitris', 'Vegetarian', 'Stir-Fry');
        await addRecipeIngredient('Vegetable Stir-Fry', 'Broccoli Florets', 2, 'cups');
        await addRecipeIngredient('Vegetable Stir-Fry', 'Bell Peppers (Assorted Colors)', 1, 'cup (sliced)');
        await addRecipeIngredient('Vegetable Stir-Fry', 'Carrots', 1, 'cup (julienned)');
        await addRecipeIngredient('Vegetable Stir-Fry', 'Snap Peas', 1, 'cup');
        await addRecipeIngredient('Vegetable Stir-Fry', 'Soy Sauce', 1, 'quarter cup');
        await addRecipeIngredient('Vegetable Stir-Fry', 'Rice Vinegar', 2, 'tablespoons');
        await addRecipeIngredient('Vegetable Stir-Fry', 'Sesame Oil', 1, 'tablespoon');
        await addRecipeIngredient('Vegetable Stir-Fry', 'Garlic', 2, 'cloves (minced)');
        await addRecipeIngredient('Vegetable Stir-Fry', 'Ginger', 1, 'tablespoon (minced)');
        await addRecipeIngredient('Vegetable Stir-Fry', 'Cornstarch', 1, 'tablespoon (dissolved in 2 tablespoons water)');
        await addRecipeIngredient('Vegetable Stir-Fry', 'Olive Oil', 2, 'tablespoons');
        await addRecipeIngredient('Vegetable Stir-Fry', 'Green Onions', 0, 'for garnish');
        await addRecipeIngredient('Vegetable Stir-Fry', 'Sesame Seeds', 0, 'for garnish');
        await addRecipeIngredient('Vegetable Stir-Fry', 'Steamed Rice', 0, 'for serving');

        await addRecipeTag('Vegetable Stir-Fry', 'Healthy');
        await addRecipeTag('Vegetable Stir-Fry', 'Colorful');
        await addRecipeTag('Vegetable Stir-Fry', 'Easy Dinner');


        await addRecipeWithUserCategoryAndSubcategory(15, 'Chicken Pot Pie', 'Comforting chicken pot pie. Made with tender chicken, mixed vegetables, and a flaky pie crust. Baked until golden brown.', 2, 2, 20, 120, 'nikos', 'Chicken', 'Traditional Pie');
        await addRecipeIngredient('Chicken Pot Pie', 'Chicken Breasts', 2, '(cooked and shredded)');
        await addRecipeIngredient('Chicken Pot Pie', 'Mixed Vegetables (Carrots, Peas, Corn)', 2, 'cups');
        await addRecipeIngredient('Chicken Pot Pie', 'Onion', 1, '(chopped)');
        await addRecipeIngredient('Chicken Pot Pie', 'Chicken Broth', 1, 'half cup');
        await addRecipeIngredient('Chicken Pot Pie', 'Butter', 1, 'quarter cup');
        await addRecipeIngredient('Chicken Pot Pie', 'All-Purpose Flour', 1, 'quarter cup');
        await addRecipeIngredient('Chicken Pot Pie', 'Milk', 1, 'cup');
        await addRecipeIngredient('Chicken Pot Pie', 'Pie Crust (Store-bought or Homemade)', 2, '(for top and bottom crust)');
        await addRecipeIngredient('Chicken Pot Pie', 'Salt', 0, 'to taste');
        await addRecipeIngredient('Chicken Pot Pie', 'Black Pepper', 0, 'to taste');
        await addRecipeIngredient('Chicken Pot Pie', 'Egg', 1, '(beaten, for egg wash)');

        await addRecipeTag('Chicken Pot Pie', 'Pie');
        await addRecipeTag('Chicken Pot Pie', 'Classic');
        await addRecipeTag('Chicken Pot Pie', 'Cozy');


        await addRecipeWithUserCategoryAndSubcategory(16, 'Tomato Basil Soup', 'Creamy tomato basil soup. Made with ripe tomatoes, garlic, onions, basil, and heavy cream. Served with grilled cheese sandwiches for dipping.', 5, 1, 10, 10, 'anna', 'Soup', 'Comfort Food');
        await addRecipeIngredient('Tomato Basil Soup', 'Ripe Tomatoes', 6, 'large');
        await addRecipeIngredient('Tomato Basil Soup', 'Garlic', 4, 'cloves (minced)');
        await addRecipeIngredient('Tomato Basil Soup', 'Onion', 1, '(chopped)');
        await addRecipeIngredient('Tomato Basil Soup', 'Fresh Basil', 1, 'half cup (chopped)');
        await addRecipeIngredient('Tomato Basil Soup', 'Heavy Cream', 1, 'cup');
        await addRecipeIngredient('Tomato Basil Soup', 'Vegetable Broth', 4, 'cups');
        await addRecipeIngredient('Tomato Basil Soup', 'Olive Oil', 2, 'tablespoons');
        await addRecipeIngredient('Tomato Basil Soup', 'Butter', 2, 'tablespoons');
        await addRecipeIngredient('Tomato Basil Soup', 'Salt', 0, 'to taste');
        await addRecipeIngredient('Tomato Basil Soup', 'Black Pepper', 0, 'to taste');
        await addRecipeIngredient('Tomato Basil Soup', 'Sugar', 1, 'teaspoon (optional, to balance acidity)');

        await addRecipeTag('Tomato Basil Soup', 'Tomato');
        await addRecipeTag('Tomato Basil Soup', 'Basil');
        await addRecipeTag('Tomato Basil Soup', 'Creamy');
        await addRecipeTag('Tomato Basil Soup', 'Comforting');

        console.log('Recipes added successfully.');
    } catch (error) {
        console.error('Error adding recipes:', error);
    }
}

async function addTags() {
   try {
         const tags = [{
            tag_name: 'Aromatic'
         },{
            tag_name: 'Authentic'
         },{
            tag_name: 'Basil'
         },{
            tag_name: 'Breaded'
         },{
            tag_name: 'Butter'
         },{
            tag_name: 'Casserole'
         },{
            tag_name: 'Cheesy'
         },{
            tag_name: 'Classic'
         },{
            tag_name: 'Colorful'
         },{
            tag_name: 'Comforting'
         },{
            tag_name: 'Cozy'
         },{
            tag_name: 'Creamy'
         },{
            tag_name: 'Crowd-Pleaser'
         },{
            tag_name: 'Curry'
         },{
            tag_name: 'Dinner'
         },{
            tag_name: 'Dinner Party'
         },{
            tag_name: 'Easy'
         },{
            tag_name: 'Easy Dinner'
         },{
            tag_name: 'Elegant'
         },{
            tag_name: 'Family Dinner'
         },{
            tag_name: 'Family Favorite'
         },{
            tag_name: 'Family-Friendly'
         },{
            tag_name: 'Fresh'
         },{
            tag_name: 'Garlic'
         },{
            tag_name: 'Gourmet'
         },{
            tag_name: 'Healthy'
         },{
            tag_name: 'Homemade'
         },{
            tag_name: 'Indian'
         },{
            tag_name: 'Italian'
         },{
            tag_name: 'Lemon'
         },{
            tag_name: 'Mexican'
         },{
            tag_name: 'Mushroom'
         },{
            tag_name: 'Pie'
         },{
            tag_name: 'Quick and Easy'
         },{
            tag_name: 'Quick Meal'
         },{
            tag_name: 'Risotto'
         },{
            tag_name: 'Russian'
         },{
            tag_name: 'Savory'
         },{
            tag_name: 'Tomato'
         }];
       await db.Tag.bulkCreate(tags);
       console.log('Tags added successfully.');
   } catch (error) {
       console.error('Error adding tags:', error);
   }
}

async function addRecipeTag(recipeTitle, tagName) {
   try {
       // Find the recipe by title
       const recipe = await db.Recipe.findOne({ where: { recipe_title: recipeTitle } });
       if (!recipe) {
           throw new Error(`Recipe '${recipeTitle}' not found.`);
       }

       // Find the tag by name
       const tag = await db.Tag.findOne({ where: { tag_name: tagName } });
       if (!tag) {
           throw new Error(`Tag '${tagName}' not found.`);
       }

       // Create a row in the recipe_tags table
       await db.recipe_tags.create({
           ftag_id: tag.tag_id,
           frecipe_id: recipe.recipe_id,
       });

       console.log(`Tag '${tagName}' added to recipe '${recipeTitle}' successfully.`);
   } catch (error) {
       console.error('Error adding recipe tag:', error);
   }
}

async function addRecipeWithUserCategoryAndSubcategory(id, recipeTitle, recipeDescription, recipePortion, level, recipeTimeCreate, recipeTimePrepare, username, categoryName, subcategoryName) {
    try {
        // Find the user by username
        const user = await db.User.findOne({ where: { username: username } });
        if (!user) {
            throw new Error(`User '${username}' not found.`);
        }

        // Find the category by name
        const category = await db.Category.findOne({ where: { category_name: categoryName } });
        if (!category) {
            throw new Error(`Category '${categoryName}' not found.`);
        }

        // Find the subcategory by name
        const subcategory = await db.Subcategory.findOne({ where: { subcategory_name: subcategoryName } });
        if (!subcategory) {
            throw new Error(`Subcategory '${subcategoryName}' not found.`);
        }

        // Create the recipe and associate it with the user, category, and subcategory
        const recipe = await db.Recipe.create({
            id: id,
            recipe_title: recipeTitle,
            recipe_description: recipeDescription,
            recipe_portion: recipePortion,
            level: level,
            recipe_time_create: recipeTimeCreate,
            recipe_time_prepare: recipeTimePrepare
        });
        await recipe.setUser(user);
        const photoPath = `http://localhost:3000/api/v1/getphoto?id=${recipe.id}`;
        await recipe.update({ path: photoPath });
        await recipe.setCategory(category);
        await recipe.setSubcategory(subcategory);

        console.log(`Recipe '${recipeTitle}' added successfully.`);
    } catch (error) {
        console.error('Error adding recipe:', error);
    }
}


async function addRecipeIngredient(recipeTitle, ingredientName, quantity, description) {
    try {
        // Find the recipe by title
        const recipe = await db.Recipe.findOne({ where: { recipe_title: recipeTitle } });
        if (!recipe) {
            throw new Error(`Recipe '${recipeTitle}' not found.`);
        }

        // Find the ingredient by name
        const ingredient = await db.Ingredient.findOne({ where: { ingredient_name: ingredientName } });
        if (!ingredient) {
            throw new Error(`Ingredient '${ingredientName}' not found.`);
        }

        // Create a row in the recipe_ingredients table
        await db.recipe_ingredients.create({
            fingredient_id: ingredient.ingredient_id,
            frecipe_id: recipe.recipe_id,
            quantity: quantity,
            description: description
        });

        console.log(`Ingredient '${ingredientName}' added to recipe '${recipeTitle}' successfully.`);
    } catch (error) {
        console.error('Error adding recipe ingredient:', error);
    }
}


async function addUsers(){
    let admin = await User.findOne({where:{username:'admin'}});
    if(admin==null){
        admin = await User.create({
            username: 'admin',
            password:bcrypt.hashSync('admin', 10)
        })
    }
    
    const u1 = await User.findOne({where:{username:'anna'}});  //anna
    if(u1==null){
        await User.create({
            username: 'anna',
            password:bcrypt.hashSync('anna', 10)
        })
    }

    const u2 = await User.findOne({where:{username:'dimitris'}});  //dimitris
    if(u2==null){
        await User.create({
            username: 'dimitris',
            password:bcrypt.hashSync('dimitris', 10)
        })
    }

    const u3 = await User.findOne({where:{username:'nikos'}});  //nikos
    if(u3==null){
        await User.create({
            username: 'nikos',
            password:bcrypt.hashSync('nikos', 10)
        })
    }

}
// async function clearUsers(){
//     await User.truncate({
//         truncate: true,
//         cascade: true,
//         restartIdentity: true // Reset auto-increment IDs
//     });
// }

function encrypt(text) {
    const cipher = crypto.AES.encrypt(text, process.env.ENCRYPTION_KEY).toString();
    return cipher;
}

// Decryption function
function myDecrypt(encryptedText) {
    const decipher = crypto.AES.decrypt(encryptedText,process.env.ENCRYPTION_KEY);
    const decrypted = decipher.toString(crypto.enc.Utf8);
    return decrypted;
}

async function initialize() {
   await addUsers();
   await addIngredients();
   await addCategories();
   await addSubcategories();
   await addTags();
   await addRecipes();
}


module.exports = {
    initialize,
    encrypt,
    myDecrypt
}