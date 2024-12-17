import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const RegisterForm = function () {
  return (
    <div>
      <form>
        <div>
          <Label htmlFor="email">Enter your email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
          />
        </div>
        <Button variant="default">Continue</Button>
      </form>
    </div>
  );
};

export default RegisterForm;

