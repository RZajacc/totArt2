'use client';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { getAllLocations } from '../../fetchers/GetAllLocations';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import emptyHeart from '../../../public/heart_empty.svg';
import fullHeart from '../../../public/heart_full.svg';
import useSWRMutation from 'swr/mutation';
import { locationFavsData } from '../../fetchers/LocationFavsData';

function Content() {
  const { user, mutate } = useContext(AuthContext);

  const { data: locations } = useSWR(
    'http://localhost:5000/api/posts/all',
    getAllLocations,
  );

  // Mutation to trigger on upon button click
  const { trigger } = useSWRMutation(
    'http://localhost:5000/api/users/addToUserFavourites',
    locationFavsData,
  );

  const handleFavourites = async (postId: string) => {
    const result = await trigger({ email: user!.email, locactionId: postId });
    mutate({ ...user!, favs: result.favs });
  };

  return (
    <>
      <h1 className="text-center text-xl font-bold">
        Number of locations found:{' '}
        <span className="text-green-500">{locations?.number}</span>
      </h1>
      <div className="mx-auto mt-3 grid max-w-3xl gap-3 sm:grid-cols-2 md:grid-cols-3">
        {locations &&
          locations.posts.map((post) => {
            return (
              <div
                key={post._id}
                className="rounded-lg border-2 border-black shadow-md shadow-black"
              >
                <section className="relative">
                  {user ? (
                    user.favs?.includes(post._id) ? (
                      <button
                        className="absolute right-2 top-2"
                        onClick={() => {
                          handleFavourites(post._id);
                        }}
                      >
                        <Image
                          src={fullHeart}
                          width={42}
                          height={42}
                          alt="empty-heart"
                        />
                      </button>
                    ) : (
                      <button
                        className="absolute right-2 top-2"
                        onClick={() => {
                          handleFavourites(post._id);
                        }}
                      >
                        <Image
                          src={emptyHeart}
                          width={42}
                          height={42}
                          alt="empty-heart"
                        />
                      </button>
                    )
                  ) : (
                    ''
                  )}

                  {/* For now Im using some arbitrary values untill I update image info in DB */}
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={600}
                    height={600}
                    layout="responsive"
                    className="rounded-lg"
                  />
                </section>
                <section className="mb-4 mt-1 text-center">
                  <h3 className="mb-3 text-xl font-bold">{post.title}</h3>
                  {/* Temporary location until connecting view is ready*/}
                  <Link
                    href={`/locations/${post._id}`}
                    className="rounded-md bg-black px-3 py-2 text-white"
                  >
                    See more
                  </Link>
                </section>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Content;
