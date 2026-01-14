-- Bourbon Collection Database Schema
DROP TABLE IF EXISTS bourbons;

CREATE TABLE bourbons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  distillery TEXT NOT NULL,
  type TEXT DEFAULT 'Kentucky Straight',
  age TEXT,
  proof REAL NOT NULL,
  price TEXT,
  image TEXT,
  tasting_notes TEXT,
  rating REAL NOT NULL,
  review TEXT,
  acquired TEXT,
  favorite INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default bourbons
INSERT INTO bourbons (name, distillery, type, age, proof, price, tasting_notes, rating, review, acquired, favorite) VALUES
('Blanton''s Single Barrel', 'Buffalo Trace', 'Single Barrel', '6-8 years', 93, '$65', 'Caramel,Vanilla,Citrus,Oak', 9.2, 'A true classic and one of the bottles that got me into bourbon. The single barrel variation means each bottle is unique, but they''re consistently smooth with that signature sweetness. The horse stopper is iconic.', '2023', 1),
('Pappy Van Winkle 15 Year', 'Old Rip Van Winkle', 'Kentucky Straight', '15 years', 107, '$150 (MSRP)', 'Toffee,Dried Fruit,Leather,Honey,Spice', 9.8, 'The holy grail. Was lucky enough to win a lottery for this one. Incredibly complex with layers that keep revealing themselves. Worth the hype? Absolutely. Worth the secondary prices? That''s another conversation.', '2024', 1),
('Wild Turkey 101', 'Wild Turkey', 'Kentucky Straight', '6-8 years', 101, '$25', 'Vanilla,Caramel,Pepper,Honey', 8.5, 'The best value in bourbon, period. This is my daily sipper and my go-to recommendation for anyone getting into bourbon. Bold, spicy, and punches way above its price point.', '2022', 0),
('Woodford Reserve Double Oaked', 'Woodford Reserve', 'Kentucky Straight', 'NAS', 90.4, '$55', 'Dark Chocolate,Toasted Oak,Vanilla,Apple', 8.8, 'The double oaking process gives this an incredible depth. Rich, dessert-like sweetness with a velvety mouthfeel. Perfect for after dinner or when you want something special without breaking the bank.', '2023', 0),
('Eagle Rare 10 Year', 'Buffalo Trace', 'Single Barrel', '10 years', 90, '$35', 'Toffee,Orange Peel,Herbs,Oak,Leather', 8.9, 'Another Buffalo Trace gem that''s getting harder to find. The 10-year age statement shows in the complexity. Smooth enough for newcomers but interesting enough for enthusiasts.', '2023', 1),
('Maker''s Mark Cask Strength', 'Maker''s Mark', 'Kentucky Straight', 'NAS', 108, '$40', 'Red Fruit,Caramel,Baking Spice,Vanilla', 8.6, 'Takes everything great about Maker''s and turns it up to 11. The wheated mash bill shines through with that signature sweetness, but the cask strength adds complexity and a pleasant burn.', '2022', 0),
('Four Roses Single Barrel', 'Four Roses', 'Single Barrel', '7-9 years', 100, '$45', 'Ripe Plum,Cherry,Spice,Cocoa', 8.7, 'Four Roses really knows what they''re doing with their single barrel program. Each bottle is a little different, but always excellent. The OBSV recipe is my personal favorite.', '2023', 0),
('Booker''s Bourbon', 'Jim Beam', 'Small Batch', '6-8 years', 125, '$90', 'Vanilla,Nuts,Brown Sugar,Tobacco,Oak', 9.0, 'Named after Booker Noe himself, this is bourbon for people who love big, bold flavors. Uncut and unfiltered, straight from the barrel. Each batch is unique and worth tracking.', '2024', 1),
('Elijah Craig Barrel Proof', 'Heaven Hill', 'Small Batch', '12 years', 120, '$70', 'Dark Fruit,Charred Oak,Caramel,Cinnamon', 9.3, 'One of the best values in barrel proof bourbon. The 12-year age statement and lack of chill filtering mean you''re getting serious quality. The B523 batch was particularly incredible.', '2023', 1),
('Buffalo Trace', 'Buffalo Trace', 'Kentucky Straight', 'NAS', 90, '$30', 'Vanilla,Mint,Molasses,Toffee', 8.3, 'The gateway bourbon for so many people, including me. It''s become harder to find, but when you can get it at MSRP, it''s an absolute steal. Smooth, approachable, and always reliable.', '2022', 0);
