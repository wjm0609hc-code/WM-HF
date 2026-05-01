import Anthropic from '@anthropic-ai/sdk'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured in Vercel environment variables.' })
  }

  const { firmName, firmType, aum, city, state, country } = req.body

  if (!firmName) {
    return res.status(400).json({ error: 'firmName is required' })
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 350,
      messages: [
        {
          role: 'user',
          content: `You are a financial research assistant helping an asset manager's investor relations team understand their LP prospects.

Write a concise 3–5 sentence professional summary of "${firmName}" as an institutional investor. They are classified as a ${firmType} based in ${city}, ${state}, ${country} with approximately ${aum} in assets under management.

Cover: (1) what type of institution this is and their primary purpose, (2) their typical investment mandate and return objectives, (3) the asset classes and manager types they typically allocate to.

If you have specific knowledge of this firm, use it. If not, describe what a well-run ${firmType} of this size typically does. Be factual, professional, and concise. Do not fabricate specific portfolio holdings or personnel.`,
        },
      ],
    })

    const summary = message.content[0].type === 'text' ? message.content[0].text : ''
    return res.json({ summary })
  } catch (err: any) {
    return res.status(500).json({ error: err.message ?? 'Failed to generate summary' })
  }
}
