"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import * as client from "../client";
import { setCurrentUser } from "../reducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const fetchProfile = () => {
    if (!currentUser) return redirect("/account/signin");
    setProfile(currentUser);
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/account/signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl
            defaultValue={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
            id="wd-username"
            placeholder="username"
            className="mb-2"
          />
          <FormControl
            defaultValue={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
            id="wd-password"
            placeholder="password"
            type="password"
            className="mb-2"
          />
          <FormControl
            defaultValue={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
            id="wd-firstname"
            placeholder="First Name"
            className="mb-2"
          />
          <FormControl
            defaultValue={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
            id="wd-lastname"
            placeholder="Last Name"
            className="mb-2"
          />
          <FormControl
            defaultValue={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            id="wd-dob"
            type="date"
            className="mb-2"
          />
          <FormControl
            defaultValue={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            id="wd-email"
            type="email"
            className="mb-2"
          />
          <FormSelect
            defaultValue={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            id="wd-role"
            className="mb-3"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </FormSelect>
          <button
            onClick={updateProfile}
            className="btn btn-primary w-100 mb-2"
          >
            Update
          </button>
          <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
