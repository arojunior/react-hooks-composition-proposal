import { useState, useEffect } from 'react';

export const useFoo = initialState => {
  const [foo, setFoo] = useState(initialState);
  const changeFoo = value => {
    setFoo(value === foo ? initialState : value);
  };
  return { foo, changeFoo };
};

export const useGithub = username => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const githubUser = await fetch(
        `https://api.github.com/users/${username}`
      );
      return githubUser.json();
    };

    getUser().then(u => setUser(u));
  }, [user, username]);

  return { user };
};
