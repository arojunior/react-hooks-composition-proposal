# React hooks composition proposal

I will quote the README from [react-compose-hooks](https://github.com/lucasconstantino/react-compose-hooks) because the motivation is basically the same.

--> The copied text starts here:

## Motivation

1. **Side-effect:** no one really like them, and within the React ecosystem we've been trying to get rid of them - or at least encapsulate them for good. Hooks seems to go in the other direction, when it encourages people to call a function and expect a dynamic return inside a previously purely functional component. Which leads to...
2. **Not functional:** I might be completely wrong with this one, but it seems we've just buried some concepts of functional programming when embracing hooks. No more pure functions, which should _always return the same result when called with the same arguments_. Which also leeds to...
3. **Testability issues:** APIs are certaily to come, but so far we are all sure that using hooks will not encourage testable code at all.

Having all that said, we have to point the obvious answer to all these problems, which is: we already had these problems with classes. This is true, but now we are making the distinction between logic and presentational components much more subtle. Experienced developers are sure going to keep things separetely enough, but what about newcommers? They were once tempted to use classes everywhere, and the introduction of purely functional components was a good way to teach them to split logic from presentation. The difference between smart/dumb (container/component, whatever) is now way more difficult to grasp.

## Solution

I don't have a final solution. All I know is I've loved the developing experience gains first brought by [recompose](https://github.com/acdlite/recompose)

--> And ends here.

That was [Lucas Constatino](https://github.com/lucasconstantino) words.

## My two cents

I really love `recompose` as well, but I can agree that is too much abstraction and high order components.
That said, I think we can use the best of the two worlds.

This is a component using `useState` and `useEffect` hooks:

```javascript
// AppComponent.js
const AppComponent = ({ useFoo, useGithub }) => {
  const { foo, changeFoo } = useFoo("bar");
  const { user } = useGithub("arojunior");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Hello {foo}</h2>
        <h2>Start editing to see some magic happen!</h2>
        <button onClick={() => changeFoo("wooow")}>Change bar</button>
        <div>
          <p>
            <strong>Name: </strong>
            {user.name}
          </p>
        </div>
      </header>
    </div>
  );
};
```

What is the difference? There's no implementation inside the Component. It's using custom hooks and receiving it by props.

The custom hooks:

```javascript
// AppService.js
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
```

And the magic happens here:

```javascript
// AppContainer.js
import { withProps } from './utils/hocFactory';
import { useFoo, useGithub } from './AppService';
import AppComponent from './AppComponent';

const AppContainer = withProps({
  useFoo,
  useGithub
})(AppComponent);

export default AppContainer;
```

Just one HOC and all of the responsabilities are clear.
With this kind of implementation, we can easily test the `AppComponent.js` as a pure component:

```javascript
// AppComponent.test.js
describe("AppComponent", () => {
  test("should match snapshot", () => {
    const useFoo = jest.fn(() => ({}));
    const useGithub = jest.fn(() => ({ user: {} }));

    const tree = renderer
      .create(<AppComponent useFoo={useFoo} useGithub={useGithub} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
```

We can also test the behavior (hooks) separeted:

```javascript
// AppService.test.js
describe("AppService", () => {
  describe("useFoo", () => {
    test("should render the correct initialState", () => {
      const { result } = renderHook(() => useFoo("bar"));
      expect(result.current.foo).toBe("bar");
    });

    test("should change foo value", () => {
      const { result } = renderHook(() => useFoo("bar"));
      act(() => {
        result.current.changeFoo("woow");
      });
      expect(result.current.foo).toBe("woow");
    });

    test("should change foo value to initialState when new value is equals to previous", () => {
      const { result } = renderHook(() => useFoo("bar"));
      act(() => {
        result.current.changeFoo("woow");
      });
      act(() => {
        result.current.changeFoo("woow");
      });
      expect(result.current.foo).toBe("bar");
    });
  });
});
```

And then we can test the two things together, the presentational component and the behavior:

```javascript
// AppContainer.test.js
describe("AppContainer", () => {
  beforeAll(() => {
    const fakeUserResponse = { name: "Junior Oliveira" };

    jest.spyOn(window, "fetch").mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeUserResponse)
      });
    });
  })

  test("Render with useGithub hook and its initial state", async () => {
    const { getByText } = render(<AppContainer />);
    await wait(() => {
      expect(getByText(/Junior Oliveira/i)).toBeInTheDocument();
    })
  });

  test("Render with useFoo hook and its initial state", async () => {
    const { getByText } = render(<AppContainer />);
    await wait(() => {
      expect(getByText(/Hello bar/i)).toBeInTheDocument();
    })
  });
});

```

Feel free to open issues and discuss about this approach.