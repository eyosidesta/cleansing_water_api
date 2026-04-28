import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { env } from '../../config/env.js';

function normalizeSpacesEndpoint(endpoint, bucket) {
  const url = new URL(endpoint);
  const bucketPrefix = `${bucket}.`;
  const isBucketHostStyle = url.hostname.startsWith(bucketPrefix);
  const apiHost = isBucketHostStyle ? url.hostname.slice(bucketPrefix.length) : url.hostname;

  return {
    apiEndpoint: `${url.protocol}//${apiHost}`,
    publicBaseUrl: `${url.protocol}//${bucket}.${apiHost}`,
  };
}

const spacesEndpoints = normalizeSpacesEndpoint(env.DO_SPACES_ENDPOINT, env.DO_SPACES_BUCKET);

const spacesClient = new S3Client({
  region: env.DO_SPACES_REGION,
  endpoint: spacesEndpoints.apiEndpoint,
  forcePathStyle: true,
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
    url: `${spacesEndpoints.publicBaseUrl.replace(/\/$/, '')}/${key}`,
  };
}

async function uploadTestimonyImage(file) {
  ensureSpacesConfig();

  const extension = getFileExtension(file.mimetype);
  const key = `testimonies/images/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

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
    url: `${spacesEndpoints.publicBaseUrl.replace(/\/$/, '')}/${key}`,
  };
}

export { uploadPodcastCoverImage, uploadTestimonyImage };
