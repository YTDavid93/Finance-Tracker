import { SubmitHandler, useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import useAuthAction from "../../hooks/useAuthAction";
import { signWithGooglePopup } from "../../Firebase/googleSignIn";
import { NavLink } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const { handleAction, error, loading } = useAuthAction();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { email, password } = data;

    handleAction({
      authAction: () => createUserWithEmailAndPassword(auth, email, password),
      successMessage: "Account created Successfully",
      redirectPath: "/login",
    });
  };

  const logGoogleUser = () => {
    handleAction({
      authAction: signWithGooglePopup,
      successMessage: "Signed in with Google successfully",
      redirectPath: "/login",
    });
  };

  return (
    <section className="flex justify-center items-center ">
      <form
        className="w-[396px] p-6 bg-white rounded drop-shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center mb-3 text-xl">
          Sign Up on <span className=" text-customBlue">Financely.</span>
        </h1>

        <div className="mb-3">
          <label htmlFor="name">Full Name</label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="text"
            id="email"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirm-password"
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex flex-col gap-3">
          <button className="bg-white rounded-lg w-full text-customBlue text-base px-4 py-2 border border-customBlue hover:bg-blue-600 hover:text-white transition-all duration-200 ease-in-out mt-2">
            {loading ? "Creating Account...." : "Sign Up with Email"}
          </button>

          <h3 className="text-center text-base">or</h3>

          <button
            className="bg-blue-500 rounded-lg text-white text-base w-full px-4 py-2 hover:bg-white hover:text-customBlue hover:border hover:border-customBlue transition-all duration-200 ease-in-out"
            onClick={logGoogleUser}
          >
            Sign Up with google
          </button>

          <p className="text-sm text-black text-center">
           Or Have An Account Already ? <NavLink to="/login">Click Here</NavLink>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
