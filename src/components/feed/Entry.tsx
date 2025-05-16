import Image from 'next/image';
import Link from 'next/link';

import Calendar from '@/components/calendar/Calendar';

import { User } from '@/types/index';

const Entry = ({ user }: { user: User }) => {
  return (
    <div className="p-5" data-testid="entry">
      <Link
        href={`/profile/${user.id}`}
        className="pl-5 flex flex-row items-center gap-3"
      >
        <Image
          src={user.image || ''}
          alt="User Image"
          width={30}
          height={30}
          className="rounded-full"
        />
        <h1 className="text-xl">{user.name}</h1>
      </Link>
      <Calendar userId={user.id} isFeed={true} />
    </div>
  );
};

export default Entry;
