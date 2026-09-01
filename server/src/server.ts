import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    service: 'smart-food-donation-api',
    status: 'healthy',
  });
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
