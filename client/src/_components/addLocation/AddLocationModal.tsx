import { useContext, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { uploadImage } from '../../fetchers/UploadImage';
import { Image as ImageType } from '../../types/types';
import Image from 'next/image';
import { addNewLocation } from '../../fetchers/AddNewLocation';
import { AuthContext } from '../../context/AuthContext';

type Props = {
  showAddLocation: boolean;
  setShowAddLocation: (show: boolean) => void;
};

const AddLocationModal = ({ showAddLocation, setShowAddLocation }: Props) => {
  const { user } = useContext(AuthContext);
  const [uploadedImage, setUploadedImage] = useState<ImageType>();

  const { trigger: triggerImageUpload, isMutating: imageIsMutating } =
    useSWRMutation('http://localhost:5000/api/images/imageUpload', uploadImage);
  const { trigger: triggerAddLocation } = useSWRMutation(
    'http://localhost:5000/api/posts/addNewPost',
    addNewLocation,
  );

  //  --------- UPLOAD IMAGE -------------------------------
  const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the file from submitted in the form
    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get('locationImage') as File;

    // Trigger the mutation
    const result = await triggerImageUpload({
      file: imageFile,
      folder: 'postImages',
    });
    setUploadedImage(result.Image);
  };

  // ------------- SUBMIT A NEW POST -----------------
  const submitNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;

    await triggerAddLocation({
      title,
      description,
      location,
      imageUrl: uploadedImage ? uploadedImage.secure_url : '',
      author: user ? user._id : '',
    });
  };

  return (
    <>
      <div
        className={`${!showAddLocation ? 'hidden' : ''} fixed left-0 top-0 z-30 h-screen w-screen bg-slate-600/70`}
        onClick={() => {
          setShowAddLocation(false);
        }}
      >
        <div
          className={`relative top-[10%] mx-auto grid w-11/12 gap-y-2 rounded-sm border-2 border-black bg-yellow-200 p-2`}
          onClick={(e) => {
            e.stopPropagation;
          }}
        >
          <section>
            <h1 className="m-1 text-center font-bold">
              Share some unique content:
            </h1>
          </section>
          <section>
            <form
              onSubmit={handleFileSubmit}
              className="grid gap-y-1"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <input
                type="file"
                name="locationImage"
                required
                className=" file:rounded-md file:bg-purple-400 file:shadow-md file:shadow-black"
              />
              <p>{imageIsMutating ? 'Loading' : ''}</p>
              <Image
                src={uploadedImage ? uploadedImage.secure_url : ''}
                width={uploadedImage ? uploadedImage.width : undefined}
                height={uploadedImage ? uploadedImage.height : undefined}
                alt="Uploaded image"
                className="mx-auto w-1/4 rounded-md"
              />
              <button type="submit" className="rounded-sm bg-black text-white">
                Upload image
              </button>
              {/* Valid and invalid feedback */}
              <p></p>
              <p></p>
            </form>
          </section>
          <section>
            <form
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="grid"
              onSubmit={submitNewPost}
            >
              <label htmlFor="title">Start with giving it a title</label>
              <input
                type="text"
                placeholder="example title"
                name="title"
                required
              />
              <label htmlFor="description">Add some description</label>
              <textarea rows={3} name="description" required />
              <label htmlFor="location">Where was it?</label>
              <textarea rows={3} name="location" required />
              <button type="submit">Submit</button>
            </form>
          </section>

          <section>
            <button
              onClick={() => {
                setShowAddLocation(false);
              }}
            >
              Close
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default AddLocationModal;
