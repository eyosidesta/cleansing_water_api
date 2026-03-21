const YOUTUBE_ID_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

function extractYoutubeVideoId(url) {
  const match = url.match(YOUTUBE_ID_REGEX);
  return match ? match[1] : null;
}

function buildYoutubeEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}`;
}

function buildYoutubeThumbnailUrl(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export { extractYoutubeVideoId, buildYoutubeEmbedUrl, buildYoutubeThumbnailUrl };
