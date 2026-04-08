"use server";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/env.mjs";

// CONSTANTS
const BATCH_UPLOAD_EXPIRES_IN_SEC = 900; // 15min
const BATCH_GET_EXPIRES_IN_SEC = 300; // 5min
 
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

interface getBatchUploadPhotosUrlsProps {
  photographerId: string;
  listId: string;
  photos: (File & {id: string})[];
}
export async function getBatchUploadPhotosUrls({photographerId, listId, photos}: getBatchUploadPhotosUrlsProps){
const urls = await Promise.all(photos.map(async (photo) => {
    const key = `photos/${photographerId}/${listId}/${photo.id}`;
    const url = await getSignedUrl(S3, new PutObjectCommand({
      Bucket: env.R2_PHOTOS_BUCKET,
      Key: key,
      ContentType: photo.type,
      ContentLength: photo.size,
    }), { expiresIn: BATCH_UPLOAD_EXPIRES_IN_SEC });

    return { key, uploadUrl: url, filename: photo.name };
  }));

  return urls;
}

interface getPhotosUrlsProps {
  photographerId: string;
  listId: string;
  photoIds: string[];
}
export async function getPhotosUrls({photographerId, listId, photoIds}: getPhotosUrlsProps){
  const urls = await Promise.all(photoIds.map(async (photoId) => {
    const key = `photos/${photographerId}/${listId}/${photoId}`;
    const url = await getSignedUrl(S3, new GetObjectCommand({
    Bucket: env.R2_PHOTOS_BUCKET, Key: key
  }), { expiresIn: BATCH_GET_EXPIRES_IN_SEC });

  return url;
  }))

  return urls;
}