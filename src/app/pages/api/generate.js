import GeminiLLM from '../../lib/GeminiLLM'; // Path to your custom LLM class

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { recipientName, emailPurpose, keyPoints } = req.body;
    console.log('body ',req.body);
    try {
      const gemini = new GeminiLLM(process.env.GEMINI_API_KEY);
      const prompt = `Write a professional ${emailPurpose} email for ${recipientName} including these points: ${keyPoints}`;
      const generatedEmail = await gemini.call(prompt);

      res.status(200).json({ generatedEmail });
    } catch (error) {
      console.error('Error generating email:', error);
      res.status(500).json({ error: 'Failed to generate email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
