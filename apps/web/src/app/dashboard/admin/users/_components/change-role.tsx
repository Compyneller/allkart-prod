import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import api from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const ChangeRole = ({
  role,
  id,
}: {
  role: "admin" | "seller" | "user";
  id: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [roleValue, setRoleValue] = useState<string>(role);
  const queryClient = useQueryClient();
  console.log(roleValue);

  const handleChangeRole = async () => {
    const body = {
      id: id,
      role: roleValue,
    };

    try {
      const { data } = await api.patch(
        `/api/v1/dashboard/admin/user/${id}`,
        body
      );
      return data;
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      return null;
    }
  };
  const mutation = useMutation({
    mutationFn: handleChangeRole,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsOpen(false);
      toast.success("User role change");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)}>Change Role</DialogTrigger>
      <DialogContent>
        <FieldGroup>
          <FieldSet>
            <FieldLabel>Change User Role</FieldLabel>
            <FieldDescription>
              Think before making someone else as admin
            </FieldDescription>
            <RadioGroup
              defaultValue={role}
              onValueChange={(value) => setRoleValue(value)}>
              <FieldLabel>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>USER</FieldTitle>
                    <FieldDescription>
                      This role can only allow user to see and help them to
                      purchase the product
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    disabled={role === "user"}
                    value="user"
                    id="user"
                  />
                </Field>
              </FieldLabel>
              <FieldLabel>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>SELLER</FieldTitle>
                    <FieldDescription>
                      This role can create store list there product and sell
                      them on this platform
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    disabled={role === "seller"}
                    value="seller"
                    id="seller"
                  />
                </Field>
              </FieldLabel>
              <FieldLabel>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>ADMIN</FieldTitle>
                    <FieldDescription>
                      Admin is the god of this platform
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    disabled={role === "admin"}
                    value="admin"
                    id="admin"
                  />
                </Field>
              </FieldLabel>
            </RadioGroup>
            <Button onClick={() => mutation.mutate()}>Submit</Button>
          </FieldSet>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRole;
