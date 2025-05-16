import Entry from '@/components/feed/Entry';

import { User } from '@/types/index';

const Feed = ({ users }: { users: User[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2" data-testid="feed">
      {users &&
        users.map((user: User) => (
          <div key={user.id}>
            <Entry user={user} />
          </div>
        ))}
    </div>
  );
};

export default Feed;
