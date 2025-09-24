// remediesData.js

import honeyginger from "../assets/honeyginger.jpeg"; 

const remedies = [
  {
      "id": 1,
      "title": "Honey Ginger Tea",
      "image": "https://i.ibb.co/dJBdk71N/honeyginger.jpg",
      "for": "Cold and Sore Throat",
      "ingredients": ["Fresh Ginger", "Raw Honey", "Lemon Juice", "Hot Water"],
      "frequency": "2-3 times daily",
      "benefits": [
        "Soothes sore throat",
        "Boosts immunity",
        "Reduces inflammation",
        "Aids digestion"
      ],
      "preparation": [
        "Grate fresh ginger into a cup",
        "Pour hot water over ginger",
        "Let steep for 5 minutes",
        "Strain and add honey and lemon",
        "Stir well before drinking"
      ],
      "usage": "Drink 2-3 times daily while symptoms persist",
      "precautions": "Avoid if allergic to honey. Not suitable for children under 1 year"
    },
    {
      "id": 2,
      "title": "Turmeric Face Mask",
      "image": "https://i.ibb.co/d0r5NwM8/turmeric-milk.jpg",
      "for": "Acne and Dark Spots",
      "ingredients": ["Turmeric Powder", "Chickpea Flour", "Rose Water", "Yogurt"],
      "frequency": "2-3 times weekly",
      "benefits": [
        "Reduces acne and inflammation",
        "Lightens dark spots",
        "Brightens skin tone",
        "Exfoliates dead skin cells"
      ],
      "preparation": [
        "Mix 1 tsp turmeric powder with 2 tbsp chickpea flour",
        "Add rose water and yogurt to make a smooth paste",
        "Apply evenly on clean face",
        "Leave for 15-20 minutes",
        "Rinse off with warm water"
      ],
      "usage": "Apply 2-3 times weekly for best results",
      "precautions": "Turmeric may temporarily stain skin. Do a patch test first."
    },
    {
      "id": 3,
      "title": "Aloe Vera Face Mask",
      "image": "https://i.ibb.co/0yvLtwJH/alovera.jpg",
      "for": "Acne and Skin Irritation",
      "ingredients": ["Fresh Aloe Vera Gel", "Honey", "Lemon Juice"],
      "frequency": "2-3 times weekly",
      "benefits": [
        "Soothes skin irritation",
        "Reduces acne and redness",
        "Moisturizes skin",
        "Minimizes pores"
      ],
      "preparation": [
        "Extract fresh gel from aloe vera leaf",
        "Mix 2 tbsp aloe gel with 1 tsp honey",
        "Add a few drops of lemon juice",
        "Apply to clean face and neck",
        "Leave for 20 minutes then rinse"
      ],
      "usage": "Apply 2-3 times weekly for acne-prone skin",
      "precautions": "Lemon juice may cause sensitivity to sunlight. Avoid sun exposure after use."
    },
    {
      "id": 4,
      "title": "Cinnamon Honey Mix",
      "image": "https://i.ibb.co/YgPKh99/cinnamon-honey.jpg",
      "for": "Cough and Congestion",
      "ingredients": ["Cinnamon Powder", "Raw Honey", "Warm Water"],
      "frequency": "Twice daily",
      "benefits": [
        "Relieves cough",
        "Reduces congestion",
        "Fights infections",
        "Soothes throat"
      ],
      "preparation": [
        "Mix 1/2 tsp cinnamon powder with 1 tbsp honey",
        "Add to a cup of warm water",
        "Stir until well combined",
        "Drink while warm"
      ],
      "usage": "Take twice daily until symptoms improve",
      "precautions": "Not recommended for people with liver problems"
    },
    {
      "id": 5,
      "title": "Apple Cider Vinegar Tonic",
      "image": "https://i.ibb.co/cSM8bDnW/apple-cider-vinegar.jpg",
      "for": "Digestive Issues",
      "ingredients": ["Apple Cider Vinegar", "Water", "Honey"],
      "frequency": "Once daily",
      "benefits": [
        "Improves digestion",
        "Balances pH levels",
        "Supports weight management",
        "Boosts energy"
      ],
      "preparation": [
        "Mix 1-2 tbsp apple cider vinegar in a glass of water",
        "Add honey to taste",
        "Stir well until combined"
      ],
      "usage": "Drink once daily before meals",
      "precautions": "Always dilute with water to prevent enamel erosion"
    },
    {
      "id": 6,
      "title": "Salt Water Gargle",
      "image": "https://i.ibb.co/fVnrZJxX/salt-water-gargle.jpg",
      "for": "Sore Throat",
      "ingredients": ["Sea Salt", "Warm Water"],
      "frequency": "3-4 times daily",
      "benefits": [
        "Reduces throat inflammation",
        "Loosens mucus",
        "Kills bacteria",
        "Soothes pain"
      ],
      "preparation": [
        "Dissolve 1/2 tsp salt in a glass of warm water",
        "Gargle for 30 seconds",
        "Spit out the solution"
      ],
      "usage": "Gargle 3-4 times daily until symptoms improve",
      "precautions": "Do not swallow the salt water"
    },
    {
      "id": 7,
      "title": "Oatmeal Bath",
      "image": "https://i.ibb.co/VcDRbQZ1/Oatmeal-Bath.jpg",
      "for": "Skin Irritation",
      "ingredients": ["Colloidal Oatmeal", "Warm Water"],
      "frequency": "As needed",
      "benefits": [
        "Soothes itchy skin",
        "Reduces inflammation",
        "Moisturizes dry skin",
        "Calms eczema"
      ],
      "preparation": [
        "Grind oats into a fine powder",
        "Add 1 cup to warm bath water",
        "Soak for 15-20 minutes",
        "Pat dry gently"
      ],
      "usage": "Use as needed for irritated skin",
      "precautions": "Test on small skin area first if you have allergies"
    },
    {
      "id": 8,
      "title": "Peppermint Tea",
      "image": "https://i.ibb.co/pj3X0HM7/peppermint-tea.jpg",
      "for": "Headache and Indigestion",
      "ingredients": ["Fresh Peppermint Leaves", "Hot Water", "Honey"],
      "frequency": "2-3 times daily",
      "benefits": [
        "Relieves headaches",
        "Eases digestion",
        "Reduces nausea",
        "Calms nerves"
      ],
      "preparation": [
        "Steep fresh peppermint leaves in hot water",
        "Cover and let steep for 5-7 minutes",
        "Strain and add honey if desired"
      ],
      "usage": "Drink 2-3 times daily as needed",
      "precautions": "Not recommended for people with GERD"
    },
    {
      "id": 9,
      "title": "Coconut Oil Hair Mask",
      "image": "https://i.ibb.co/ZRvZbYPn/coco.jpg",
      "for": "Dry Hair and Scalp",
      "ingredients": ["Coconut Oil", "Essential Oils (optional)"],
      "frequency": "Once weekly",
      "benefits": [
        "Moisturizes dry hair",
        "Reduces dandruff",
        "Promotes hair growth",
        "Adds shine"
      ],
      "preparation": [
        "Warm 2-3 tbsp coconut oil",
        "Apply to hair and scalp",
        "Cover with shower cap",
        "Leave for 30-60 minutes",
        "Shampoo as usual"
      ],
      "usage": "Apply once weekly for best results",
      "precautions": "May be too heavy for fine or oily hair types"
    }
  

];

export default remedies;
