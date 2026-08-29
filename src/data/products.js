export const products = [
  {
    id: 1,
    name: "Classic Silk Drape Dress",
    brand: "MAISON LUXE",
    category: "Women",
    subCategory: "Dresses",
    price: 490,
    discount: 10,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Emerald Glaze", hex: "#047857" },
      { name: "Champagne Gold", hex: "#D97706" },
      { name: "Obsidian Noir", hex: "#0F172A" }
    ],
    description: "Indulge in pure elegance with the Classic Silk Drape Dress. Tailored from the finest lightweight mulberry silk, it features a cowl neckline, an adjustable sash-tie waist, and a dramatic fluid silhouette that cascades effortlessly as you move.",
    details: [
      "100% Organic Mulberry Silk",
      "Delicate cowl neck with draped shoulders",
      "Invisible side-zip closure",
      "Dry clean only",
      "Handcrafted in Italy"
    ],
    reviews: [
      { author: "Sophia V.", rating: 5, comment: "Absolutely breathtaking. The silk feels like water against the skin.", date: "2026-05-12" },
      { author: "Elena R.", rating: 4.8, comment: "Beautiful drape, fits true to size. Received countless compliments.", date: "2026-05-20" }
    ]
  },
  {
    id: 2,
    name: "Structured Wool Overcoat",
    brand: "NOIR & CO",
    category: "Men",
    subCategory: "Jackets",
    price: 650,
    discount: 15,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Camel", hex: "#B45309" },
      { name: "Charcoal", hex: "#374151" },
      { name: "Navy Blue", hex: "#1E3A8A" }
    ],
    description: "An absolute winter essential, this Overcoat is constructed from premium heavyweight virgin wool. Designed with double-breasted button closures, structured shoulders, and notch lapels, it provides a sharp silhouette for the modern gentleman.",
    details: [
      "85% Virgin Wool, 15% Cashmere blend",
      "Premium satin-twill inner lining",
      "Vent back flap for comfortable movement",
      "Inside chest pockets for valuables",
      "Sustainably sourced fabrics"
    ],
    reviews: [
      { author: "Michael B.", rating: 5, comment: "Exceptional tailoring. Sharp lines and incredibly warm.", date: "2026-04-18" }
    ]
  },
  {
    id: 3,
    name: "Ethereal Linen Summer Top",
    brand: "AURA DESIGNS",
    category: "Women",
    subCategory: "Tops",
    price: 180,
    discount: 0,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Pristine White", hex: "#F8FAFC" },
      { name: "Blush Sand", hex: "#F1F5F9" },
      { name: "Sea Salt Blue", hex: "#E0F2FE" }
    ],
    description: "Breathe easy in the Ethereal Linen Summer Top. Crafted from ultra-breathable, Belgian flax linen, this top features subtle puff sleeves, a button-down back, and an airy silhouette tailored for sun-drenched afternoons.",
    details: [
      "100% Belgian Flax Linen",
      "Mother-of-pearl buttons on the back",
      "Elasticized cuffs for adjustable sleeve volume",
      "Pre-washed for signature softness",
      "Made in France"
    ],
    reviews: [
      { author: "Clara M.", rating: 4, comment: "Extremely breezy. Perfect for warm days.", date: "2026-05-24" }
    ]
  },
  {
    id: 4,
    name: "Monogram Knit Premium Hoodie",
    brand: "VERTU SELECTION",
    category: "Men",
    subCategory: "Hoodies",
    price: 290,
    discount: 5,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800",
      "https://images.unsplash.com/photo-1556821812-42171c77840c?q=80&w=800"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Ink Black", hex: "#1E293B" },
      { name: "Desert Oat", hex: "#D1FAE5" },
      { name: "Pewter Grey", hex: "#6B7280" }
    ],
    description: "Redefine comfort with our luxury knit hoodie. Fabricated with a dense cotton-loopback weave and featuring an embossed, tone-on-tone monogram chest detail, this piece is finished with heavy silver-capped aglets.",
    details: [
      "100% GOTS Certified Cotton Loopback",
      "Embossed luxury branding",
      "Premium heavy metal drawstrings",
      "Ribbed side panels for enhanced fit",
      "Double-lined hood structure"
    ],
    reviews: [
      { author: "Tyler P.", rating: 5, comment: "Best hoodie I own. The weight of the fabric is exceptional.", date: "2026-05-01" },
      { author: "Julian K.", rating: 4.4, comment: "Incredibly thick and luxurious. Worth every penny.", date: "2026-05-15" }
    ]
  },
  {
    id: 5,
    name: "Limited Edition Plated Skirt",
    brand: "VALENTIN",
    category: "Women",
    subCategory: "Skirts",
    price: 320,
    discount: 20,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Platinum Rose", hex: "#FDA4AF" },
      { name: "Satin Champagne", hex: "#FEF3C7" },
      { name: "Liquid Silver", hex: "#94A3B8" }
    ],
    description: "A shimmering masterpiece, this pleated midi skirt is crafted in high-shine metallic micro-pleats that reflect light beautifully. An elasticated grosgrain waistband sits comfortably high on the waist, creating an elongated, elegant outline.",
    details: [
      "Metallic micro-pleated construction",
      "High-rise elasticated grosgrain waist",
      "Raw-edge hemline for modern texture",
      "Ultra-soft interior lining",
      "Made in Italy"
    ],
    reviews: [
      { author: "Gabriella H.", rating: 5, comment: "It catches the light beautifully when walking. Magnificent!", date: "2026-03-30" }
    ]
  },
  {
    id: 6,
    name: "Signature Pique Oxford Shirt",
    brand: "MAISON LUXE",
    category: "Men",
    subCategory: "Shirts",
    price: 220,
    discount: 0,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800",
      "https://images.unsplash.com/photo-1621072156002-e2fcc104e76e?q=80&w=800"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Crisp Blue", hex: "#BFDBFE" },
      { name: "Optic White", hex: "#FFFFFF" },
      { name: "French Lavender", hex: "#DDD6FE" }
    ],
    description: "The gold standard of shirting. Made from premium, high-twist Supima cotton oxford cloth, this shirt is tailored with double-reinforced stitching, authentic mother-of-pearl buttons, and a roll collar designed to sit beautifully with or without a tie.",
    details: [
      "100% Premium American Supima Cotton",
      "Authentic Mother-of-Pearl buttons",
      "Classic single-chest pocket",
      "Box pleat on back yoke",
      "Wrinkle-resistant luxury weave"
    ],
    reviews: [
      { author: "Arthur L.", rating: 5, comment: "The stitching is flawless. The fabric feels sturdy yet soft.", date: "2026-05-11" }
    ]
  },
  {
    id: 7,
    name: "Exclusive Gold Thread Kurti",
    brand: "AURA DESIGNS",
    category: "Women",
    subCategory: "Kurtis",
    price: 240,
    discount: 10,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Crimson Gold", hex: "#B91C1C" },
      { name: "Royal Gold Ochre", hex: "#D97706" }
    ],
    description: "Handcrafted by artisans, this premium cotton-silk blend Kurti is adorned with intricate real zari gold thread hand-embroidery along the split neckline and sleeves. Perfect for celebratory occasions, it exudes royal luxury.",
    details: [
      "Silk-Cotton blend with pure Zari threads",
      "Delicate side slits with piping detail",
      "Comfortable internal lining",
      "Handcrafted embroidery patterns",
      "Includes premium protective storage bag"
    ],
    reviews: [
      { author: "Aditi S.", rating: 4.9, comment: "Absolutely exquisite work. The embroidery is incredibly detailed.", date: "2026-05-18" }
    ]
  },
  {
    id: 8,
    name: "Pima Cotton Minimalist Tee",
    brand: "NOIR & CO",
    category: "Men",
    subCategory: "T-Shirts",
    price: 95,
    discount: 0,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Ink Black", hex: "#111827" },
      { name: "Heather Slate", hex: "#4B5563" },
      { name: "Pure Chalk", hex: "#F9FAFB" }
    ],
    description: "Elevate your essentials. This tee is constructed from long-staple Peruvian Pima cotton, offering a luxurious weight and unparalleled silkiness. Finished with flatlock stitching and an anti-pilling treatment.",
    details: [
      "100% Peruvian Pima Cotton",
      "Medium weight, highly breathable",
      "Reinforced neck seams",
      "Eco-friendly, chemical-free dye",
      "Tailored modern fit"
    ],
    reviews: [
      { author: "Ryan F.", rating: 4.6, comment: "Super soft. Maintains shape perfectly after washing.", date: "2026-04-29" }
    ]
  },
  {
    id: 9,
    name: "Mini-Chic Double Breasted Blazer",
    brand: "LUXE KIDS",
    category: "Kids",
    subCategory: "Boys Wear",
    price: 150,
    discount: 5,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=800",
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=800"
    ],
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    colors: [
      { name: "Classic Navy", hex: "#1E3A8A" },
      { name: "Chalk Cream", hex: "#FEF3C7" }
    ],
    description: "Premium double-breasted tailoring shrunk to perfection for your young gentleman. Cut from a breathable stretch-cotton blend, it is detailed with gold-embossed buttons, peak lapels, and a soft playful lining.",
    details: [
      "98% Cotton, 2% Elastane for comfortable movement",
      "Playful custom interior print lining",
      "Gold crest-embossed buttons",
      "Functional breast and hip flap pockets",
      "Dry clean only"
    ],
    reviews: [
      { author: "Sarah P.", rating: 5, comment: "Adorable! The fit was absolutely perfect for our family photos.", date: "2026-05-02" }
    ]
  },
  {
    id: 10,
    name: "Floral organza Princess Gown",
    brand: "LUXE KIDS",
    category: "Kids",
    subCategory: "Girls Wear",
    price: 175,
    discount: 10,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800",
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800"
    ],
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    colors: [
      { name: "Blossom Pink", hex: "#FCE7F3" },
      { name: "Lemon Sorbet", hex: "#FEF9C3" }
    ],
    description: "A dream in delicate textiles. This stunning gown is constructed with multi-layered silk organza, scattered with hand-sewn embroidered floral motifs. A soft, hypoallergenic cotton slip underneath ensures premium comfort.",
    details: [
      "Premium Silk Organza overlay",
      "100% hypoallergenic cotton structural lining",
      "Hand-embroidered custom silk flowers",
      "Adjustable ribbon back sash",
      "Concealed anti-snag rear zipper"
    ],
    reviews: [
      { author: "Maria D.", rating: 5, comment: "My daughter felt like a real princess. Extremely high quality.", date: "2026-04-12" }
    ]
  },
  {
    id: 11,
    name: "Hand-Stitched Cashmere Kimono",
    brand: "VALENTIN",
    category: "Premium",
    subCategory: "Designer Wear",
    price: 1250,
    discount: 0,
    rating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800"
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Alabaster White", hex: "#FAFAFA" },
      { name: "Bespoke Charcoal", hex: "#1F2937" }
    ],
    description: "The ultimate luxury statement. Masterfully hand-constructed from pure, grade-A Mongolian cashmere, this belted Kimono wrap represents slow fashion at its finest. Featuring seamless construction and deep patch pockets, it is soft beyond imagination.",
    details: [
      "100% Organic Mongolian Cashmere (Grade-A)",
      "Bespoke hand-stitch detailing along seams",
      "Removable matching cashmere tie-belt",
      "Seamless knitwear construction",
      "Delivered in a handcrafted cedar wood preservation box"
    ],
    reviews: [
      { author: "Victoria P.", rating: 5, comment: "An heirloom piece. The softness is incomparable to anything else.", date: "2026-05-14" },
      { author: "Charles G.", rating: 5, comment: "Stunning craftsmanship. Exceeded all my premium expectations.", date: "2026-05-25" }
    ]
  },
  {
    id: 12,
    name: "Aura Gilded Thread Saree",
    brand: "AURA DESIGNS",
    category: "Women",
    subCategory: "Sarees",
    price: 520,
    discount: 15,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800"
    ],
    sizes: ["Free Size"],
    colors: [
      { name: "Royal Emerald", hex: "#065F46" },
      { name: "Imperial Ruby", hex: "#991B1B" }
    ],
    description: "Woven in Varanasi, this luxurious pure silk Georgette Saree features pure silver and gold electroplated zari jacquard borders. Hand-dyed in heritage deep tones, it encapsulates standard luxury fashion history.",
    details: [
      "100% Pure Banarasi Silk Georgette",
      "Real silver/gold plated Zari woven threadwork",
      "Length: 5.5 meters, Blouse piece included: 80cm",
      "Dry clean only, wrap in muslin fabric",
      "Handcrafted on heirloom wooden handlooms"
    ],
    reviews: [
      { author: "Kiran J.", rating: 5, comment: "Absolutely gorgeous. The weight of the silk is perfect.", date: "2026-05-09" }
    ]
  },
  {
    id: 13,
    name: "Limited Edition Shearling Jacket",
    brand: "NOIR & CO",
    category: "Premium",
    subCategory: "Limited Edition",
    price: 980,
    discount: 0,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Bitter Chocolate", hex: "#27272A" },
      { name: "Oatmeal Shearling", hex: "#E4E4E7" }
    ],
    description: "Crafted in small batches of only 50 numbered pieces, this aviator-style jacket is constructed from exceptionally thick Swedish shearling sheepskin. Trimmed in hand-glazed Italian calf leather, it features heavy metal hardware.",
    details: [
      "100% Natural Swedish Shearling",
      "100% Italian calf leather piping and buckle straps",
      "Heavy-duty silver metal front zip",
      "Double collar buckles for neck protection",
      "Individually hand-numbered plaque inside"
    ],
    reviews: [
      { author: "Markus S.", rating: 4.8, comment: "Extremely heavy and warm. Fits like a glove. True statement piece.", date: "2026-04-10" }
    ]
  },
  {
    id: 14,
    name: "Organic Cashmere Knit Romper",
    brand: "LUXE KIDS",
    category: "Kids",
    subCategory: "Baby Fashion",
    price: 110,
    discount: 0,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800",
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800"
    ],
    sizes: ["3M", "6M", "12M", "18M"],
    colors: [
      { name: "Oat Milk", hex: "#F3F4F6" },
      { name: "Soft Sage", hex: "#D1FAE5" }
    ],
    description: "Provide ultimate comfort to your little ones with this organic cashmere knitted romper. Designed with cross-back shoulder straps, natural olivewood buttons, and ribbed hems to sit gently against sensitive skin.",
    details: [
      "100% Organic, certified soft baby cashmere",
      "Non-toxic, plant-based dyes only",
      "Real olivewood button fasteners",
      "Diaper change snap closures for ease",
      "Includes a protective laundry wash bag"
    ],
    reviews: [
      { author: "Nina T.", rating: 4.7, comment: "So soft on my baby's skin. Washable and durable.", date: "2026-05-19" }
    ]
  },
  {
    id: 15,
    name: "Italian Calf Leather Trench",
    brand: "MAISON LUXE",
    category: "Premium",
    subCategory: "Exclusive Collection",
    price: 1450,
    discount: 10,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Vanish Black", hex: "#111827" },
      { name: "Rich Cognac", hex: "#78350F" }
    ],
    description: "An iconic luxury silhouette reinvented. This double-breasted trench coat is crafted from buttery-soft Italian drum-dyed nappa leather. Features classic storm flaps, shoulder epaulettes, and a waist-cinching leather belt.",
    details: [
      "100% Drum-Dyed Italian Nappa Leather",
      "Vapor-soft silk-blend custom monogram lining",
      "D-ring leather buckle belt",
      "Hand-sewn gun flap and button pockets",
      "Lifetime cleaning and care guarantee included"
    ],
    reviews: [
      { author: "Isabella B.", rating: 5, comment: "The leather is buttery soft and smells incredible. Perfect tailoring.", date: "2026-05-22" }
    ]
  },
  {
    id: 16,
    name: "Luxury Suede Chelsea Boots",
    brand: "VERTU SELECTION",
    category: "Men",
    subCategory: "Formal Wear",
    price: 380,
    discount: 0,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800"
    ],
    sizes: ["40", "41", "42", "43", "44"],
    colors: [
      { name: "Sand Suede", hex: "#D8B4FE" },
      { name: "Chocolate Suede", hex: "#78350F" }
    ],
    description: "Handcrafted in Portugal, these Chelsea boots are made using ultra-premium water-repellent Italian calf suede. Finished with elasticated side panels, a leather heel pull loop, and stacked crepe-rubber soles.",
    details: [
      "Premium water-repellent Italian suede leather",
      "Blake-stitched leather sole construction",
      "Natural rubber crepe bottom overlay for grip",
      "Comfortable calfskin footbed liner",
      "Handcrafted in a boutique Portuguese workshop"
    ],
    reviews: [
      { author: "Liam H.", rating: 4.7, comment: "Beautiful craftsmanship. The sand color is perfect with white pants.", date: "2026-05-04" }
    ]
  }
];
