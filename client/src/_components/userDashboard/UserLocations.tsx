import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function UserLocations() {
  const { user } = useContext(AuthContext);

  // Renderable elements
  const noFavs = (
    <p className="text-center">You didn't create any locations yet...</p>
  );

  const header = (
    <h4 className="text-center font-bold">
      You've created <span className="text-red-500">{user?.posts.length}</span>{' '}
      location so far:
    </h4>
  );

  return (
    <>
      <div className="mx-auto w-11/12 rounded-sm bg-slate-200 px-4 py-2">
        {user!.favs.length > 0 ? header : noFavs}
        <ol className="list-inside list-decimal">
          {user!.posts &&
            user?.posts.map((location) => {
              return <p>{location.title}</p>;
            })}
        </ol>
      </div>
    </>
  );
}

export default UserLocations;
