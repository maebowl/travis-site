// GET /api/bourbons/:id - Get a single bourbon
// PUT /api/bourbons/:id - Update a bourbon
// DELETE /api/bourbons/:id - Delete a bourbon

export async function onRequestGet(context) {
  const { env, params } = context;
  const id = params.id;

  try {
    const bourbon = await env.DB.prepare(
      'SELECT * FROM bourbons WHERE id = ?'
    ).bind(id).first();

    if (!bourbon) {
      return Response.json({ error: 'Bourbon not found' }, { status: 404 });
    }

    return Response.json({
      ...bourbon,
      tastingNotes: bourbon.tasting_notes ? bourbon.tasting_notes.split(',') : [],
      favorite: Boolean(bourbon.favorite)
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function onRequestPut(context) {
  const { env, params, request } = context;
  const id = params.id;

  try {
    const bourbon = await request.json();

    const tastingNotes = Array.isArray(bourbon.tastingNotes)
      ? bourbon.tastingNotes.join(',')
      : bourbon.tastingNotes || '';

    await env.DB.prepare(`
      UPDATE bourbons SET
        name = ?,
        distillery = ?,
        type = ?,
        age = ?,
        proof = ?,
        price = ?,
        image = ?,
        tasting_notes = ?,
        rating = ?,
        review = ?,
        acquired = ?,
        favorite = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
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
      bourbon.favorite ? 1 : 0,
      id
    ).run();

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function onRequestDelete(context) {
  const { env, params } = context;
  const id = params.id;

  try {
    await env.DB.prepare('DELETE FROM bourbons WHERE id = ?').bind(id).run();
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
