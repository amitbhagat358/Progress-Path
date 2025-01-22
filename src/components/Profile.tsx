'use client';
import { Header } from '@/components/Header';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

//@ts-expect-error implement later
export default function Profile({ userDetails }) {
  const [username, setUsername] = useState(userDetails?.username);
  const [name, setName] = useState(userDetails?.name);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  return (
    <div>
      <Header />
      <h1 className="w-full text-3xl text-primary text-center">
        Available Soon ...
      </h1>
      {/* <div className="w-[80%] m-auto flex flex-col justify-center ">
        <div className="w-full text-3xl text-semibold mb-10">Your Details</div>
        <div className="w-[40%]">
          <div className="mb-5">
            <Label htmlFor="username">Name</Label>
            <Input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <Label htmlFor="username">Username</Label>
            <Input
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              value={userDetails.email}
              className="cursor-not-allowed text-muted-foreground"
              readOnly
            />
          </div>
        </div>

        {unsavedChanges && <Button onClick={handleSave}>Save Changes</Button>}
      </div> */}
    </div>
  );
}
