// FlixMind Movie Database and Synthetic Ratings Data

export const MOVIES_DATA = [
  // === SCI-FI & SPACE ===
  {
    id: 1,
    title: "Interstellar",
    genres: ["Sci-Fi", "Drama", "Adventure"],
    year: 2014,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    rating: 4.8,
    popularity: 98,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth faces a global agricultural collapse. A mind-bending journey across time, gravity, and deep space dimensions.",
    tags: ["space", "wormhole", "time travel", "gravity", "survival", "black hole", "father-daughter", "quantum physics", "dystopian", "cinematic"],
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Martian",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    year: 2015,
    director: "Ridley Scott",
    cast: ["Matt Damon", "Jessica Chastain", "Kristen Wiig"],
    rating: 4.6,
    popularity: 92,
    description: "An astronaut becomes stranded on Mars after his team assumes him dead, and must rely on his ingenuity and scientific expertise to find a way to signal to Earth that he is alive and survive in the barren environment.",
    tags: ["space", "mars", "survival", "science", "astronaut", "ingenuity", "isolation", "nasa", "botany"],
    backdropUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Blade Runner 2049",
    genres: ["Sci-Fi", "Action", "Drama"],
    year: 2017,
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
    rating: 4.5,
    popularity: 89,
    description: "A new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. His discovery leads him on a quest to find Rick Deckard, a former blade runner who has been missing for 30 years.",
    tags: ["cyberpunk", "artificial intelligence", "dystopian", "replicant", "detective", "neon", "existential", "future", "identity"],
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Arrival",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    year: 2016,
    director: "Denis Villeneuve",
    cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker"],
    rating: 4.7,
    popularity: 91,
    description: "A linguist is recruited by the military to communicate with alien immigrants who have arrived on Earth in twelve mysterious spacecraft. She races to decode their complex circular language before global war erupts.",
    tags: ["alien", "linguistics", "time travel", "communication", "peace", "government", "mind-bending", "first contact", "memory"],
    backdropUrl: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Ex Machina",
    genres: ["Sci-Fi", "Thriller", "Drama"],
    year: 2014,
    director: "Alex Garland",
    cast: ["Domhnall Gleeson", "Alicia Vikander", "Oscar Isaac"],
    rating: 4.4,
    popularity: 87,
    description: "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligent life by evaluating the human qualities of a highly advanced humanoid A.I. robot at a secluded mountain retreat.",
    tags: ["artificial intelligence", "robot", "manipulation", "consciousness", "experiment", "turing test", "isolated", "technology", "mind-game"],
    backdropUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop"
  },

  // === ACTION & THRILLER ===
  {
    id: 6,
    title: "The Dark Knight",
    genres: ["Action", "Crime", "Drama"],
    year: 2008,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    rating: 4.9,
    popularity: 99,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    tags: ["superhero", "joker", "gotham", "crime", "justice", "vigilante", "chaos", "tragedy", "corruption", "action-packed"],
    backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Inception",
    genres: ["Action", "Sci-Fi", "Adventure"],
    year: 2010,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    rating: 4.8,
    popularity: 97,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., leading to a multi-layered subconscious heist.",
    tags: ["dreams", "heist", "subconscious", "mind-bending", "time distortion", "grief", "architect", "gravity-defying", "puzzle"],
    backdropUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Mad Max: Fury Road",
    genres: ["Action", "Adventure", "Sci-Fi"],
    year: 2015,
    director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
    rating: 4.7,
    popularity: 95,
    description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
    tags: ["post-apocalyptic", "desert", "car chase", "survival", "rebellion", "high-octane", "action-packed", "dystopian", "feminism"],
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 9,
    title: "John Wick",
    genres: ["Action", "Thriller", "Crime"],
    year: 2014,
    director: "Chad Stahelski",
    cast: ["Keanu Reeves", "Michael Nyqvist", "Alfie Allen"],
    rating: 4.5,
    popularity: 93,
    description: "An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and stole his car, triggering a relentless, stylish, and neon-drenched revenge spree through an underworld assassin guild.",
    tags: ["assassin", "revenge", "gun-fu", "dog", "underworld", "neo-noir", "action-packed", "relentless", "mafia"],
    backdropUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 10,
    title: "Sicario",
    genres: ["Crime", "Drama", "Thriller"],
    year: 2015,
    director: "Denis Villeneuve",
    cast: ["Emily Blunt", "Benicio del Toro", "Josh Brolin"],
    rating: 4.5,
    popularity: 88,
    description: "An idealistic FBI agent is enlisted by a government task force to aid in the escalating war against drugs at the border area between the U.S. and Mexico, plunging her into a morally gray covert operations vortex.",
    tags: ["cartel", "border", "fbi", "cia", "ambush", "morality", "covert ops", "suspense", "military"],
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop"
  },

  // === DRAMA & CLASSICS ===
  {
    id: 11,
    title: "The Shawshank Redemption",
    genres: ["Drama", "Crime"],
    year: 1994,
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    rating: 4.9,
    popularity: 98,
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency, endurance, and a brilliant, long-term escape plan.",
    tags: ["prison", "friendship", "hope", "escape", "corruption", "justice", "decency", "classic", "emotional"],
    backdropUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 12,
    title: "The Godfather",
    genres: ["Crime", "Drama"],
    year: 1972,
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    rating: 4.9,
    popularity: 96,
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son, Michael, who undergoes a dark transformation from war hero to ruthless mafia boss.",
    tags: ["mafia", "family", "crime", "betrayal", "power", "classic", "corruption", "legacy", "italian-american"],
    backdropUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 13,
    title: "Forrest Gump",
    genres: ["Drama", "Romance", "Comedy"],
    year: 1994,
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    rating: 4.7,
    popularity: 95,
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to reunite with his childhood sweetheart.",
    tags: ["history", "innocence", "love", "vietnam war", "friendship", "classic", "journey", "emotional", "inspiration"],
    backdropUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 14,
    title: "Fight Club",
    genres: ["Drama", "Thriller"],
    year: 1999,
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Meat Loaf"],
    rating: 4.6,
    popularity: 94,
    description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into a chaotic, anti-corporate anarchist organization, culminating in a shocking identity twist.",
    tags: ["anarchy", "consumerism", "insomnia", "split-personality", "anti-establishment", "revolution", "dark-comedy", "mind-bending"],
    backdropUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 15,
    title: "The Prestige",
    genres: ["Drama", "Mystery", "Sci-Fi"],
    year: 2006,
    director: "Christopher Nolan",
    cast: ["Hugh Jackman", "Christian Bale", "Scarlett Johansson"],
    rating: 4.6,
    popularity: 91,
    description: "After a tragic accident, two stage magicians in 1890s London engage in a battle of supremacy, using increasingly dangerous and scientific methods to create the ultimate illusion.",
    tags: ["magic", "rivalry", "obsession", "obliteration", "illusion", "science", "tesla", "mystery", "mind-bending"],
    backdropUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop"
  },

  // === COMEDY & ENTERTAINMENT ===
  {
    id: 16,
    title: "Superbad",
    genres: ["Comedy"],
    year: 2007,
    director: "Greg Mottola",
    cast: ["Jonah Hill", "Michael Cera", "Christopher Mintz-Plasse"],
    rating: 4.3,
    popularity: 92,
    description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-filled party goes hilariously awry, involving wild run-ins with eccentric police officers.",
    tags: ["high school", "friendship", "party", "alcohol", "cops", "coming of age", "crude humor", "funny"],
    backdropUrl: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 17,
    title: "The Grand Budapest Hotel",
    genres: ["Comedy", "Drama"],
    year: 2014,
    director: "Wes Anderson",
    cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
    rating: 4.5,
    popularity: 88,
    description: "A writer relates his adventures at a renowned European resort hotel between the first and second World Wars, detailing a whimsical heist involving a priceless Renaissance painting and a battle for a family fortune.",
    tags: ["whimsical", "aesthetic", "hotel", "heist", "friendship", "war-backdrop", "quirky", "symmetrical"],
    backdropUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 18,
    title: "Knives Out",
    genres: ["Comedy", "Mystery", "Crime"],
    year: 2019,
    director: "Rian Johnson",
    cast: ["Daniel Craig", "Chris Evans", "Ana de Armas"],
    rating: 4.6,
    popularity: 91,
    description: "A detective investigates the death of the patriarch of an eccentric, combative family. Everyone is a suspect, and secrets unravel in a comedic, modern whodunnit format.",
    tags: ["mystery", "whodunnit", "family-drama", "detective", "eccentric", "inheritance", "funny", "clever", "mansion"],
    backdropUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 19,
    title: "The Hangover",
    genres: ["Comedy"],
    year: 2009,
    director: "Todd Phillips",
    cast: ["Bradley Cooper", "Ed Helms", "Zach Galifianakis"],
    rating: 4.2,
    popularity: 90,
    description: "Three buddies wake up from a bachelor party in Las Vegas with no memory of the previous night, a tiger in their bathroom, a baby in the closet, and the groom missing.",
    tags: ["las vegas", "bachelor party", "memory-loss", "tiger", "friendship", "absurd", "funny", "adventure"],
    backdropUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 20,
    title: "Spider-Man: Into the Spider-Verse",
    genres: ["Animation", "Action", "Adventure", "Comedy"],
    year: 2018,
    director: "Bob Persichetti",
    cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"],
    rating: 4.8,
    popularity: 96,
    description: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities in a visually revolutionary comic book style.",
    tags: ["superhero", "multiverse", "animation", "coming of age", "hip-hop", "comic book", "dimension", "family", "funny"],
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1200&auto=format&fit=crop"
  },

  // === ROMANCE ===
  {
    id: 21,
    title: "La La Land",
    genres: ["Romance", "Drama", "Music"],
    year: 2016,
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "Rosemarie DeWitt"],
    rating: 4.7,
    popularity: 93,
    description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future with their artistic passion.",
    tags: ["jazz", "musical", "hollywood", "dreams", "love", "bittersweet", "creative-struggle", "colorful", "dance"],
    backdropUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 22,
    title: "About Time",
    genres: ["Romance", "Drama", "Fantasy"],
    year: 2013,
    director: "Richard Curtis",
    cast: ["Domhnall Gleeson", "Rachel McAdams", "Bill Nighy"],
    rating: 4.6,
    popularity: 89,
    description: "At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out to have unexpected consequences.",
    tags: ["time travel", "family", "love", "father-son", "england", "emotional", "sweet", "life-lessons"],
    backdropUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 23,
    title: "Eternal Sunshine of the Spotless Mind",
    genres: ["Romance", "Sci-Fi", "Drama"],
    year: 2004,
    director: "Michel Gondry",
    cast: ["Jim Carrey", "Kate Winslet", "Kirsten Dunst"],
    rating: 4.7,
    popularity: 90,
    description: "When their relationship turns sour, a young couple undergoes a medical procedure to have each other erased from their memories, navigating a surreal visual landscape of disappearing love.",
    tags: ["memory-erasure", "breakup", "surreal", "subconscious", "mind-bending", "indie", "heartbreak", "art-house"],
    backdropUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 24,
    title: "Before Sunrise",
    genres: ["Romance", "Drama"],
    year: 1995,
    director: "Richard Linklater",
    cast: ["Ethan Hawke", "Julie Delpy", "Andrea Eckert"],
    rating: 4.5,
    popularity: 85,
    description: "A young man and woman meet on a train in Europe, and wind up spending one romantic, dialogue-filled evening together in Vienna, knowing they will likely never see each other again.",
    tags: ["vienna", "dialogue-driven", "one-night", "train", "connection", "existential", "walk-and-talk", "intimate"],
    backdropUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 25,
    title: "Pride & Prejudice",
    genres: ["Romance", "Drama"],
    year: 2005,
    director: "Joe Wright",
    cast: ["Keira Knightley", "Matthew Macfadyen", "Brenda Blethyn"],
    rating: 4.6,
    popularity: 91,
    description: "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class in 19th-century England.",
    tags: ["england", "period-drama", "jane-austen", "social-class", "misunderstanding", "classic-literature", "family"],
    backdropUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop"
  },

  // === HORROR & MYSTERY ===
  {
    id: 26,
    title: "Get Out",
    genres: ["Horror", "Mystery", "Thriller"],
    year: 2017,
    director: "Jordan Peele",
    cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"],
    rating: 4.7,
    popularity: 94,
    description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception reaches a boiling point, revealing a horrifying, sci-fi biological conspiracy.",
    tags: ["racism", "mind-control", "conspiracy", "suburbia", "psychological", "tension", "hypnosis", "social-commentary"],
    backdropUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 27,
    title: "Shutter Island",
    genres: ["Mystery", "Thriller"],
    year: 2010,
    director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Mark Ruffalo", "Ben Kingsley"],
    rating: 4.6,
    popularity: 93,
    description: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane on a windswept island, unraveling his own grip on reality in a stormy psychological thriller.",
    tags: ["asylum", "island", "conspiracy", "trauma", "twist", "hallucination", "grief", "rainstorm", "mind-bending"],
    backdropUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 28,
    title: "A Quiet Place",
    genres: ["Horror", "Sci-Fi", "Thriller"],
    year: 2018,
    director: "John Krasinski",
    cast: ["Emily Blunt", "John Krasinski", "Millicent Simmonds"],
    rating: 4.4,
    popularity: 91,
    description: "In a post-apocalyptic world, a family is forced to live in silence while hiding from blind monsters with ultra-sensitive hearing that hunt anything making a sound.",
    tags: ["silence", "monsters", "survival", "family", "sound", "post-apocalyptic", "suspense", "tension"],
    backdropUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 29,
    title: "The Shining",
    genres: ["Horror", "Drama"],
    year: 1980,
    director: "Stanley Kubrick",
    cast: ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd"],
    rating: 4.7,
    popularity: 92,
    description: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
    tags: ["hotel", "cabin-fever", "psychic", "ghosts", "isolation", "madness", "maze", "classic", "snowstorm"],
    backdropUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 30,
    title: "Hereditary",
    genres: ["Horror", "Mystery", "Drama"],
    year: 2018,
    director: "Ari Aster",
    cast: ["Toni Collette", "Alex Wolff", "Milly Shapiro"],
    rating: 4.3,
    popularity: 87,
    description: "A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother, slowly unraveling a dark ancestry and demonic cult inheritance.",
    tags: ["cult", "grief", "family-curse", "demon", "supernatural", "psychological", "haunting", "terrifying"],
    backdropUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop"
  },

  // === DOCUMENTARIES & REAL WORLD ===
  {
    id: 31,
    title: "Planet Earth II",
    genres: ["Documentary"],
    year: 2016,
    director: "David Attenborough",
    cast: ["David Attenborough"],
    rating: 4.9,
    popularity: 95,
    description: "David Attenborough returns with a breathtaking documentary series focusing on islands, mountains, jungles, deserts, grasslands, and cities, showing natural habitats and survival behaviors in incredible high-definition detail.",
    tags: ["nature", "animals", "wildlife", "earth", "science", "travel", "david-attenborough", "educational"],
    backdropUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 32,
    title: "Free Solo",
    genres: ["Documentary", "Adventure", "Sports"],
    year: 2018,
    director: "Elizabeth Chai Vasarhelyi",
    cast: ["Alex Honnold", "Tommy Caldwell", "Jimmy Chin"],
    rating: 4.6,
    popularity: 89,
    description: "Alex Honnold attempts to conquer the first free solo climb of the famous 3,000-foot El Capitan's wall in Yosemite National Park, climbing without ropes or safety harnesses in an awe-inspiring test of human focus.",
    tags: ["climbing", "mountains", "yosemite", "extremesports", "survival", "fearlessness", "focus", "achievement"],
    backdropUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 33,
    title: "The Social Dilemma",
    genres: ["Documentary", "Drama"],
    year: 2020,
    director: "Jeff Orlowski",
    cast: ["Tristan Harris", "Jeff Seibert", "Bailey Richardson"],
    rating: 4.4,
    popularity: 90,
    description: "This documentary-drama hybrid explores the dangerous human impact of social networking, with tech experts sounding the alarm on their own creations, including algorithm design, addiction, and misinformation mechanics.",
    tags: ["technology", "algorithms", "social-media", "addiction", "internet", "manipulation", "silicon-valley", "psychology"],
    backdropUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 34,
    title: "My Octopus Teacher",
    genres: ["Documentary", "Drama"],
    year: 2020,
    director: "Pippa Ehrlich",
    cast: ["Craig Foster"],
    rating: 4.6,
    popularity: 88,
    description: "A filmmaker forges an unusual friendship with an octopus living in a South African kelp forest, learning about her daily habits, survival struggles, and gaining profound life insights over the course of a year.",
    tags: ["ocean", "octopus", "friendship", "kelp-forest", "south-africa", "nature", "animals", "emotional"],
    backdropUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 35,
    title: "Apollo 11",
    genres: ["Documentary", "History", "Sci-Fi"],
    year: 2019,
    director: "Todd Douglas Miller",
    cast: ["Neil Armstrong", "Buzz Aldrin", "Michael Collins"],
    rating: 4.7,
    popularity: 86,
    description: "A look at the Apollo 11 mission to land on the moon led by commander Neil Armstrong and pilots Buzz Aldrin and Michael Collins, utilizing newly discovered, pristine 70mm archival film footage and audio recordings.",
    tags: ["moon-landing", "space", "nasa", "apollo", "astronaut", "history", "archival", "moon"],
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
  },

  // === FANTASY & ADVENTURE ===
  {
    id: 36,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    genres: ["Fantasy", "Adventure", "Action"],
    year: 2001,
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
    rating: 4.9,
    popularity: 98,
    description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron, dodging orcs, wraiths, and corrupted wizards.",
    tags: ["magic", "ring", "hobbit", "middle-earth", "elves", "wizards", "epic-journey", "friendship", "classic-fantasy"],
    backdropUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 37,
    title: "Spirited Away",
    genres: ["Animation", "Fantasy", "Adventure", "Family"],
    year: 2001,
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
    rating: 4.8,
    popularity: 94,
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts. She must work in a bathhouse to free her parents.",
    tags: ["spirits", "ghibli", "bathhouse", "witch", "gods", "coming of age", "japanese-folklore", "whimsical", "magical"],
    backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 38,
    title: "Harry Potter and the Prisoner of Azkaban",
    genres: ["Fantasy", "Adventure", "Mystery"],
    year: 2004,
    director: "Alfonso Cuarón",
    cast: ["Daniel Radcliffe", "Rupert Grint", "Emma Watson"],
    rating: 4.6,
    popularity: 93,
    description: "Harry Potter, Ron and Hermione return for their third year at Hogwarts, where they investigate the mystery surrounding an escaped prisoner from Azkaban prison, who is believed to be a threat to Harry's life.",
    tags: ["wizarding-world", "magic", "hogwarts", "werewolf", "dementors", "time-travel", "godfather", "hippogriff"],
    backdropUrl: "https://images.unsplash.com/photo-1547756536-cde3673fa2e5?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 39,
    title: "Avatar",
    genres: ["Fantasy", "Action", "Adventure", "Sci-Fi"],
    year: 2009,
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    rating: 4.4,
    popularity: 91,
    description: "A paraplegic Marine dispatched to the beautiful moon Pandora on a unique mission becomes torn between following his orders and protecting the alien Na'vi civilization from destructive human corporate miners.",
    tags: ["pandora", "aliens", "avatar", "nature", "imperialism", "clonings", "flying-creatures", "sci-fantasy"],
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 40,
    title: "Pan's Labyrinth",
    genres: ["Fantasy", "Drama", "War"],
    year: 2006,
    director: "Guillermo del Toro",
    cast: ["Ivana Baquero", "Ariadna Gil", "Sergi López"],
    rating: 4.6,
    popularity: 88,
    description: "In the Falangist Spain of 1944, the young stepdaughter of a sadistic military officer escapes into an eerie but captivating fantasy world of a labyrinth guarded by an ancient, mysterious Faun.",
    tags: ["labyrinth", "monsters", "spanish-civil-war", "faun", "dark-fantasy", "fairytale", "sadistic", "emotional"],
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop"
  },

  // === DIVERSE / CULT CLASSICS ===
  {
    id: 41,
    title: "Pulp Fiction",
    genres: ["Crime", "Drama"],
    year: 1994,
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    rating: 4.8,
    popularity: 97,
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence, redemption, and highly stylized banter in Los Angeles.",
    tags: ["hitman", "gangster", "intertwining", "nonlinear", "cult-classic", "drugs", "violence", "dialogue-heavy"],
    backdropUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 42,
    title: "The Matrix",
    genres: ["Sci-Fi", "Action"],
    year: 1999,
    director: "Lana Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    rating: 4.8,
    popularity: 96,
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    tags: ["matrix", "hacker", "cyberpunk", "kung-fu", "bullet-time", "simulation", "dystopian", "machines", "chosen-one"],
    backdropUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 43,
    title: "Whiplash",
    genres: ["Drama", "Music"],
    year: 2014,
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Paul Reiser"],
    rating: 4.7,
    popularity: 93,
    description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an abusive instructor who will stop at nothing to realize a student's potential.",
    tags: ["jazz", "drummer", "obsession", "abuse", "perfectionism", "conservatory", "intensity", "rivalry", "sweat-and-tears"],
    backdropUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 44,
    title: "Parasite",
    genres: ["Drama", "Thriller", "Comedy"],
    year: 2019,
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    rating: 4.8,
    popularity: 95,
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan, culminating in a shocking, home-invasion thriller escalation.",
    tags: ["class-struggle", "south-korea", "con-artists", "basement", "wealth", "home-invasion", "black-comedy", "suspense"],
    backdropUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 45,
    title: "Spitfire",
    genres: ["Documentary", "History"],
    year: 2018,
    director: "David Fairhead",
    cast: ["Charles Dance"],
    rating: 4.5,
    popularity: 80,
    description: "The epic story of the Supermarine Spitfire, the fighter aircraft that helped win the Battle of Britain in World War II, told through the words of the last surviving veteran pilots who flew them.",
    tags: ["world-war-ii", "spitfire", "aviation", "airplane", "history", "veterans", "battle-of-britain", "military"],
    backdropUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"
  }
];

