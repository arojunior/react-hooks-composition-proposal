import { renderHook, act } from "@testing-library/react-hooks";
import { useFoo } from "./AppService";

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
