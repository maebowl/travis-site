// GET /api/bourbons - List all bourbons
// POST /api/bourbons - Create a new bourbon

export async function onRequestGet(context) {
  const { env } = context;

  try {
    const { results } = await env.DB.prepare(
      'SELECT * FROM bourbons ORDER BY name'
    ).all();

    // Convert tasting_notes from comma-separated string to array
    const bourbons = results.map(b => ({
      ...b,
      tastingNotes: b.tasting_notes ? b.tasting_notes.split(',') : [],
      favorite: Boolean(b.favorite)
    }));

    return Response.json(bourbons);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { env, request } = context;

  try {
    const bourbon = await request.json();

    const tastingNotes = Array.isArray(bourbon.tastingNotes)
      ? bourbon.tastingNotes.join(',')
      : bourbon.tastingNotes || '';

    const result = await env.DB.prepare(`
      INSERT INTO bourbons (name, distillery, type, age, proof, price, image, tasting_notes, rating, review, acquired, favorite)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      bourbon.name,
      bourbon.distillery,
      bourbon.type || 'Kentucky Straight',
      bourbon.age || null,
      bourbon.proof,
      bourbon.price || null,
      bourbon.image || null,
      tastingNotes,
      bourbon.rating,
      bourbon.review || null,
      bourbon.acquired || null,
      bourbon.favorite ? 1 : 0
    ).run();

    return Response.json({
      success: true,
      id: result.meta.last_row_id
    }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
