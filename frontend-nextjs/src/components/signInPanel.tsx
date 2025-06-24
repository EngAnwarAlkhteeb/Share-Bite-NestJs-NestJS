import Link from "next/link";

const SignInPanel = () => {
  return (
    <>
      <Link
        href="/auth/signin"
        className="text-white hover:text-gray-300 mr-[50px] transition-colors px-4 -mx-[150px] py-2 rounded-lg border border-gray-600 hover:border-gray-500"
      >
        Sign In
      </Link>
      <Link
        href="/auth/signup"
        className="text-white hover:text-gray-300 transition-colors px-4 py-2 rounded-lg border border-gray-600 hover:border-gray-500"
      >
        Sign Up
      </Link>
    </>
  );
};

export default SignInPanel;
