'use server'
import Photo from "@/models/Photo";
import { destroyFromCloudinary, uploadToCloudinary } from "./cloudinary";
import { dynamicBlurDataUrl } from "./dynamicBlurDataUrl";
import getServerUser from "./getServerUser";
import { revalidatePath } from "next/cache";
import { slugify } from "./slugify";

export async function uploadPhotos(formData, filesUpload){
    try {
      const user = await getServerUser();
      if(!user) throw new Error('Unauthorization!');
  
      const files = formData.getAll('files');
  
      // Upload photos to the cloudinary
      const photos = await uploadToCloudinary(files, user?._id);
  
      // Generate blurDataURL
      const blurDataPromise = photos.map(photo => dynamicBlurDataUrl(photo.secure_url));
      const blurData = await Promise.all(blurDataPromise);
  
      const newPhotos = photos.map((photo, index) => (
        {
          user: user?._id,
          public_id: photo.public_id,
          imgUrl: photo.secure_url,
          title: filesUpload[index].title,
          tags: filesUpload[index].tags,
          slug: slugify(filesUpload[index].title),
          imgName: `${slugify(filesUpload[index].title)}.${photo.format}`,
          public: filesUpload[index].public,
          blurHash: blurData[index]
        }
      ))
  
      await Photo.insertMany(newPhotos);
  
      revalidatePath("/");
      return { msg: 'Upload Success!' }
    } catch (error) {
      return { errMsg: error.message }
    }
  }
  