export type RecipePost = {
  slug: string
  title: string
  description: string
  category: 'Venison' | 'Waterfowl' | 'Upland' | 'Rabbit' | 'Squirrel'
  cookTime: string
  servings: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  date: string
  readTime: string
  content: string
}

export const categoryColors: Record<string, string> = {
  Venison: 'bg-red',
  Waterfowl: 'bg-charcoal',
  Upland: 'bg-green',
  Rabbit: 'bg-[#8B6914]',
  Squirrel: 'bg-[#6B4226]',
}

export const recipes: RecipePost[] = [
  // ── EXISTING 6 RECIPES (with full content added) ──────────────────────

  {
    slug: 'smoked-venison-backstrap',
    title: 'Smoked Venison Backstrap',
    description: 'Low and slow smoked backstrap with a coffee-chili rub. The best cut, treated right.',
    category: 'Venison',
    cookTime: '2 hrs',
    servings: 4,
    difficulty: 'Medium',
    date: '2026-02-15',
    readTime: '5 min read',
    content: `The backstrap is the filet mignon of the deer. It runs along the spine and does almost no work, which means it's the most tender cut on the animal. Most people grill it hot and fast, and that works great — but smoking it low and slow with a coffee-chili rub takes it to another level. The smoke penetrates the lean meat and the rub builds a bark that adds flavor you can't get any other way.

## Ingredients

- 2 lbs venison backstrap, silverskin removed
- 2 tbsp finely ground coffee
- 1 tbsp ancho chili powder
- 1 tbsp brown sugar
- 1 tsp garlic powder
- 1 tsp onion powder
- 1 tsp smoked paprika
- 1 tsp kosher salt
- 1/2 tsp black pepper
- 1/2 tsp cayenne pepper
- 2 tbsp olive oil
- Hickory or cherry wood chunks

## Instructions

1. Remove the backstrap from the fridge 30 minutes before cooking and let it come to room temperature.
2. Mix the coffee, chili powder, brown sugar, garlic powder, onion powder, paprika, salt, pepper, and cayenne in a small bowl.
3. Pat the backstrap dry with paper towels. Rub with olive oil, then coat generously with the spice rub on all sides. Press the rub into the meat.
4. Preheat your smoker to 225 degrees F using hickory or cherry wood.
5. Place the backstrap directly on the grate. Insert a probe thermometer into the thickest part.
6. Smoke until the internal temperature reaches 130 degrees F for medium-rare, about 1.5 to 2 hours depending on thickness.
7. Remove from the smoker and tent loosely with foil. Rest for 10 minutes — the temp will carry over to about 135 degrees.
8. Slice against the grain into 1/2-inch medallions and serve.

## Tips

**Don't overcook it.** Venison backstrap has almost no fat. Past medium (140 degrees internal), it dries out fast and turns chewy. Pull it at 130 and let it rest — medium-rare is the sweet spot.

**Use a probe thermometer.** Don't guess. A $15 digital thermometer is the single best investment for cooking wild game.

**Cherry wood** gives a milder, slightly sweet smoke that pairs well with venison. Hickory is bolder. Both work — avoid mesquite, which can overpower the meat.`,
  },

  {
    slug: 'venison-chili',
    title: 'Venison Chili',
    description: 'Hearty ground venison chili with beans, peppers, and a touch of dark beer.',
    category: 'Venison',
    cookTime: '1.5 hrs',
    servings: 6,
    difficulty: 'Easy',
    date: '2026-02-12',
    readTime: '5 min read',
    content: `Ground venison is one of the most versatile things in your freezer, and chili is probably the best thing you can do with it. The lean meat soaks up the spices without the greasiness of beef, and a splash of dark beer adds depth that takes this from good to great. This is a staple during deer season — make a big pot on Sunday and eat it all week.

## Ingredients

- 2 lbs ground venison
- 1 large yellow onion, diced
- 4 cloves garlic, minced
- 2 jalapeños, seeded and diced
- 1 green bell pepper, diced
- 1 red bell pepper, diced
- 1 can (28 oz) crushed tomatoes
- 1 can (15 oz) kidney beans, drained and rinsed
- 1 can (15 oz) black beans, drained and rinsed
- 1 bottle (12 oz) dark beer (stout or porter)
- 2 tbsp chili powder
- 1 tbsp cumin
- 1 tsp smoked paprika
- 1 tsp oregano
- 1 tsp kosher salt
- 1/2 tsp black pepper
- 2 tbsp olive oil
- Optional toppings: shredded cheddar, sour cream, diced onion, cilantro

## Instructions

1. Heat olive oil in a large Dutch oven over medium-high heat. Add the ground venison and cook until browned, breaking it into small pieces with a wooden spoon. About 6 to 8 minutes. Transfer to a bowl.
2. In the same pot, add the onion, peppers, and jalapeños. Cook until softened, about 5 minutes. Add the garlic and cook 1 minute more.
3. Return the venison to the pot. Add chili powder, cumin, paprika, oregano, salt, and pepper. Stir to coat everything in the spices.
4. Pour in the crushed tomatoes, beans, and dark beer. Stir well and bring to a boil.
5. Reduce heat to low, cover with the lid slightly cracked, and simmer for at least 1 hour. Stir occasionally. The longer it simmers, the better it gets.
6. Taste and adjust seasoning. Serve in bowls with your choice of toppings.

## Tips

**Brown the meat in batches** if your pot isn't large enough. Overcrowding steams the meat instead of browning it, and you lose that flavor.

**Don't skip the beer.** It adds a malty sweetness that balances the heat and acid from the tomatoes. If you don't cook with alcohol, substitute with beef broth plus a tablespoon of Worcestershire.

**This freezes beautifully.** Portion into quart-sized freezer bags and lay flat. They'll stack in the freezer and reheat in 15 minutes.`,
  },

  {
    slug: 'pan-seared-duck-breast',
    title: 'Pan-Seared Duck Breast',
    description: 'Crispy skin, medium-rare center. Served with a cherry reduction and roasted root vegetables.',
    category: 'Waterfowl',
    cookTime: '30 min',
    servings: 2,
    difficulty: 'Medium',
    date: '2026-02-08',
    readTime: '5 min read',
    content: `A properly seared duck breast is one of the finest things you can eat. The skin renders down to pure crispiness while the meat stays pink and juicy inside. Wild duck breasts are smaller and leaner than farm-raised, so the technique matters even more — you need to start in a cold pan and render the fat slowly. Rush it and you get rubbery skin and overcooked meat.

## Ingredients

- 4 wild duck breast halves (mallard or pintail work best)
- Kosher salt and black pepper
- 1 cup tart cherries (fresh, frozen, or dried)
- 1/2 cup red wine
- 1/4 cup chicken stock
- 1 tbsp butter
- 1 tbsp honey
- 1 sprig fresh thyme
- Root vegetables for serving: parsnips, carrots, and turnips, cubed and roasted

## Instructions

1. Score the skin of each duck breast in a crosshatch pattern with a sharp knife, cutting through the skin and fat but not into the meat. This helps render the fat evenly.
2. Season both sides generously with kosher salt and black pepper. Let sit at room temperature for 15 minutes.
3. Place the duck breasts skin-side down in a cold cast iron skillet. Turn the heat to medium-low.
4. Cook for 8 to 10 minutes without moving them, letting the fat render slowly. The skin should be deep golden brown and crispy. Pour off excess fat as it accumulates (save it — duck fat is gold for cooking).
5. Flip the breasts and cook meat-side down for 2 to 3 minutes for medium-rare (130 degrees internal). Wild duck is best medium-rare — it gets livery when overcooked.
6. Remove the duck and rest on a cutting board for 5 minutes.
7. For the cherry reduction: pour off most of the fat from the pan, leaving about 1 tablespoon. Add the cherries, red wine, stock, honey, and thyme over medium heat. Simmer until reduced by half, about 5 minutes. Stir in the butter to finish.
8. Slice the duck breasts against the grain and fan over roasted root vegetables. Spoon the cherry reduction over the top.

## Tips

**Start in a cold pan.** This is the most important step. Putting duck skin in a hot pan seizes the fat before it can render out, leaving you with thick, chewy skin.

**Save the rendered duck fat.** Store it in a jar in the fridge. Use it for frying eggs, roasting potatoes, or making confit. It keeps for months.

**Don't overcook wild duck.** Past medium, wild duck tastes livery and the texture turns tough. Pull at 130 degrees internal and let the carryover do the rest.`,
  },

  {
    slug: 'pheasant-pot-pie',
    title: 'Pheasant Pot Pie',
    description: 'Classic comfort food with wild pheasant, seasonal vegetables, and a flaky butter crust.',
    category: 'Upland',
    cookTime: '1 hr',
    servings: 4,
    difficulty: 'Medium',
    date: '2026-02-05',
    readTime: '6 min read',
    content: `Pot pie is one of the best things you can make with wild pheasant. The birds are lean and can dry out if you're not careful, but braising the meat in a creamy sauce and baking it under a flaky crust solves that problem completely. The result is rich, savory comfort food that makes you feel like all those cold-weather walks through CRP grass were worth every step.

## Ingredients

- 2 pheasant breasts, bone-in (or 3-4 boneless thighs)
- 2 cups chicken broth
- 1 bay leaf
- 3 tbsp butter
- 1 medium yellow onion, diced
- 2 stalks celery, diced
- 2 carrots, peeled and diced
- 2 medium potatoes, peeled and cubed
- 3 tbsp all-purpose flour
- 1 cup whole milk
- 1/2 cup frozen peas
- 1 tsp fresh thyme leaves (or 1/2 tsp dried)
- 1/2 tsp garlic powder
- Kosher salt and black pepper to taste
- 1 sheet puff pastry, thawed (or homemade pie crust)
- 1 egg, beaten (for egg wash)

## Instructions

1. Place the pheasant breasts in a saucepan with the chicken broth and bay leaf. Bring to a simmer and poach gently for 20 minutes until cooked through. Remove the pheasant, let cool slightly, then shred the meat. Reserve the poaching broth.
2. Melt the butter in a large oven-safe skillet or Dutch oven over medium heat. Add the onion, celery, carrots, and potatoes. Cook for 6 to 8 minutes until the onion is soft.
3. Sprinkle the flour over the vegetables and stir for 1 minute to cook the raw flour taste out.
4. Slowly pour in the reserved poaching broth and milk, stirring constantly to avoid lumps. Bring to a simmer and cook until thickened, about 4 minutes.
5. Stir in the shredded pheasant, peas, thyme, garlic powder, salt, and pepper. Remove from heat.
6. Preheat oven to 400 degrees F.
7. Roll out the puff pastry and drape it over the top of the skillet, trimming the edges. Cut 3 small slits in the top for steam. Brush with beaten egg.
8. Bake for 25 to 30 minutes until the crust is golden brown and the filling is bubbling around the edges.

## Tips

**Poaching keeps pheasant moist.** Don't skip this step — it's the key to tender, juicy meat in the final pie. Direct baking would dry the lean breast meat out.

**Make individual pot pies** by dividing the filling into ramekins and topping each with a round of puff pastry. Same bake time, better presentation.

**You can substitute any upland bird** — quail, grouse, chukar, or even leftover roasted turkey. The recipe is forgiving as long as the meat is cooked and shredded before it goes in.`,
  },

  {
    slug: 'venison-jerky',
    title: 'Venison Jerky',
    description: 'Soy, Worcestershire, and black pepper marinade. Dehydrated to perfection for the blind.',
    category: 'Venison',
    cookTime: '8 hrs',
    servings: 8,
    difficulty: 'Easy',
    date: '2026-01-30',
    readTime: '4 min read',
    content: `Jerky is the ultimate hunting snack — lightweight, shelf-stable, and packed with protein. Making it from your own venison is simple, and once you've had homemade you'll never go back to store-bought. The key is slicing the meat thin and even, then marinating long enough for the flavor to penetrate all the way through.

## Ingredients

- 3 lbs venison (top round or eye of round work best), partially frozen for easier slicing
- 1/2 cup soy sauce
- 1/4 cup Worcestershire sauce
- 2 tbsp brown sugar
- 1 tbsp apple cider vinegar
- 1 tsp garlic powder
- 1 tsp onion powder
- 1 tsp smoked paprika
- 1 tsp coarsely ground black pepper
- 1/2 tsp red pepper flakes (optional)
- 1/2 tsp curing salt (Prague Powder #1) — optional but recommended for food safety

## Instructions

1. Trim all fat and silverskin from the venison. Fat doesn't dehydrate and will cause the jerky to spoil faster.
2. Place the trimmed meat in the freezer for 1 to 2 hours until firm but not frozen solid. This makes it much easier to slice.
3. Slice the meat against the grain into strips about 1/4 inch thick and 1 inch wide. Keep the thickness as consistent as possible so everything dries evenly.
4. Whisk together the soy sauce, Worcestershire, brown sugar, vinegar, garlic powder, onion powder, paprika, black pepper, red pepper flakes, and curing salt in a bowl.
5. Place the venison strips in a gallon zip-lock bag and pour the marinade over them. Seal, massage to coat, and refrigerate for 12 to 24 hours.
6. Remove the strips from the marinade and pat dry with paper towels. Lay them in a single layer on dehydrator trays without overlapping.
7. Dehydrate at 160 degrees F for 4 to 6 hours. The jerky is done when it bends and cracks but doesn't snap in half.
8. Let cool completely, then store in airtight bags or containers. Keeps for 2 to 3 weeks at room temperature, or months in the freezer.

## Tips

**Slice against the grain** for jerky that tears apart easily when you bite it. Slice with the grain if you want a chewier, tougher texture.

**Use curing salt** if you plan to store jerky at room temperature. It prevents bacterial growth during the drying process. Follow the package directions for the correct ratio.

**No dehydrator?** Use your oven at its lowest setting (usually 170 degrees) with the door cracked open. Place strips on wire racks over sheet pans. It takes about the same time.`,
  },

  {
    slug: 'goose-tacos',
    title: 'Goose Tacos',
    description: 'Slow-cooked goose with chipotle, pickled onions, and fresh cilantro on corn tortillas.',
    category: 'Waterfowl',
    cookTime: '3 hrs',
    servings: 4,
    difficulty: 'Easy',
    date: '2026-01-25',
    readTime: '5 min read',
    content: `Goose gets a bad reputation because people overcook it. The breast meat is dark, rich, and beefy — and when you braise it low and slow with chipotles, it shreds apart like the best barbacoa you've ever had. Pile it on warm corn tortillas with pickled red onions and fresh cilantro and you've got tacos that'll convert anyone who says they don't like wild game.

## Ingredients

- 4 Canada goose breast halves (about 2 lbs)
- 2 chipotle peppers in adobo sauce, chopped, plus 2 tbsp of the sauce
- 1 cup chicken broth
- 1/4 cup orange juice
- 3 cloves garlic, minced
- 1 tsp cumin
- 1 tsp oregano
- 1 tsp kosher salt
- Corn tortillas
- Fresh cilantro
- Crumbled cotija cheese
- Lime wedges

**For the pickled onions:**
- 1 large red onion, thinly sliced
- 1 cup apple cider vinegar
- 1/2 cup warm water
- 1 tbsp sugar
- 1 tsp kosher salt

## Instructions

1. Make the pickled onions first: combine vinegar, warm water, sugar, and salt in a jar. Stir until dissolved. Add the sliced red onion and press down to submerge. Refrigerate for at least 1 hour (the longer the better).
2. Season the goose breasts with cumin, oregano, and salt on all sides.
3. Sear the breasts in a hot skillet with a little oil for 2 minutes per side until browned. Transfer to a slow cooker or Dutch oven.
4. Add the chipotles, adobo sauce, chicken broth, orange juice, and garlic to the pot.
5. Cover and cook on low for 3 to 4 hours in a slow cooker (or 2.5 hours at 300 degrees in the oven) until the meat shreds easily with a fork.
6. Shred the goose directly in the braising liquid using two forks. Let it sit in the juices for 10 minutes to absorb the flavor.
7. Warm corn tortillas on a dry skillet or directly over a gas flame.
8. Build the tacos: shredded goose, pickled red onions, cilantro, cotija cheese, and a squeeze of lime.

## Tips

**Don't skip the sear.** Browning the breast meat before braising adds a layer of flavor that the slow cooker alone can't create.

**Orange juice is the secret.** The acid tenderizes the meat and the sweetness balances the smoky heat of the chipotles.

**This works with any dark-meat waterfowl** — Canada goose, specklebelly, snow goose, or even diver ducks. The long braise tenderizes even the toughest birds.`,
  },

  // ── NEW VENISON RECIPES (6) ───────────────────────────────────────────

  {
    slug: 'bacon-wrapped-venison-tenderloin',
    title: 'Bacon-Wrapped Venison Tenderloin',
    description: 'The tenderloins wrapped in thick-cut bacon, seared in cast iron, and finished with a balsamic glaze.',
    category: 'Venison',
    cookTime: '25 min',
    servings: 2,
    difficulty: 'Easy',
    date: '2026-02-14',
    readTime: '4 min read',
    content: `The tenderloins are the two small strips tucked inside the body cavity along the spine. Most people lose them during processing or toss them in the grind pile, which is a crime. They're the most tender cut on the deer — even more so than the backstrap. Wrapping them in bacon adds the fat that venison naturally lacks, and a quick balsamic glaze ties everything together.

## Ingredients

- 2 venison tenderloins (about 8-10 oz each), silverskin removed
- 6-8 slices thick-cut bacon
- 1 tsp garlic powder
- 1 tsp kosher salt
- 1/2 tsp black pepper
- 1/2 tsp dried rosemary, crushed
- 2 tbsp balsamic vinegar
- 1 tbsp honey
- 1 tbsp butter

## Instructions

1. Season the tenderloins with garlic powder, salt, pepper, and rosemary.
2. Wrap each tenderloin tightly with 3 to 4 slices of bacon, overlapping slightly. Secure with toothpicks if needed.
3. Heat a cast iron skillet over medium-high heat. Place the wrapped tenderloins seam-side down and sear for 2 to 3 minutes per side, turning to crisp the bacon on all sides. About 8 to 10 minutes total.
4. Transfer the skillet to a 400 degree oven and roast for 6 to 8 minutes until the internal temperature reaches 130 degrees F for medium-rare.
5. Remove and rest on a cutting board for 5 minutes.
6. While the meat rests, place the skillet back over medium heat. Add the balsamic vinegar and honey, stirring and scraping up any browned bits. Simmer for 1 minute, then swirl in the butter.
7. Slice the tenderloins into 1-inch medallions and drizzle with the balsamic glaze.

## Tips

**Don't overcook.** The tenderloins are small and lean — they go from perfect to dry in minutes. Use a thermometer and pull at 130 degrees.

**Thick-cut bacon works best** because it holds up during searing without burning before the meat is cooked. Thin bacon will crisp too fast.

**Save the tenderloins during processing.** Ask your butcher specifically for them, or remove them yourself before quartering. They're easy to miss if you're not looking for them.`,
  },

  {
    slug: 'venison-stew-root-vegetables',
    title: 'Venison Stew with Root Vegetables',
    description: 'A thick, hearty stew with chunks of venison, potatoes, carrots, and parsnips in a rich gravy.',
    category: 'Venison',
    cookTime: '2.5 hrs',
    servings: 6,
    difficulty: 'Easy',
    date: '2026-02-10',
    readTime: '5 min read',
    content: `A good venison stew is cold-weather perfection. The shoulder and neck meat that most people grind into burger is actually ideal for braising — the long, slow cook breaks down the connective tissue and turns tough cuts into fork-tender chunks. Pair it with root vegetables and a rich, thick gravy, and you've got a meal that warms you from the inside out.

## Ingredients

- 2 lbs venison stew meat (shoulder, neck, or shank), cut into 1.5-inch cubes
- 3 tbsp all-purpose flour
- 2 tbsp olive oil
- 2 tbsp butter
- 1 large yellow onion, diced
- 3 cloves garlic, minced
- 3 carrots, peeled and cut into thick rounds
- 2 parsnips, peeled and cubed
- 3 medium Yukon Gold potatoes, cubed
- 1 cup red wine
- 4 cups beef broth
- 2 tbsp tomato paste
- 2 bay leaves
- 1 tsp dried thyme
- 1 tsp kosher salt
- 1/2 tsp black pepper
- Fresh parsley for garnish

## Instructions

1. Toss the venison cubes with flour, salt, and pepper in a bowl until evenly coated.
2. Heat olive oil and 1 tablespoon of butter in a large Dutch oven over medium-high heat. Brown the venison in batches — don't crowd the pot. Sear each batch for 3 to 4 minutes until deep brown on all sides. Remove and set aside.
3. Add the remaining butter to the pot. Add the onion and cook for 4 minutes until softened. Add the garlic and tomato paste, stirring for 1 minute.
4. Pour in the red wine and scrape the bottom of the pot with a wooden spoon to deglaze. Let the wine simmer for 2 minutes.
5. Return the browned venison to the pot. Add the beef broth, bay leaves, and thyme. Bring to a boil, then reduce to a low simmer. Cover and cook for 1.5 hours.
6. Add the carrots, parsnips, and potatoes. Cover and continue simmering for 45 minutes to 1 hour until the vegetables are tender and the meat falls apart.
7. Remove the bay leaves. Taste and adjust seasoning. Ladle into bowls and garnish with fresh parsley.

## Tips

**Brown the meat properly.** This step creates the flavor base for the entire stew. Pat the cubes dry, don't crowd the pot, and let them sit without moving until they develop a deep brown crust.

**Use shoulder or neck meat.** These tougher cuts have more connective tissue, which melts during braising and creates a richer, thicker gravy. Backstrap would dry out here.

**This stew is better the next day.** The flavors meld overnight in the fridge. Reheat slowly on the stove.`,
  },

  {
    slug: 'venison-breakfast-sausage',
    title: 'Venison Breakfast Sausage',
    description: 'Homemade ground venison sausage patties seasoned with sage, maple, and a kick of red pepper.',
    category: 'Venison',
    cookTime: '20 min',
    servings: 8,
    difficulty: 'Easy',
    date: '2026-02-06',
    readTime: '4 min read',
    content: `If you've got ground venison in the freezer, you're ten minutes away from better breakfast sausage than anything you can buy at the store. The trick is adding fat back in — venison is too lean on its own for sausage, so mixing in ground pork or pork fat gives you the right texture and flavor. Season it with sage and a touch of maple syrup and you've got a Nebraska breakfast staple.

## Ingredients

- 2 lbs ground venison
- 1/2 lb ground pork (or pork fat)
- 2 tsp dried sage (rubbed, not ground)
- 1 tsp kosher salt
- 1 tsp black pepper
- 1/2 tsp garlic powder
- 1/2 tsp onion powder
- 1/4 tsp red pepper flakes
- 1/4 tsp dried thyme
- 1 tbsp maple syrup
- 1 tbsp apple cider vinegar

## Instructions

1. Combine the ground venison and ground pork in a large bowl.
2. Add the sage, salt, pepper, garlic powder, onion powder, red pepper flakes, thyme, maple syrup, and apple cider vinegar.
3. Mix with your hands until all the seasoning is evenly distributed. Don't overmix — you just want it combined.
4. Fry a small test patty in a skillet to taste for seasoning. Adjust salt or spices as needed.
5. Form the mixture into patties about 3 inches wide and 1/2 inch thick. You should get about 16 patties.
6. Cook the patties in a cast iron skillet over medium heat for 3 to 4 minutes per side until cooked through and browned.
7. Freeze uncooked patties in a single layer on a sheet pan, then transfer to freezer bags. They'll keep for 3 months.

## Tips

**The pork fat is essential.** Straight venison sausage crumbles and dries out. The 80/20 ratio of venison to pork gives you the right bind and juiciness.

**Fry a test patty** before you form the whole batch. Seasoning is personal — this recipe is a starting point. Some people want more sage, some want more heat.

**Freeze in bulk.** Make a huge batch and freeze individual patties. Pull them out the night before and you've got a 5-minute breakfast all hunting season long.`,
  },

  {
    slug: 'smoked-venison-summer-sausage',
    title: 'Smoked Venison Summer Sausage',
    description: 'A classic summer sausage with mustard seed, garlic, and a hint of smoke. Perfect with crackers and cheese.',
    category: 'Venison',
    cookTime: '6 hrs',
    servings: 10,
    difficulty: 'Medium',
    date: '2026-02-02',
    readTime: '6 min read',
    content: `Summer sausage is one of the best ways to use up a big batch of ground venison. It's shelf-stable, travels well, and pairs perfectly with crackers and cheese in the deer blind. The smoking process gives it a flavor that store-bought can't touch. This recipe makes about 5 pounds — enough to eat, share, and stash in the freezer.

## Ingredients

- 4 lbs ground venison
- 1 lb ground pork (or pork fat trimmings)
- 5 tsp Morton Tender Quick curing mix
- 2 tsp mustard seed
- 2 tsp coarsely ground black pepper
- 1.5 tsp garlic powder
- 1 tsp onion powder
- 1/2 tsp ground coriander
- 1/2 tsp red pepper flakes
- 1 cup cold water
- Collagen casings (2.5-inch diameter)

## Instructions

1. Mix the ground venison and pork together in a large bowl. Add the Tender Quick, mustard seed, pepper, garlic powder, onion powder, coriander, and red pepper flakes.
2. Pour in the cold water and mix thoroughly with your hands for 3 to 4 minutes until the mixture becomes tacky and sticky. This develops the proteins that bind the sausage together.
3. Cover and refrigerate for 24 hours. This curing period is essential for food safety and flavor development.
4. After 24 hours, remix the meat briefly. Stuff into collagen casings using a sausage stuffer, packing firmly to eliminate air pockets. Tie off the ends.
5. Preheat your smoker to 130 degrees F. Place the sausage logs on the grates and smoke for 1 hour with the damper open to dry the casings.
6. Increase the smoker temperature to 150 degrees for 1 hour.
7. Increase to 170 degrees for 1 hour.
8. Increase to 185 degrees and smoke until the internal temperature of the sausage reaches 160 degrees F. This usually takes another 2 to 3 hours.
9. Remove and immediately plunge into an ice bath for 15 minutes to stop the cooking and set the texture.
10. Pat dry, refrigerate overnight, then slice and serve.

## Tips

**The ice bath is critical.** Skipping it causes the fat to render out, leaving you with a dry, crumbly sausage with fat pockets on the surface.

**Use Tender Quick, not regular salt.** Tender Quick contains sodium nitrite, which prevents bacterial growth during the slow smoking process. Regular salt will not cure the meat.

**Step up the smoker temperature gradually.** Jumping straight to high heat causes fat-out — the fat melts and separates before the proteins can set, ruining the texture.`,
  },

  {
    slug: 'venison-stroganoff',
    title: 'Venison Stroganoff',
    description: 'Tender sliced venison in a creamy mushroom sauce served over egg noodles.',
    category: 'Venison',
    cookTime: '35 min',
    servings: 4,
    difficulty: 'Easy',
    date: '2026-01-28',
    readTime: '4 min read',
    content: `Stroganoff is a weeknight dinner that feels like a weekend meal. Thin strips of venison seared fast and hot, tossed in a creamy mushroom sauce, and piled over buttery egg noodles. The whole thing comes together in 30 minutes, which makes it perfect for busy evenings during hunting season when you've got more venison than time.

## Ingredients

- 1.5 lbs venison sirloin or backstrap, sliced into thin strips (1/4 inch thick)
- 8 oz egg noodles
- 8 oz cremini mushrooms, sliced
- 1 medium yellow onion, thinly sliced
- 3 cloves garlic, minced
- 1 cup beef broth
- 3/4 cup sour cream
- 2 tbsp Dijon mustard
- 2 tbsp butter
- 2 tbsp olive oil
- 2 tbsp all-purpose flour
- 1 tsp Worcestershire sauce
- 1 tsp kosher salt
- 1/2 tsp black pepper
- Fresh parsley, chopped

## Instructions

1. Cook the egg noodles according to package directions. Drain and toss with a pat of butter. Set aside.
2. Heat olive oil in a large skillet over high heat until it shimmers. Season the venison strips with salt and pepper. Sear in a single layer for 1 to 2 minutes per side until browned but still pink inside. Work in batches to avoid crowding. Transfer to a plate.
3. Reduce heat to medium. Add the butter, onions, and mushrooms. Cook for 5 to 6 minutes until the mushrooms are golden and the onions are soft. Add the garlic and cook 1 minute more.
4. Sprinkle the flour over the vegetables and stir for 1 minute. Pour in the beef broth and Worcestershire sauce, stirring to deglaze the pan. Simmer for 3 minutes until thickened.
5. Remove the pan from heat. Stir in the sour cream and Dijon mustard until smooth. Return the venison strips and any accumulated juices to the pan. Toss gently to coat.
6. Serve immediately over the egg noodles, garnished with fresh parsley.

## Tips

**Sear the venison fast.** High heat, thin strips, don't move them for a full minute. You want a brown crust on the outside with pink inside. If you cook them through at this stage, they'll be tough in the final dish.

**Add the sour cream off the heat.** If you add it to a boiling pan, it curdles and separates. Take the pan off the burner, stir it in, then gently warm everything back through.

**Use backstrap or sirloin.** These tender cuts work best for quick-searing. Tougher cuts like shoulder need long braising — they won't be tender enough in this 30-minute recipe.`,
  },

  {
    slug: 'venison-burgers-caramelized-onions',
    title: 'Venison Burgers with Caramelized Onions',
    description: 'Juicy smash-style venison burgers topped with caramelized onions and aged cheddar.',
    category: 'Venison',
    cookTime: '30 min',
    servings: 4,
    difficulty: 'Easy',
    date: '2026-01-22',
    readTime: '4 min read',
    content: `The biggest complaint about venison burgers is that they're dry. That's because people treat them like beef burgers, and straight venison is too lean for that. The fix is simple: mix in a little pork fat or bacon, and use the smash technique on a screaming hot griddle. You get a crispy, lacey crust on the outside and a juicy center. Top with slow caramelized onions and sharp cheddar and you've got a burger that beats any restaurant.

## Ingredients

- 1.5 lbs ground venison
- 1/2 lb ground pork (or finely diced bacon)
- 1 tsp kosher salt
- 1/2 tsp black pepper
- 1/2 tsp garlic powder
- 4 slices aged white cheddar cheese
- 4 brioche buns, toasted

**For the caramelized onions:**
- 2 large yellow onions, thinly sliced
- 2 tbsp butter
- 1 tbsp olive oil
- Pinch of salt
- 1 tsp brown sugar (optional)

**Optional toppings:** pickles, yellow mustard, lettuce, tomato

## Instructions

1. Start the caramelized onions first — they take time. Heat butter and olive oil in a skillet over medium-low heat. Add the onions and a pinch of salt. Cook for 25 to 30 minutes, stirring occasionally, until deep golden brown and sweet. Add the brown sugar in the last 5 minutes if desired.
2. While the onions cook, combine the ground venison, ground pork, salt, pepper, and garlic powder. Mix gently — don't overwork it. Divide into 4 balls (about 6 oz each).
3. Heat a cast iron skillet or flat griddle over high heat until it's smoking hot. Place a ball of meat on the griddle and immediately smash it flat with a heavy spatula or burger press. Press hard — you want it thin with rough, lacy edges.
4. Season the top with a pinch of salt. Cook without moving for 2 to 3 minutes until a deep brown crust forms on the bottom.
5. Flip, immediately add a slice of cheddar, and cook for 1 to 2 minutes more. The cheese should melt from the residual heat.
6. Place on toasted brioche buns and top with a generous pile of caramelized onions and your choice of toppings.

## Tips

**Smash hard and thin.** The smash technique maximizes the surface area touching the hot griddle, which means more crust and more flavor. Don't press after the first smash — you'll squeeze out juices.

**Mix in pork fat.** A 75/25 venison-to-pork ratio mimics the fat content of an 80/20 beef burger. Without it, venison burgers crumble and dry out.

**Use a very hot surface.** Cast iron or a flat-top griddle cranked to high. You need enough heat to create a Maillard reaction (browning) in 2 to 3 minutes. A medium-heat pan steams the meat instead.`,
  },

  // ── NEW WATERFOWL RECIPES (7) ─────────────────────────────────────────

  {
    slug: 'smoked-whole-duck',
    title: 'Smoked Whole Duck',
    description: 'A whole wild duck smoked low and slow with a maple-soy brine and apple wood.',
    category: 'Waterfowl',
    cookTime: '4 hrs',
    servings: 2,
    difficulty: 'Medium',
    date: '2026-02-13',
    readTime: '5 min read',
    content: `Smoking a whole wild duck is a different experience from farm-raised birds. Wild ducks are leaner, smaller, and more flavorful — the dark meat has a richness that pairs perfectly with smoke. A maple-soy brine adds moisture and flavor that the lean meat needs, and apple wood gives a mild, fruity smoke that doesn't overpower the natural taste of the bird.

## Ingredients

- 2 whole wild ducks (mallard, pintail, or gadwall), plucked and cleaned
- Apple wood chunks for smoking

**For the brine:**
- 4 cups cold water
- 1/4 cup kosher salt
- 1/4 cup maple syrup
- 1/4 cup soy sauce
- 2 tbsp brown sugar
- 1 tsp black peppercorns
- 3 cloves garlic, smashed
- 2 bay leaves
- 1 orange, quartered

## Instructions

1. Combine all brine ingredients in a large pot and stir until the salt and sugar dissolve. Add the ducks, breast-side down. If needed, add more water to fully submerge. Refrigerate for 12 to 24 hours.
2. Remove the ducks from the brine and pat completely dry with paper towels. Let them air dry in the refrigerator uncovered for 2 to 4 hours. This dries the skin, which helps it crisp during smoking.
3. Preheat your smoker to 250 degrees F with apple wood chunks.
4. Place the ducks breast-side up on the grate. Insert a probe thermometer into the thickest part of the breast.
5. Smoke for 3 to 4 hours until the internal temperature reaches 165 degrees F in the thigh and 145 degrees in the breast. The skin should be mahogany brown.
6. Rest for 10 minutes before carving. Serve the breast meat sliced and the leg and thigh meat pulled.

## Tips

**Brine is non-negotiable for wild duck.** Without it, the lean meat dries out during the long smoke. The brine adds moisture and seasons the meat all the way through.

**Air-dry the skin.** This step makes the difference between flabby, rubbery skin and crispy, rendered skin. Even a couple hours uncovered in the fridge helps.

**Wild duck breast is best at medium** (145 degrees), while the legs and thighs need to go to 165 to break down the connective tissue. Check both spots with your thermometer.`,
  },

  {
    slug: 'duck-poppers',
    title: 'Duck Poppers',
    description: 'Jalapeño halves stuffed with cream cheese and duck, wrapped in bacon, and grilled until crispy.',
    category: 'Waterfowl',
    cookTime: '30 min',
    servings: 6,
    difficulty: 'Easy',
    date: '2026-02-09',
    readTime: '4 min read',
    content: `Duck poppers are the universal tailgate and camp appetizer. Every waterfowl hunter has a version, and they're all good because the combination of duck, jalapeño, cream cheese, and bacon is basically foolproof. They take 10 minutes to assemble and 20 minutes on the grill. Make twice as many as you think you need — they disappear fast.

## Ingredients

- 4 duck breast halves, sliced into strips (about 1/2 inch wide by 2 inches long)
- 12 large jalapeño peppers, halved lengthwise and seeded
- 8 oz cream cheese, softened
- 1 cup shredded pepper jack cheese
- 1 lb thin-cut bacon, each slice cut in half
- 1 tsp garlic powder
- 1/2 tsp onion powder
- Toothpicks

## Instructions

1. Mix the cream cheese, pepper jack, garlic powder, and onion powder in a bowl until combined.
2. Spoon the cheese mixture into each jalapeño half, filling the cavity.
3. Place a strip of duck breast on top of the cheese filling in each jalapeño.
4. Wrap each stuffed jalapeño tightly with a half slice of bacon. Secure with a toothpick.
5. Preheat the grill to medium heat (about 375 degrees) or set up for indirect cooking.
6. Place the poppers on the grill grate and cook for 18 to 22 minutes, turning occasionally, until the bacon is crispy and the jalapeños are tender.
7. Remove from the grill and let cool for 5 minutes before serving — the cheese is molten hot.

## Tips

**Use a spoon to scrape out the jalapeño seeds and membranes.** That's where most of the heat is. Leave a few seeds in if you want more kick.

**Thin-cut bacon crisps better** in the time it takes to cook the poppers through. Thick-cut bacon may still be limp when the jalapeños are done.

**These work great in the oven too.** Bake at 400 degrees on a wire rack over a sheet pan for 25 minutes. The rack lets air circulate underneath for even crispiness.`,
  },

  {
    slug: 'goose-pastrami',
    title: 'Goose Pastrami',
    description: 'Cured and smoked goose breast with a black pepper and coriander bark. Better than the deli.',
    category: 'Waterfowl',
    cookTime: '7 days',
    servings: 6,
    difficulty: 'Hard',
    date: '2026-02-04',
    readTime: '6 min read',
    content: `Goose pastrami might be the single best thing you can make from a Canada goose. The curing process transforms the dark, beefy breast meat into something that rivals — and honestly surpasses — any deli pastrami. It takes about a week of curing and a half day of smoking, but the actual hands-on time is minimal. Stack it on rye bread with mustard and you won't believe it came from a bird.

## Ingredients

- 4 Canada goose breast halves (about 2 lbs total)

**For the cure:**
- 1/4 cup kosher salt
- 2 tbsp brown sugar
- 1 tbsp Prague Powder #1 (curing salt)
- 2 tsp coarsely ground black pepper
- 2 tsp ground coriander
- 1 tsp garlic powder
- 1 tsp onion powder
- 1/2 tsp ground allspice

**For the bark (applied after curing):**
- 3 tbsp coarsely ground black pepper
- 2 tbsp ground coriander
- 1 tsp garlic powder
- 1 tsp brown sugar

## Instructions

1. Mix all cure ingredients in a bowl. Rub the cure generously on all sides of the goose breasts.
2. Place the breasts in a zip-lock bag or vacuum-seal them. Refrigerate for 5 to 7 days, flipping the bag daily to redistribute the cure.
3. After curing, remove the breasts and rinse thoroughly under cold water for 2 to 3 minutes to remove excess salt. Pat dry.
4. Soak the cured breasts in cold water for 1 hour to further reduce saltiness. Change the water halfway through.
5. Pat dry again and place uncovered on a wire rack in the refrigerator for 4 to 8 hours to form a tacky surface called a pellicle. This helps the smoke adhere.
6. Mix the bark ingredients and press firmly onto all surfaces of the cured breasts.
7. Preheat your smoker to 225 degrees F with cherry or oak wood.
8. Smoke until the internal temperature reaches 160 degrees F, about 2 to 3 hours.
9. Remove and let cool. Wrap tightly and refrigerate overnight for the best slicing texture.
10. Slice paper-thin against the grain and serve on rye bread with spicy brown mustard.

## Tips

**Don't skip the soak.** The cure makes the meat very salty. Soaking for an hour pulls out excess salt while keeping the cured flavor and pink color.

**The pellicle is important.** That tacky surface that forms in the fridge is what smoke particles cling to. Without it, the smoke flavor is weak and the surface stays wet.

**Slice as thin as possible.** Goose pastrami is dense — thick slices are tough to chew. A sharp knife at a low angle, or an electric slicer if you have one, makes a huge difference.`,
  },

  {
    slug: 'duck-fried-rice',
    title: 'Duck Fried Rice',
    description: 'Leftover duck meat stir-fried with day-old rice, vegetables, soy sauce, and a fried egg on top.',
    category: 'Waterfowl',
    cookTime: '20 min',
    servings: 4,
    difficulty: 'Easy',
    date: '2026-01-31',
    readTime: '4 min read',
    content: `This is the best use for leftover duck. The dark, rich meat adds a depth of flavor that chicken or pork fried rice can't match, and if you've got rendered duck fat from a previous cook, using that instead of vegetable oil takes it over the top. The secret to great fried rice is day-old rice — fresh rice is too moist and steams instead of frying.

## Ingredients

- 2 cups cooked duck meat, shredded or chopped (any species)
- 4 cups day-old cooked white rice, cold from the fridge
- 3 tbsp rendered duck fat (or vegetable oil)
- 3 eggs, beaten
- 1 cup frozen peas and carrots, thawed
- 4 green onions, sliced (whites and greens separated)
- 3 cloves garlic, minced
- 3 tbsp soy sauce
- 1 tbsp sesame oil
- 1 tsp rice vinegar
- Sriracha or chili oil for serving (optional)

## Instructions

1. Heat 1 tablespoon of duck fat in a large wok or skillet over high heat. Add the beaten eggs and scramble quickly, breaking into small pieces. Remove and set aside.
2. Add the remaining duck fat to the wok over high heat. Add the green onion whites and garlic. Stir-fry for 30 seconds.
3. Add the cold rice, pressing it flat against the wok and letting it sit for 30 seconds to develop a crust before tossing. Repeat several times over 3 to 4 minutes until the rice is hot and slightly crispy in spots.
4. Add the duck meat, peas and carrots, soy sauce, sesame oil, and rice vinegar. Toss everything together for 2 minutes.
5. Add the scrambled eggs back in and toss to combine.
6. Serve immediately, topped with sliced green onion greens and sriracha if desired.

## Tips

**Use cold, day-old rice.** Freshly cooked rice has too much moisture and turns mushy in the wok. Spread cooked rice on a sheet pan in the fridge overnight for the best texture.

**High heat is essential.** You need the wok screaming hot to get that slightly smoky, charred flavor called wok hei. Don't stir constantly — let the rice sit and crisp for 30 seconds between tosses.

**Rendered duck fat is liquid gold.** Save it every time you cook duck. It stores in the fridge for months and adds incredible flavor to anything you fry or roast.`,
  },

  {
    slug: 'snow-goose-jerky',
    title: 'Snow Goose Jerky',
    description: 'Thin-sliced snow goose breast marinated in teriyaki and black pepper. A blind-bag essential.',
    category: 'Waterfowl',
    cookTime: '8 hrs',
    servings: 6,
    difficulty: 'Easy',
    date: '2026-01-26',
    readTime: '4 min read',
    content: `Snow geese are the most underrated table bird in waterfowl hunting. Most hunters shoot limits during the conservation order and then wonder what to do with all that dark meat. Jerky is the answer. The breast meat is lean, which is exactly what you want for jerky, and a teriyaki marinade masks any gaminess while keeping the meat sweet and savory. Make a huge batch during spring conservation season and you'll have snacks for months.

## Ingredients

- 3 lbs snow goose breast, trimmed and partially frozen
- 1/2 cup soy sauce
- 1/4 cup teriyaki sauce
- 2 tbsp honey
- 1 tbsp rice vinegar
- 1 tsp garlic powder
- 1 tsp onion powder
- 1 tsp ground ginger
- 1 tsp coarsely ground black pepper
- 1/2 tsp red pepper flakes
- 1/2 tsp curing salt (Prague Powder #1)

## Instructions

1. Trim all fat and silverskin from the goose breasts. Place in the freezer for 1 to 2 hours until firm but not frozen solid.
2. Slice the meat against the grain into strips about 1/4 inch thick. Consistency is key for even drying.
3. Whisk together the soy sauce, teriyaki, honey, rice vinegar, garlic powder, onion powder, ginger, pepper, red pepper flakes, and curing salt.
4. Place the goose strips in a zip-lock bag, pour the marinade over them, and refrigerate for 12 to 24 hours.
5. Remove the strips and pat dry. Arrange in a single layer on dehydrator trays.
6. Dehydrate at 160 degrees F for 5 to 7 hours until the strips bend and crack but don't snap in half.
7. Cool completely and store in airtight containers.

## Tips

**Snow goose can taste stronger than Canada goose.** The teriyaki and honey marinade works well here because the sweetness balances the stronger flavor of the meat.

**Soak in cold water first if the birds are spring-season birds.** Spring snow geese that have been feeding on agricultural fields can have a mild grassy taste. A 2-hour soak in cold salted water helps mellow it.

**Make it in bulk.** If you're going to run the dehydrator, fill every tray. Jerky freezes perfectly and thaws in minutes.`,
  },

  {
    slug: 'teal-skewers-teriyaki',
    title: 'Teal Skewers with Teriyaki Glaze',
    description: 'Bite-sized teal breast pieces grilled on skewers with peppers, onions, and a sticky teriyaki glaze.',
    category: 'Waterfowl',
    cookTime: '25 min',
    servings: 4,
    difficulty: 'Easy',
    date: '2026-01-20',
    readTime: '4 min read',
    content: `Teal are small ducks, and the breast meat on a green-wing or blue-wing isn't much bigger than a couple of bites. That makes them perfect for skewers — cube the meat, thread it on a stick with peppers and onions, and grill it fast over high heat with a teriyaki glaze. The small pieces cook in minutes and stay juicy, and the sweet-salty glaze caramelizes into a sticky coating that makes these disappear off the plate.

## Ingredients

- 12-16 teal breast halves (about 1.5 lbs), cut into 1-inch cubes
- 1 large red bell pepper, cut into 1-inch squares
- 1 large green bell pepper, cut into 1-inch squares
- 1 red onion, cut into 1-inch squares and separated into layers
- Wooden or metal skewers (soak wooden ones for 30 minutes)

**For the teriyaki glaze:**
- 1/3 cup soy sauce
- 2 tbsp honey
- 1 tbsp brown sugar
- 1 tbsp rice vinegar
- 1 tsp sesame oil
- 1 tsp cornstarch mixed with 1 tbsp cold water
- 1 clove garlic, minced
- 1/2 tsp ground ginger
- Sesame seeds for garnish

## Instructions

1. Make the glaze: combine the soy sauce, honey, brown sugar, rice vinegar, sesame oil, garlic, and ginger in a small saucepan over medium heat. Bring to a simmer. Stir in the cornstarch slurry and cook for 1 minute until thickened. Set aside.
2. Thread the teal cubes, peppers, and onions onto skewers, alternating between meat and vegetables.
3. Preheat the grill to high heat (450 to 500 degrees).
4. Brush the skewers with a light coating of the teriyaki glaze.
5. Grill for 2 to 3 minutes per side, brushing with more glaze each time you turn. Total cook time is about 6 to 8 minutes. The teal should be medium to medium-rare inside.
6. Remove from the grill, brush with a final coat of glaze, and sprinkle with sesame seeds. Serve immediately.

## Tips

**Don't overcook teal.** The pieces are small and cook fast. Medium-rare to medium is the target — pull them when the outside is glazed and caramelized but the center is still pink.

**Cut everything the same size.** Uniform pieces cook at the same rate, so the vegetables are tender and the meat is done at the same time.

**These work great as appetizers.** Thread 2 to 3 pieces of meat per skewer for single-serving appetizers at a tailgate or cookout.`,
  },

  {
    slug: 'duck-gumbo',
    title: 'Duck Gumbo',
    description: 'A rich, dark roux gumbo loaded with wild duck, andouille sausage, and the holy trinity.',
    category: 'Waterfowl',
    cookTime: '2.5 hrs',
    servings: 8,
    difficulty: 'Medium',
    date: '2026-01-16',
    readTime: '6 min read',
    content: `Gumbo is the perfect vehicle for wild duck. The dark roux creates a rich, savory base, the andouille adds smokiness, and the duck meat — braised low and slow until it falls apart — melts into the whole thing. This is a Louisiana classic adapted for the freezer full of ducks that every waterfowl hunter accumulates by January. It feeds a crowd and tastes even better reheated the next day.

## Ingredients

- 6-8 wild duck breast halves (or 3-4 whole ducks, broken down)
- 1 lb andouille sausage, sliced into rounds
- 3/4 cup vegetable oil
- 3/4 cup all-purpose flour
- 1 large yellow onion, diced
- 2 stalks celery, diced
- 1 green bell pepper, diced
- 4 cloves garlic, minced
- 6 cups chicken stock
- 1 can (14 oz) diced tomatoes
- 2 bay leaves
- 1 tsp dried thyme
- 1 tsp cayenne pepper (adjust to taste)
- 1 tsp kosher salt
- 1/2 tsp black pepper
- 1 lb okra, sliced (fresh or frozen) — optional
- Cooked white rice for serving
- Sliced green onions and file powder for garnish

## Instructions

1. Season the duck pieces with salt, pepper, and cayenne. Sear in a hot skillet with a splash of oil until browned on both sides. Set aside.
2. Make the roux: in a large Dutch oven or heavy-bottomed pot, combine the vegetable oil and flour over medium heat. Stir constantly with a wooden spoon or whisk for 30 to 45 minutes until the roux reaches a dark chocolate brown color. This is the foundation of the gumbo — don't rush it, and don't stop stirring.
3. Once the roux is dark brown, immediately add the onion, celery, and bell pepper (the holy trinity). Stir vigorously — the vegetables will stop the roux from cooking further. Cook for 5 minutes until softened.
4. Add the garlic and cook for 1 minute.
5. Slowly pour in the chicken stock, stirring constantly to incorporate the roux. Add the diced tomatoes, bay leaves, and thyme.
6. Add the seared duck pieces and andouille sausage. Bring to a boil, then reduce to a low simmer. Cover and cook for 1.5 to 2 hours until the duck is tender and falls apart.
7. Remove the duck, shred the meat, discard any bones, and return the meat to the pot. Add the okra if using and simmer for 15 more minutes.
8. Taste and adjust seasoning. Serve over white rice, topped with green onions and a sprinkle of file powder.

## Tips

**The roux makes or breaks the gumbo.** A light roux tastes like flour. A properly dark roux — the color of dark chocolate — adds a deep, nutty, slightly smoky flavor that's irreplaceable. It takes patience, but it's the entire foundation of the dish.

**Don't walk away from the roux.** 30 to 45 minutes of constant stirring. If it burns (black specks), you have to start over. No shortcuts.

**Any wild duck works here.** Mallard, teal, gadwall, pintail, wood duck — even diver ducks like bluebills and canvasbacks. The long braise tenderizes everything.`,
  },

  // ── NEW RABBIT RECIPES (6) ────────────────────────────────────────────

  {
    slug: 'southern-fried-rabbit',
    title: 'Southern Fried Rabbit',
    description: 'Buttermilk-soaked rabbit pieces fried golden in a seasoned flour coating. True country cooking.',
    category: 'Rabbit',
    cookTime: '1 hr',
    servings: 4,
    difficulty: 'Medium',
    date: '2026-02-11',
    readTime: '5 min read',
    content: `Fried rabbit is old-school country cooking at its finest. Before chicken became the default, rabbit was what families fried up for Sunday dinner. The meat is leaner and more delicate than chicken with a mild, slightly sweet flavor. A buttermilk soak tenderizes the meat and adds tang, while a double-dredge flour coating fries up thick and crunchy. If you've never fried rabbit, you're in for a surprise — most people prefer it to chicken.

## Ingredients

- 2 whole cottontail rabbits, cleaned and cut into serving pieces (front legs, back legs, saddle/loin pieces)
- 2 cups buttermilk
- 2 cups all-purpose flour
- 1 tsp garlic powder
- 1 tsp onion powder
- 1 tsp smoked paprika
- 1 tsp kosher salt
- 1/2 tsp black pepper
- 1/2 tsp cayenne pepper
- Vegetable oil or peanut oil for frying (enough for 2 inches in the pan)

## Instructions

1. Soak the rabbit pieces in buttermilk in a bowl or zip-lock bag. Refrigerate for at least 4 hours, preferably overnight. This tenderizes the meat and removes any gaminess.
2. Mix the flour, garlic powder, onion powder, paprika, salt, pepper, and cayenne in a shallow dish.
3. Remove the rabbit from the buttermilk, shaking off excess. Dredge each piece in the seasoned flour, pressing to coat. Shake off excess, dip back in the buttermilk briefly, then dredge in the flour again for a double coating.
4. Heat oil in a large cast iron skillet or Dutch oven to 325 degrees F. Don't go higher — rabbit is lean and cooks faster than chicken, so a moderate temp gives you golden coating without drying out the meat.
5. Fry the rabbit pieces in batches for 6 to 8 minutes per side until golden brown and the internal temperature reaches 160 degrees F. The back legs take the longest; the loin pieces cook faster.
6. Drain on a wire rack set over a sheet pan. Let rest for 5 minutes before serving.

## Tips

**325 degrees, not 350.** Rabbit is smaller and leaner than chicken. A slightly lower frying temperature gives the coating time to crisp without overcooking the meat.

**The buttermilk soak is essential.** It tenderizes the lean meat and adds flavor. Don't skip it or shorten it — overnight is best.

**Double dredge** for a thicker, crunchier coating. The second dip in buttermilk and flour creates ridges and layers that fry up extra crispy.`,
  },

  {
    slug: 'braised-rabbit-mustard-cream',
    title: 'Braised Rabbit with Mustard Cream Sauce',
    description: 'Rabbit pieces braised in white wine and finished with a Dijon mustard cream sauce.',
    category: 'Rabbit',
    cookTime: '1.5 hrs',
    servings: 4,
    difficulty: 'Medium',
    date: '2026-02-07',
    readTime: '5 min read',
    content: `This is French country cooking adapted for wild Nebraska cottontails. Braising is the ideal method for rabbit because the low, slow heat keeps the lean meat moist while the white wine and cream sauce adds richness. The Dijon mustard cuts through the cream with a sharp, tangy bite that pairs beautifully with the mild meat. Serve it with crusty bread to soak up the sauce.

## Ingredients

- 2 whole rabbits, cut into serving pieces
- 3 tbsp butter
- 1 tbsp olive oil
- 1 medium yellow onion, diced
- 2 shallots, minced
- 3 cloves garlic, minced
- 1 cup dry white wine (Chardonnay or Sauvignon Blanc)
- 1 cup chicken broth
- 3 tbsp Dijon mustard
- 3/4 cup heavy cream
- 2 sprigs fresh thyme
- 1 bay leaf
- 1 tbsp fresh tarragon, chopped (or 1 tsp dried)
- Kosher salt and black pepper
- Fresh parsley for garnish

## Instructions

1. Season the rabbit pieces generously with salt and pepper.
2. Heat the butter and olive oil in a large Dutch oven over medium-high heat. Brown the rabbit on all sides in batches, about 3 minutes per side. Remove and set aside.
3. Reduce heat to medium. Add the onion and shallots to the pot and cook for 4 minutes until softened. Add the garlic and cook 1 minute more.
4. Pour in the white wine and scrape the bottom of the pot to deglaze. Let it reduce by half, about 3 minutes.
5. Add the chicken broth, thyme, bay leaf, and 1 tablespoon of the Dijon mustard. Stir to combine.
6. Return the rabbit pieces to the pot. The liquid should come about halfway up the meat. Bring to a simmer, cover, and cook on low heat for 1 hour until the rabbit is tender and the meat pulls easily from the bone.
7. Remove the rabbit to a serving platter. Discard the thyme stems and bay leaf.
8. Over medium heat, stir the remaining 2 tablespoons of Dijon mustard and the heavy cream into the braising liquid. Simmer for 3 to 4 minutes until the sauce thickens slightly. Add the tarragon.
9. Spoon the sauce over the rabbit and garnish with parsley.

## Tips

**Use a dry white wine** — something you'd drink, not cooking wine. The alcohol cooks off but the flavor stays, and cheap cooking wine adds a harsh, vinegar-like taste.

**Add the cream off the boil.** Heavy cream can break if it boils too hard. Lower the heat to medium and stir it in gently.

**Serve with something that soaks up the sauce.** Crusty bread, egg noodles, mashed potatoes, or polenta all work perfectly.`,
  },

  {
    slug: 'rabbit-stew-dumplings',
    title: 'Rabbit Stew with Dumplings',
    description: 'Tender rabbit simmered in a savory broth with root vegetables and fluffy drop dumplings.',
    category: 'Rabbit',
    cookTime: '2 hrs',
    servings: 6,
    difficulty: 'Easy',
    date: '2026-02-03',
    readTime: '5 min read',
    content: `Rabbit stew with dumplings is the kind of meal that's been feeding hunting families for generations. The rabbit simmers low and slow until the meat falls off the bone, the vegetables thicken the broth, and then fluffy drop dumplings steam on top until they puff up into pillowy clouds. It's simple, it's filling, and it's one of the best things you can make on a cold Nebraska evening.

## Ingredients

**For the stew:**
- 2 whole rabbits, cut into serving pieces
- 3 tbsp butter
- 1 large yellow onion, diced
- 3 carrots, peeled and sliced into rounds
- 3 stalks celery, sliced
- 3 medium potatoes, peeled and cubed
- 4 cloves garlic, minced
- 6 cups chicken broth
- 1 tsp dried thyme
- 1 bay leaf
- 1 tsp kosher salt
- 1/2 tsp black pepper
- 2 tbsp all-purpose flour mixed with 2 tbsp softened butter (beurre manie)

**For the dumplings:**
- 2 cups all-purpose flour
- 1 tbsp baking powder
- 1 tsp kosher salt
- 3 tbsp cold butter, cut into small pieces
- 3/4 cup whole milk
- 1 tbsp fresh parsley, chopped

## Instructions

1. Season the rabbit pieces with salt and pepper. Melt butter in a large Dutch oven over medium-high heat. Brown the rabbit on all sides in batches. Remove and set aside.
2. Add the onion, carrots, and celery to the pot. Cook for 5 minutes until softened. Add the garlic and cook 1 minute more.
3. Pour in the chicken broth. Add the thyme, bay leaf, and browned rabbit pieces. Bring to a boil, then reduce to a low simmer. Cover and cook for 1 hour.
4. Remove the rabbit, pull the meat from the bones, and return the meat to the pot. Discard the bones and bay leaf. Add the potatoes and simmer for 15 minutes.
5. Stir in the beurre manie (flour-butter mixture) a little at a time until the broth thickens to your liking.
6. Make the dumplings: whisk the flour, baking powder, and salt together. Cut in the cold butter with a fork or pastry cutter until it resembles coarse crumbs. Stir in the milk and parsley until just combined. Don't overmix.
7. Drop the dumpling dough by heaping tablespoons onto the surface of the simmering stew. Cover tightly and cook for 15 minutes without lifting the lid. The dumplings steam from the top — lifting the lid releases the steam and they won't cook through.
8. Serve in deep bowls.

## Tips

**Don't lift the lid** while the dumplings are cooking. They cook by steam, and opening the pot drops the temperature and lets the steam escape. Set a timer for 15 minutes and walk away.

**The beurre manie thickens without lumps.** Mixing flour and butter into a paste before adding it to the broth prevents the clumping you get from sprinkling raw flour into liquid.

**Rabbit bones make great stock.** Save them and simmer with aromatics for 3 to 4 hours. Use the stock as the base for your next stew.`,
  },

  {
    slug: 'slow-cooker-rabbit-tacos',
    title: 'Slow Cooker Rabbit Tacos',
    description: 'Rabbit slow-cooked with cumin, lime, and green chiles. Shredded and piled on tortillas.',
    category: 'Rabbit',
    cookTime: '4 hrs',
    servings: 4,
    difficulty: 'Easy',
    date: '2026-01-27',
    readTime: '4 min read',
    content: `The slow cooker is the rabbit hunter's best friend. Drop in the pieces in the morning, set it on low, and come home to meat that shreds with a fork. This recipe uses a green chile and lime braising liquid that gives the rabbit a bright, fresh flavor — different from the heavy, dark braises most people default to. The shredded meat piles perfectly onto tortillas with avocado, pickled onions, and a squeeze of lime.

## Ingredients

- 2 whole rabbits, cut into pieces
- 1 can (4 oz) diced green chiles
- 1/2 cup chicken broth
- Juice of 2 limes
- 3 cloves garlic, minced
- 1 tsp cumin
- 1 tsp chili powder
- 1/2 tsp oregano
- 1 tsp kosher salt
- 1/2 tsp black pepper
- Small flour or corn tortillas
- Diced avocado
- Pickled red onions
- Fresh cilantro
- Cotija cheese
- Lime wedges

## Instructions

1. Place the rabbit pieces in the slow cooker.
2. In a small bowl, mix the green chiles, chicken broth, lime juice, garlic, cumin, chili powder, oregano, salt, and pepper. Pour over the rabbit.
3. Cook on low for 6 to 8 hours or high for 3 to 4 hours until the meat falls off the bone.
4. Remove the rabbit, shred the meat with two forks, and discard the bones. Return the shredded meat to the slow cooker and stir into the juices. Let it sit on warm for 15 minutes to absorb the liquid.
5. Warm the tortillas. Build tacos with the shredded rabbit, avocado, pickled onions, cilantro, cotija, and a squeeze of lime.

## Tips

**Low and slow is better than high and fast.** The low setting gives the connective tissue more time to break down, resulting in more tender, shreddable meat.

**Save the braising liquid.** After shredding, let the meat sit in the juices — it reabsorbs moisture and flavor. Dry taco meat usually means the juices got discarded.

**Cottontail vs. jackrabbit:** Cottontails are smaller and more tender. Jackrabbits are larger and tougher — add an extra hour of cook time for jackrabbit.`,
  },

  {
    slug: 'grilled-rabbit-herb-butter',
    title: 'Grilled Rabbit with Herb Butter',
    description: 'Marinated rabbit pieces grilled over charcoal and basted with a rosemary-thyme compound butter.',
    category: 'Rabbit',
    cookTime: '45 min',
    servings: 4,
    difficulty: 'Medium',
    date: '2026-01-18',
    readTime: '5 min read',
    content: `Grilling rabbit takes a little more attention than chicken because the lean meat dries out faster, but the payoff is worth it. The key is marinating, moderate heat, and basting with compound butter as it cooks. The butter melts over the hot meat, adding fat and flavor with every pass. Charcoal adds a smoky element that brings out the best in wild rabbit. This is the recipe that convinces skeptics.

## Ingredients

- 2 whole rabbits, cut into serving pieces (front legs, back legs, saddle)
- Olive oil for marinating

**For the marinade:**
- 1/4 cup olive oil
- Juice of 1 lemon
- 3 cloves garlic, minced
- 1 tsp dried rosemary
- 1 tsp dried thyme
- 1 tsp kosher salt
- 1/2 tsp black pepper

**For the herb butter:**
- 1/2 cup (1 stick) salted butter, softened
- 1 tbsp fresh rosemary, finely chopped
- 1 tbsp fresh thyme leaves
- 2 cloves garlic, minced
- 1/2 tsp lemon zest
- Pinch of red pepper flakes

## Instructions

1. Combine all marinade ingredients. Place the rabbit pieces in a zip-lock bag, pour the marinade over them, and refrigerate for 4 to 8 hours.
2. Make the herb butter: mix the softened butter with rosemary, thyme, garlic, lemon zest, and red pepper flakes. Roll into a log in plastic wrap and refrigerate until firm. Slice into rounds before grilling.
3. Set up your grill for two-zone cooking — hot coals on one side, empty on the other. Target temperature around 375 degrees.
4. Remove the rabbit from the marinade and pat dry. Place on the hot side of the grill to sear for 2 to 3 minutes per side until you get good grill marks.
5. Move the pieces to the cooler side of the grill. Place a round of herb butter on each piece. Close the lid and cook for 15 to 20 minutes, flipping once and adding more butter halfway through. The internal temperature should reach 160 degrees F.
6. Let rest for 5 minutes before serving. Top with any remaining herb butter.

## Tips

**Two-zone grilling is critical** for rabbit. Direct high heat the entire time will dry out the lean meat. Sear for color and flavor, then finish on the cool side to cook through gently.

**Baste with butter often.** The herb butter is doing two jobs — adding fat to the lean meat and flavoring it. Be generous.

**Back legs take longer than front legs.** Start the back legs a few minutes earlier, or move them to the hotter zone while the front legs finish on the cooler side.`,
  },

  {
    slug: 'rabbit-wild-mushroom-risotto',
    title: 'Rabbit and Wild Mushroom Risotto',
    description: 'Creamy Arborio rice with braised rabbit, wild mushrooms, Parmesan, and fresh herbs.',
    category: 'Rabbit',
    cookTime: '1.5 hrs',
    servings: 4,
    difficulty: 'Medium',
    date: '2026-01-12',
    readTime: '5 min read',
    content: `Risotto takes patience and attention, but the result is one of the most elegant things you can make with rabbit. The braised meat is pulled from the bone and stirred into creamy Arborio rice with sauteed wild mushrooms and Parmesan. The starch from the rice creates a velvety sauce that clings to every grain. This is the recipe you make when you want to impress someone — or when you just want to eat really, really well.

## Ingredients

- 1 whole rabbit, cut into pieces
- 4 cups chicken broth (plus more as needed)
- 1 cup dry white wine (divided)
- 8 oz mixed wild mushrooms (chanterelle, oyster, shiitake), sliced
- 1.5 cups Arborio rice
- 1 medium yellow onion, finely diced
- 3 cloves garlic, minced
- 3 tbsp butter (divided)
- 2 tbsp olive oil
- 1/2 cup freshly grated Parmesan cheese
- 1 tbsp fresh thyme leaves
- 1 tbsp fresh parsley, chopped
- Kosher salt and black pepper to taste

## Instructions

1. Season the rabbit pieces with salt and pepper. Heat 1 tablespoon of olive oil and 1 tablespoon of butter in a Dutch oven over medium-high heat. Brown the rabbit on all sides. Add 1/2 cup of white wine and 2 cups of chicken broth. Cover and simmer for 45 minutes until tender. Remove the rabbit, pull the meat from the bones, and shred. Reserve the braising liquid.
2. In a separate saucepan, combine the reserved braising liquid with the remaining 2 cups of chicken broth. Keep warm over low heat.
3. In a large, wide skillet or saucepan, heat 1 tablespoon of olive oil and 1 tablespoon of butter over medium-high heat. Add the mushrooms and cook for 5 to 6 minutes until golden. Season with salt and set aside.
4. In the same pan, add the remaining butter. Cook the onion for 4 minutes until soft. Add the garlic and cook 1 minute.
5. Add the Arborio rice and stir for 2 minutes until the grains are toasted and translucent around the edges.
6. Pour in the remaining 1/2 cup of white wine and stir until absorbed.
7. Begin adding the warm broth one ladle at a time, stirring frequently. Wait until each addition is mostly absorbed before adding the next. This process takes about 18 to 20 minutes.
8. When the rice is creamy and al dente (tender with a slight bite in the center), stir in the shredded rabbit, sauteed mushrooms, Parmesan, and thyme. Adjust seasoning.
9. Serve immediately, garnished with parsley and extra Parmesan.

## Tips

**Stir frequently but not constantly.** You want to agitate the rice enough to release starch, but you don't need to stand over it every second. Stir every 30 to 45 seconds.

**Use warm broth.** Adding cold broth shocks the rice and slows the cooking. Keeping it warm on the side means consistent temperature and even cooking.

**Risotto waits for no one.** It starts setting up the moment it comes off heat. Serve it immediately — it should flow slowly across the plate, not sit in a mound.`,
  },

  // ── NEW SQUIRREL RECIPES (6) ──────────────────────────────────────────

  {
    slug: 'buttermilk-fried-squirrel',
    title: 'Buttermilk Fried Squirrel',
    description: 'Classic Southern buttermilk-brined squirrel, double-dredged and fried to golden perfection.',
    category: 'Squirrel',
    cookTime: '1 hr',
    servings: 4,
    difficulty: 'Medium',
    date: '2026-02-12',
    readTime: '5 min read',
    content: `Fried squirrel is arguably the original American fried meat — settlers were frying squirrel long before the chicken tender was invented. The meat is darker and richer than chicken, with a nutty, slightly sweet flavor that comes from the squirrel's diet of acorns, hickory nuts, and walnuts. A buttermilk brine softens the texture of the lean meat, and a seasoned flour double-dredge creates a crackling crust.

## Ingredients

- 4 squirrels, cleaned and cut into serving pieces (front legs, back legs, saddle)
- 2 cups buttermilk
- 2 tsp hot sauce (optional)
- 2 cups all-purpose flour
- 1 tsp garlic powder
- 1 tsp smoked paprika
- 1 tsp kosher salt
- 1/2 tsp black pepper
- 1/2 tsp onion powder
- 1/4 tsp cayenne pepper
- Peanut oil or vegetable oil for frying

**For the gravy (optional):**
- 3 tbsp pan drippings
- 3 tbsp all-purpose flour
- 2 cups whole milk
- Salt and pepper to taste

## Instructions

1. Combine the buttermilk and hot sauce in a large bowl. Add the squirrel pieces, cover, and refrigerate for at least 4 hours, ideally overnight.
2. Parboil the squirrel first for tender results: place the pieces in a pot, cover with water, bring to a boil, then simmer for 20 minutes. This par-cooks the meat and ensures the inside is done before the coating burns. Drain and pat dry.
3. Mix the flour with garlic powder, paprika, salt, pepper, onion powder, and cayenne.
4. Remove squirrel from buttermilk, dredge in seasoned flour, dip back in buttermilk, then dredge again for a double coating.
5. Heat oil in a cast iron skillet to 325 degrees F (about 2 inches deep).
6. Fry in batches for 4 to 5 minutes per side until golden brown and crispy. Internal temperature should reach 165 degrees F.
7. Rest on a wire rack for 5 minutes.
8. For gravy: pour off all but 3 tablespoons of pan drippings. Whisk in flour and cook for 1 minute. Slowly add milk, whisking constantly. Simmer until thickened. Season to taste.

## Tips

**Parboiling is the key to perfect fried squirrel.** Squirrel meat is tougher than chicken and takes longer to cook through. Without parboiling, the coating burns before the meat is done. A 20-minute simmer solves this problem completely.

**Older squirrels need more time.** A young squirrel from early season is more tender than a late-season adult. If the meat is tough, extend the parboil to 30 minutes.

**Make the gravy.** Those pan drippings have all the flavor from the seasoned flour and the meat. A quick milk gravy over biscuits with the fried squirrel is pure country comfort food.`,
  },

  {
    slug: 'squirrel-and-dumplings',
    title: 'Squirrel and Dumplings',
    description: 'Squirrel simmered until fork-tender in a savory broth with fluffy homemade dumplings.',
    category: 'Squirrel',
    cookTime: '2 hrs',
    servings: 6,
    difficulty: 'Easy',
    date: '2026-02-08',
    readTime: '5 min read',
    content: `Squirrel and dumplings is one of the oldest recipes in American hunting culture. It's the small game version of chicken and dumplings, and honestly, it's better — the dark, rich squirrel meat has more flavor than chicken, and it cooks into a broth that's savory and satisfying. The fluffy drop dumplings soak up the broth and round out the meal into something that sticks to your ribs on a cold day.

## Ingredients

**For the stew:**
- 4 squirrels, cleaned and left whole or halved
- 6 cups water or chicken broth
- 1 large yellow onion, quartered
- 2 carrots, cut into chunks
- 2 stalks celery, cut into chunks
- 3 cloves garlic, smashed
- 2 bay leaves
- 1 tsp dried thyme
- 1 tsp kosher salt
- 1/2 tsp black pepper
- 2 tbsp butter
- 2 tbsp all-purpose flour

**For the dumplings:**
- 1.5 cups all-purpose flour
- 2 tsp baking powder
- 1/2 tsp kosher salt
- 3 tbsp cold butter, cut into pieces
- 2/3 cup whole milk

## Instructions

1. Place the whole squirrels in a large pot with the water or broth, onion, carrots, celery, garlic, bay leaves, thyme, salt, and pepper. Bring to a boil, then reduce to a low simmer. Cover and cook for 1 to 1.5 hours until the meat easily pulls from the bones.
2. Remove the squirrels and let cool enough to handle. Pull all the meat from the bones, shredding into bite-sized pieces. Discard the bones. Strain the broth through a fine-mesh strainer and return it to the pot. You should have about 4 to 5 cups — add water if needed.
3. In a small bowl, mash the butter and flour together into a paste. Whisk this into the simmering broth a little at a time until the broth thickens to a light gravy consistency.
4. Return the shredded squirrel meat to the pot.
5. Make the dumplings: whisk the flour, baking powder, and salt. Cut in the cold butter with a fork until pea-sized crumbs form. Stir in the milk until just combined.
6. Drop the dumpling dough by rounded tablespoons onto the surface of the simmering stew. Cover tightly and cook for 15 minutes without lifting the lid.
7. Serve in deep bowls.

## Tips

**Simmer, don't boil.** A hard boil toughens the meat. Keep the liquid at a gentle simmer — you should see small bubbles, not a rolling boil.

**Strain the broth.** The onion, celery, and garlic break down during the long simmer and leave debris. Straining gives you a clean, smooth base for the dumplings.

**Watch out for small bones.** Squirrels have tiny rib bones and vertebrae that can hide in the meat. Go through the shredded meat carefully before adding it back to the pot.`,
  },

  {
    slug: 'cajun-squirrel-stew',
    title: 'Cajun Squirrel Stew',
    description: 'A rich, dark Cajun stew with squirrel, andouille sausage, peppers, and a spicy roux base.',
    category: 'Squirrel',
    cookTime: '2.5 hrs',
    servings: 6,
    difficulty: 'Medium',
    date: '2026-02-01',
    readTime: '5 min read',
    content: `Down in Louisiana, squirrel stew is a hunting camp staple. The dark meat holds up to bold Cajun spices, and the long, slow braise turns even an older, tougher squirrel into tender, pull-apart pieces. This version starts with a dark roux — cooked low and slow until it's the color of peanut butter — then layers in the holy trinity, andouille sausage, and squirrel. Serve it over rice and you've got a meal that'll make you rethink everything you thought about squirrel.

## Ingredients

- 4-6 squirrels, cut into serving pieces
- 1/2 lb andouille sausage, sliced
- 1/3 cup vegetable oil
- 1/3 cup all-purpose flour
- 1 large yellow onion, diced
- 1 green bell pepper, diced
- 2 stalks celery, diced
- 4 cloves garlic, minced
- 4 cups chicken broth
- 1 can (14 oz) diced tomatoes
- 2 bay leaves
- 1 tsp dried thyme
- 1 tsp cayenne pepper
- 1 tsp smoked paprika
- 1 tsp kosher salt
- 1/2 tsp black pepper
- Hot sauce to taste
- Cooked white rice for serving
- Sliced green onions for garnish

## Instructions

1. Season the squirrel pieces with salt, pepper, cayenne, and paprika. Heat a tablespoon of oil in a Dutch oven over medium-high heat. Brown the squirrel on all sides in batches. Set aside.
2. Brown the andouille sausage slices in the same pot. Set aside with the squirrel.
3. Make the roux: add the vegetable oil and flour to the pot. Reduce heat to medium-low and stir constantly for 20 to 30 minutes until the roux reaches a dark peanut butter color. Don't stop stirring — a burnt roux ruins the dish.
4. Add the onion, bell pepper, and celery to the roux. Stir vigorously for 5 minutes until the vegetables soften and the roux stops darkening.
5. Add the garlic and stir for 1 minute.
6. Slowly pour in the chicken broth, stirring constantly to incorporate the roux smoothly. Add the diced tomatoes, bay leaves, and thyme.
7. Return the browned squirrel and sausage to the pot. Bring to a boil, then reduce to a low simmer. Cover and cook for 1.5 to 2 hours until the squirrel is fall-off-the-bone tender.
8. Remove the squirrel, pull the meat from the bones, and return to the stew. Adjust seasoning with salt, pepper, and hot sauce.
9. Serve over white rice with green onions on top.

## Tips

**The roux takes patience.** Constant stirring over medium-low heat for 20 to 30 minutes. A dark roux adds a nutty depth that's the backbone of this stew. If you see black specks, the roux burned and you'll need to start over.

**Squirrel bones are small.** When pulling the meat off the bones, go slowly and feel for tiny rib bones and vertebrae. They're easy to miss.

**This stew is better the next day.** Like most braised dishes, the flavors meld and deepen overnight. Make it Saturday, eat it Sunday.`,
  },

  {
    slug: 'squirrel-pot-pie',
    title: 'Squirrel Pot Pie',
    description: 'A comforting pot pie filled with braised squirrel, root vegetables, and a golden puff pastry crust.',
    category: 'Squirrel',
    cookTime: '2 hrs',
    servings: 4,
    difficulty: 'Medium',
    date: '2026-01-24',
    readTime: '5 min read',
    content: `Pot pie is one of the most forgiving recipes for small game. The squirrel is braised until tender, then the shredded meat joins carrots, peas, and potatoes in a thick cream gravy under a golden puff pastry lid. It's warm, filling comfort food that uses up several squirrels in a single dish. If you can make chicken pot pie, you can make squirrel pot pie — the technique is identical, and the flavor is arguably better.

## Ingredients

- 4 squirrels, cleaned and left whole
- 4 cups water or chicken broth (for braising)
- 3 tbsp butter
- 1 medium yellow onion, diced
- 2 carrots, peeled and diced
- 2 stalks celery, diced
- 2 medium potatoes, peeled and cubed
- 1/2 cup frozen peas
- 3 tbsp all-purpose flour
- 1.5 cups reserved braising broth
- 1/2 cup heavy cream
- 1 tsp dried thyme
- 1/2 tsp garlic powder
- Kosher salt and black pepper to taste
- 1 sheet puff pastry, thawed
- 1 egg, beaten (for egg wash)

## Instructions

1. Place the squirrels in a pot with water or broth. Bring to a simmer and cook for 1 to 1.5 hours until the meat pulls easily from the bones. Remove the squirrels and let cool. Pull all meat from the bones and shred. Reserve 1.5 cups of the braising broth.
2. Preheat oven to 400 degrees F.
3. Melt butter in a large oven-safe skillet over medium heat. Add the onion, carrots, celery, and potatoes. Cook for 8 minutes until slightly softened.
4. Sprinkle the flour over the vegetables and stir for 1 minute.
5. Pour in the reserved broth and cream. Stir until the sauce thickens, about 3 to 4 minutes. Add the thyme, garlic powder, salt, and pepper.
6. Stir in the shredded squirrel meat and frozen peas. Remove from heat.
7. Drape the puff pastry over the top of the skillet. Trim edges and press to seal against the rim. Cut 3 slits in the top for steam. Brush with beaten egg.
8. Bake for 25 to 30 minutes until the pastry is puffed and golden and the filling is bubbling.

## Tips

**Braise the squirrels whole.** It's easier to remove meat from whole carcasses after braising than from pre-cut pieces. The bones and joints hold together and the meat slides right off.

**Thicken the filling properly.** The filling should be thick enough to coat a spoon before you add the pastry lid. If it's too thin, the pot pie will be soupy when you cut into it.

**Individual ramekins** make great single-serving pot pies. Divide the filling, top each with a pastry round, and bake at the same temperature for the same time.`,
  },

  {
    slug: 'brunswick-stew-squirrel',
    title: 'Brunswick Stew with Squirrel',
    description: 'A Southern classic loaded with squirrel, lima beans, corn, and a sweet tomato-based broth.',
    category: 'Squirrel',
    cookTime: '3 hrs',
    servings: 8,
    difficulty: 'Easy',
    date: '2026-01-14',
    readTime: '5 min read',
    content: `Brunswick stew is one of the great Southern small game traditions. Both Virginia and Georgia claim to have invented it, but the one thing everyone agrees on is that it was originally made with squirrel. The sweet, tomato-based broth with lima beans, corn, and potatoes is thick and hearty — somewhere between a stew and a thick soup. It feeds a crowd, freezes well, and gets better every time you reheat it.

## Ingredients

- 4-6 squirrels, cleaned and left whole
- 6 cups water
- 1 large yellow onion, diced
- 3 medium potatoes, peeled and cubed
- 1 can (28 oz) crushed tomatoes
- 1 can (15 oz) lima beans, drained
- 2 cups corn kernels (frozen or cut from the cob)
- 1/4 cup ketchup
- 2 tbsp apple cider vinegar
- 2 tbsp Worcestershire sauce
- 1 tbsp brown sugar
- 1 tsp kosher salt
- 1 tsp black pepper
- 1/2 tsp cayenne pepper
- 1/2 tsp liquid smoke (optional)
- Hot sauce to taste

## Instructions

1. Place the whole squirrels in a large pot and cover with 6 cups of water. Bring to a boil, then reduce to a simmer. Cook for 1 to 1.5 hours until the meat falls off the bones.
2. Remove the squirrels and let cool. Pull all meat from the bones and shred into small pieces. Reserve the cooking broth in the pot.
3. Add the onion and potatoes to the broth. Simmer for 15 minutes until the potatoes start to soften.
4. Add the crushed tomatoes, lima beans, corn, ketchup, vinegar, Worcestershire, brown sugar, salt, pepper, cayenne, and liquid smoke.
5. Return the shredded squirrel meat to the pot. Stir well.
6. Simmer uncovered for 1 to 1.5 hours, stirring occasionally, until the stew thickens and the potatoes break down slightly, naturally thickening the broth.
7. Adjust seasoning with salt, pepper, and hot sauce. Serve in bowls with cornbread on the side.

## Tips

**Let the potatoes break down.** As they simmer, some of the potato cubes will dissolve into the broth, creating a natural thickener. This is by design — don't add a separate thickener.

**The sweet-tangy balance is key.** The ketchup, brown sugar, and vinegar create a flavor profile similar to barbecue sauce. Taste as you go and adjust — more vinegar for tang, more sugar for sweetness.

**This is a big-batch recipe.** Brunswick stew freezes beautifully. Make the full recipe and freeze in quart containers for easy meals later.`,
  },

  {
    slug: 'squirrel-confit',
    title: 'Squirrel Confit',
    description: 'Squirrel legs slow-cooked in oil until meltingly tender. An elevated preparation for small game.',
    category: 'Squirrel',
    cookTime: '4 hrs',
    servings: 4,
    difficulty: 'Hard',
    date: '2026-01-08',
    readTime: '5 min read',
    content: `Confit is a French technique that involves curing meat in salt, then cooking it slowly — submerged in fat — until it becomes meltingly tender. It's traditionally done with duck, but it works brilliantly with squirrel. The slow, low-temperature cooking breaks down the tough connective tissue in the legs and thighs without drying out the lean meat. The result is rich, silky, and falling-off-the-bone tender — a world away from the tough, chewy squirrel that gives the animal a bad name in the kitchen.

## Ingredients

- 8-12 squirrel legs and thighs (from 4-6 squirrels)
- 2 tbsp kosher salt
- 1 tsp black pepper
- 4 cloves garlic, smashed
- 4 sprigs fresh thyme
- 2 bay leaves
- 1 tsp juniper berries, lightly crushed (optional)
- Olive oil (enough to fully submerge the legs, about 3-4 cups)
- Flaky sea salt for finishing

## Instructions

1. Toss the squirrel legs with kosher salt, pepper, smashed garlic, thyme, bay leaves, and juniper berries. Place in a container, cover, and refrigerate for 12 to 24 hours. This dry cure seasons the meat deeply and draws out moisture.
2. After curing, rinse the legs briefly under cold water and pat very dry with paper towels.
3. Preheat your oven to 250 degrees F.
4. Place the squirrel legs in a single layer in a deep oven-safe dish or Dutch oven. Pour olive oil over the legs until they're fully submerged.
5. Cover tightly with a lid or foil. Place in the oven and cook for 3 to 4 hours until the meat is extremely tender and pulls easily from the bone. The oil should never bubble — if it does, lower the oven temperature.
6. Remove from the oven and let the legs cool in the oil for 30 minutes.
7. To serve: remove the legs from the oil and sear skin-side down in a hot skillet for 2 to 3 minutes to crisp the exterior. Finish with a pinch of flaky sea salt.

## Tips

**The oil should never simmer.** Confit is not deep frying. The temperature of the oil should stay around 200 to 225 degrees — hot enough to slowly cook the meat, but not hot enough to fry it. If you see bubbles, your oven is too hot.

**Store the confit for weeks.** After cooking, keep the legs submerged in the oil in a sealed container in the fridge. They'll keep for 2 to 3 weeks. The oil preserves the meat — that's the original purpose of confit.

**Use the leftover oil.** Strain it and use it for sauteing vegetables, frying potatoes, or starting your next confit. It's infused with garlic, thyme, and meat flavor.`,
  },
]

export function getRecipeBySlug(slug: string): RecipePost | undefined {
  return recipes.find((r) => r.slug === slug)
}

export function getRecipesByCategory(category: string): RecipePost[] {
  if (category === 'All') return recipes
  return recipes.filter((r) => r.category === category)
}