// Seed Rating data for Collaborative Filtering
// Users are represented by IDs 1 to 7 (8 is the current active/custom profile, initialized dynamically)
// Ratings are on a scale of 1 to 5. 0 means unrated.
// Total Movies = 45.
// We provide consistent ratings based on user tastes.
export const INITIAL_RATINGS = {
  // User 1: "Sci-Fi Sam" (Loves Space, Tech, Dystopia, hates classic romances and goofy comedies)
  1: {
    name: "Sci-Fi Sam",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60",
    role: "AI Developer",
    bio: "Obsessed with quantum mechanics, deep space exploration, and futuristic neon cities. If there are lasers or space-time anomalies, I am in.",
    ratings: {
      1: 5,  // Interstellar
      2: 5,  // The Martian
      3: 5,  // Blade Runner 2049
      4: 5,  // Arrival
      5: 4.5,// Ex Machina
      7: 5,  // Inception
      8: 4,  // Mad Max: Fury Road
      15: 4.5,// The Prestige
      35: 4.8,// Apollo 11
      42: 5,  // The Matrix
      21: 1,  // La La Land (Dislikes)
      25: 1.5,// Pride & Prejudice (Dislikes)
      19: 2   // The Hangover (Dislikes)
    }
  },

  // User 2: "Action Alex" (Loves high-octane blockbusters, assassins, superheroes. Hates slow indie dramas)
  2: {
    name: "Action Alex",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60",
    role: "Stunt Coordinator",
    bio: "Life is too short for slow conversations and long gazes. Give me car chases, hand-to-hand combat, explosive superhero battles, and high stakes.",
    ratings: {
      6: 5,  // The Dark Knight
      8: 5,  // Mad Max: Fury Road
      9: 5,  // John Wick
      10: 4.5,// Sicario
      7: 4.5, // Inception
      20: 5,  // Into the Spider-Verse
      36: 4.8,// Fellowship of the Ring
      39: 4.5,// Avatar
      42: 4.8,// The Matrix
      11: 3,  // Shawshank Redemption (Okay but slow)
      24: 1.5,// Before Sunrise (Hates talkative movies)
      34: 2   // My Octopus Teacher (Boring)
    }
  },

  // User 3: "Romance Rachel" (Loves musicals, cute period dramas, heartfelt love stories. Dislikes gore/horror)
  3: {
    name: "Romance Rachel",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    role: "Wedding Planner",
    bio: "Believer in true love, serendipity, and gorgeous musical numbers. I love watching relationships develop and get emotional over heartfelt gestures.",
    ratings: {
      21: 5,  // La La Land
      22: 5,  // About Time
      23: 4,  // Eternal Sunshine
      24: 5,  // Before Sunrise
      25: 5,  // Pride & Prejudice
      13: 4.5,// Forrest Gump
      17: 4,  // Grand Budapest Hotel
      37: 4.5,// Spirited Away
      38: 4,  // Harry Potter
      9: 1,   // John Wick (Too violent)
      29: 1,  // The Shining (Terrifying)
      30: 1.5 // Hereditary (Terrifying)
    }
  },

  // User 4: "Horror Helen" (Loves psychological scares, conspiracies, grim themes, supernatural curses)
  4: {
    name: "Horror Helen",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60",
    role: "Mystery Novelist",
    bio: "Darkness fascinates me. I enjoy psychological tension, paranormal events, and movies that keep me awake at night looking at the shadows.",
    ratings: {
      26: 5,  // Get Out
      27: 4.8,// Shutter Island
      28: 4.5,// A Quiet Place
      29: 5,  // The Shining
      30: 5,  // Hereditary
      14: 4.5,// Fight Club
      44: 4.5,// Parasite
      5: 4,   // Ex Machina
      16: 1.5,// Superbad (Juvenile)
      21: 1,  // La La Land (Too bright)
      22: 2   // About Time (Cheesy)
    }
  },

  // User 5: "Cinephile Sarah" (Loves intricate directors, clever writing, emotional journeys, classics)
  5: {
    name: "Cinephile Sarah",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
    role: "Film Studies Professor",
    bio: "I look at film as high art. Script structure, cinematography, character depth, and thematic resonance are my criteria. Tarantino, Kubrick, Anderson, and Nolan are favorites.",
    ratings: {
      11: 5,  // Shawshank Redemption
      12: 5,  // The Godfather
      17: 4.8,// Grand Budapest Hotel
      18: 4.5,// Knives Out
      23: 5,  // Eternal Sunshine
      37: 5,  // Spirited Away
      41: 5,  // Pulp Fiction
      43: 4.8,// Whiplash
      44: 5,  // Parasite
      40: 4.6,// Pan's Labyrinth
      19: 2,  // The Hangover (Crass)
      39: 2.5 // Avatar (Style over substance)
    }
  },

  // User 6: "Documentary Dan" (Loves real stories, history, nature, deep exploration, sports)
  6: {
    name: "Documentary Dan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    role: "Environmental Journalist",
    bio: "Truth is stranger and more beautiful than fiction. I watch to learn, discover the wonders of our planet, and understand history's greatest feats.",
    ratings: {
      31: 5,  // Planet Earth II
      32: 5,  // Free Solo
      33: 4.8,// The Social Dilemma
      34: 5,  // My Octopus Teacher
      35: 4.5,// Apollo 11
      45: 4.2,// Spitfire
      11: 4,  // Shawshank (Resonates)
      2: 4,   // The Martian (Scientific)
      13: 4,  // Forrest Gump (Historical)
      20: 2,  // Spider-Man (Unrealistic)
      36: 2.5 // Fellowship of the Ring (Too much fantasy)
    }
  },

  // User 7: "Casual Kevin" (Loves high popularity comedies, animated films, lighter stuff)
  7: {
    name: "Casual Kevin",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
    role: "Sales Associate",
    bio: "After a long day, I just want to relax, laugh, and be entertained. Big blockbusters, clever mysteries, and funny comedies are my go-to.",
    ratings: {
      16: 5,  // Superbad
      19: 5,  // The Hangover
      20: 5,  // Into the Spider-Verse
      18: 4.5,// Knives Out
      38: 4.8,// Prisoner of Azkaban
      9: 4.2, // John Wick
      13: 4.5,// Forrest Gump
      6: 4.5, // The Dark Knight
      12: 3,  // The Godfather (Too long)
      4: 2.5, // Arrival (Too slow)
      23: 2   // Eternal Sunshine (Depressing)
    }
  }
};
