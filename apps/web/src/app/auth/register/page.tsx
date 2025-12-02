import RegisterForm from "features/auth/register";
import { ShoppingCart } from "lucide-react";

const Register = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 w-full h-dvh">
      <div className="w-full hidden md:block border-r bg-primary/5">
        <div className="p-6 flex items-center gap-2">
          <ShoppingCart className="text-primary " />{" "}
          <h5 className="text-2xl font-semibold text-primary">Swadesi</h5>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-xs text-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
