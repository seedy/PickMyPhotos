"use server";
import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/env.mjs";

// CONSTANTS
const BATCH_UPLOAD_EXPIRES_IN_SEC = 900; // 15min
 
const S3 = new S3Client({
  region: "auto", // Required by SDK but not used by R2
  // Provide your Cloudflare account ID
  endpoint: `https://${env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
  // Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
  credentials: {
    accessKeyId: env.PHOTOS_RW_ACCESS_KEY_ID,
    secretAccessKey: env.PHOTOS_RW_SECRET_ACCESS_KEY,
  },
});

interface getBatchUploadUrlsProps {
  photographerId: string;
  listId: string;
  files: File[];
}
export async function getBatchUploadUrls({photographerId, listId, files}: getBatchUploadUrlsProps){
const urls = await Promise.all(files.map(async (file) => {
    const key = `photos/${photographerId}/${listId}/${crypto.randomUUID()}-${file.name}`;
    const url = await getSignedUrl(S3, new PutObjectCommand({
      Bucket: env.R2_PHOTOS_BUCKET,
      Key: key,
      ContentType: file.type,
      ContentLength: file.size,
    }), { expiresIn: BATCH_UPLOAD_EXPIRES_IN_SEC });

    return { key, uploadUrl: url, filename: file.name };
  }));

  return urls;
}

interface listPhotosProps {
  photographerId: string;
  listId: string;
}
export async function listPhotos({photographerId, listId}: listPhotosProps) {
  const { Contents } = await S3.send(new ListObjectsV2Command({
    Bucket: env.R2_PHOTOS_BUCKET,
    Prefix: `photos/${photographerId}/${listId}`,
  }));
  return Contents ?? [];
}

interface createListShareTokenProps {
  photographerId: string;
  listId: string;
}
export async function createListShareToken({photographerId, listId}: createListShareTokenProps){
  // TODO: check listId is owned by photographerId
  // sign a token
  return {type: "share", photographerId, listId}
}