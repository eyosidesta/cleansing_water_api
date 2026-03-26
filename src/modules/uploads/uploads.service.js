import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { env } from '../../config/env.js';

const spacesClient = new S3Client({
  region: env.DO_SPACES_REGION,
  endpoint: env.DO_SPACES_ENDPOINT,
  credentials: {
    accessKeyId: env.DO_SPACES_KEY,
    secretAccessKey: env.DO_SPACES_SECRET,
  },
});

function ensureSpacesConfig() {
  if (!env.DO_SPACES_KEY || !env.DO_SPACES_SECRET || !env.DO_SPACES_BUCKET || !env.DO_SPACES_ENDPOINT) {
    const error = new Error('DigitalOcean Spaces is not fully configured.');
    error.statusCode = 500;
    throw error;
  }
}

function getFileExtension(mimeType) {
  if (mimeType === 'image/jpeg') return 'jpg';
  if (mimeType === 'image/png') return 'png';
  if (mimeType === 'image/webp') return 'webp';
  return 'bin';
}

async function uploadPodcastCoverImage(file) {
  ensureSpacesConfig();

  const extension = getFileExtension(file.mimetype);
  const key = `podcasts/covers/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

  await spacesClient.send(
    new PutObjectCommand({
      Bucket: env.DO_SPACES_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }),
  );

  return {
    key,
    url: `${env.DO_SPACES_ENDPOINT.replace(/\/$/, '')}/${key}`,
  };
}

export { uploadPodcastCoverImage };
