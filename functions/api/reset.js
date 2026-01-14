// POST /api/reset - Reset database to default bourbons

const defaultBourbons = [
  { name: "Blanton's Single Barrel", distillery: 'Buffalo Trace', type: 'Single Barrel', age: '6-8 years', proof: 93, price: '$65', tasting_notes: 'Caramel,Vanilla,Citrus,Oak', rating: 9.2, review: "A true classic and one of the bottles that got me into bourbon. The single barrel variation means each bottle is unique, but they're consistently smooth with that signature sweetness. The horse stopper is iconic.", acquired: '2023', favorite: 1 },
  { name: 'Pappy Van Winkle 15 Year', distillery: 'Old Rip Van Winkle', type: 'Kentucky Straight', age: '15 years', proof: 107, price: '$150 (MSRP)', tasting_notes: 'Toffee,Dried Fruit,Leather,Honey,Spice', rating: 9.8, review: "The holy grail. Was lucky enough to win a lottery for this one. Incredibly complex with layers that keep revealing themselves. Worth the hype? Absolutely. Worth the secondary prices? That's another conversation.", acquired: '2024', favorite: 1 },
  { name: 'Wild Turkey 101', distillery: 'Wild Turkey', type: 'Kentucky Straight', age: '6-8 years', proof: 101, price: '$25', tasting_notes: 'Vanilla,Caramel,Pepper,Honey', rating: 8.5, review: 'The best value in bourbon, period. This is my daily sipper and my go-to recommendation for anyone getting into bourbon. Bold, spicy, and punches way above its price point.', acquired: '2022', favorite: 0 },
  { name: 'Woodford Reserve Double Oaked', distillery: 'Woodford Reserve', type: 'Kentucky Straight', age: 'NAS', proof: 90.4, price: '$55', tasting_notes: 'Dark Chocolate,Toasted Oak,Vanilla,Apple', rating: 8.8, review: 'The double oaking process gives this an incredible depth. Rich, dessert-like sweetness with a velvety mouthfeel. Perfect for after dinner or when you want something special without breaking the bank.', acquired: '2023', favorite: 0 },
  { name: 'Eagle Rare 10 Year', distillery: 'Buffalo Trace', type: 'Single Barrel', age: '10 years', proof: 90, price: '$35', tasting_notes: 'Toffee,Orange Peel,Herbs,Oak,Leather', rating: 8.9, review: "Another Buffalo Trace gem that's getting harder to find. The 10-year age statement shows in the complexity. Smooth enough for newcomers but interesting enough for enthusiasts.", acquired: '2023', favorite: 1 },
  { name: "Maker's Mark Cask Strength", distillery: "Maker's Mark", type: 'Kentucky Straight', age: 'NAS', proof: 108, price: '$40', tasting_notes: 'Red Fruit,Caramel,Baking Spice,Vanilla', rating: 8.6, review: "Takes everything great about Maker's and turns it up to 11. The wheated mash bill shines through with that signature sweetness, but the cask strength adds complexity and a pleasant burn.", acquired: '2022', favorite: 0 },
  { name: 'Four Roses Single Barrel', distillery: 'Four Roses', type: 'Single Barrel', age: '7-9 years', proof: 100, price: '$45', tasting_notes: 'Ripe Plum,Cherry,Spice,Cocoa', rating: 8.7, review: "Four Roses really knows what they're doing with their single barrel program. Each bottle is a little different, but always excellent. The OBSV recipe is my personal favorite.", acquired: '2023', favorite: 0 },
  { name: "Booker's Bourbon", distillery: 'Jim Beam', type: 'Small Batch', age: '6-8 years', proof: 125, price: '$90', tasting_notes: 'Vanilla,Nuts,Brown Sugar,Tobacco,Oak', rating: 9.0, review: 'Named after Booker Noe himself, this is bourbon for people who love big, bold flavors. Uncut and unfiltered, straight from the barrel. Each batch is unique and worth tracking.', acquired: '2024', favorite: 1 },
  { name: 'Elijah Craig Barrel Proof', distillery: 'Heaven Hill', type: 'Small Batch', age: '12 years', proof: 120, price: '$70', tasting_notes: 'Dark Fruit,Charred Oak,Caramel,Cinnamon', rating: 9.3, review: "One of the best values in barrel proof bourbon. The 12-year age statement and lack of chill filtering mean you're getting serious quality. The B523 batch was particularly incredible.", acquired: '2023', favorite: 1 },
  { name: 'Buffalo Trace', distillery: 'Buffalo Trace', type: 'Kentucky Straight', age: 'NAS', proof: 90, price: '$30', tasting_notes: 'Vanilla,Mint,Molasses,Toffee', rating: 8.3, review: "The gateway bourbon for so many people, including me. It's become harder to find, but when you can get it at MSRP, it's an absolute steal. Smooth, approachable, and always reliable.", acquired: '2022', favorite: 0 }
];

export async function onRequestPost(context) {
  const { env } = context;

  try {
    // Clear existing bourbons
    await env.DB.prepare('DELETE FROM bourbons').run();

    // Insert default bourbons
    for (const bourbon of defaultBourbons) {
      await env.DB.prepare(`
        INSERT INTO bourbons (name, distillery, type, age, proof, price, tasting_notes, rating, review, acquired, favorite)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        bourbon.name,
        bourbon.distillery,
        bourbon.type,
        bourbon.age,
        bourbon.proof,
        bourbon.price,
        bourbon.tasting_notes,
        bourbon.rating,
        bourbon.review,
        bourbon.acquired,
        bourbon.favorite
      ).run();
    }

    return Response.json({ success: true, count: defaultBourbons.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
