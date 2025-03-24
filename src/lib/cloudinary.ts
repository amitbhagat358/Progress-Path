import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { cloudinary } from "../../cloudinary.config";

type UploadResponse =
  | { success: true; result?: UploadApiResponse }
  | { success: false; error: UploadApiErrorResponse };

export const uploadToCloudinary = (
  fileUri: string,
  fileName: string
): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: "journal-images",
        use_filename: true,
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        reject({ success: false, error });
      });
  });
};

export const deleteFromCloudinary = async (imageUrl: string) => {
  try {
    const match = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+?)\.[a-z]+$/);

    if (!match) {
      throw new Error("Invalid Cloudinary URL");
    }

    const publicId = match[1];
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: result.result === "ok", result };
  } catch (error) {
    console.error("Cloudinary Deletion Error:", error);
    return { success: false, error };
  }
};
