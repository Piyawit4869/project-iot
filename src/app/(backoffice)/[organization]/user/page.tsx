import { Control } from "@/components/shared/topsection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserPage() {
  return (
    <>
      <div className="p-8">
        <Control
          title="User"
          buttons={[
            <Link href={"/organization"} key={"create button"}>
              <Button key={"create button"}>Create User</Button>
            </Link>,
          ]}
        />
      </div>
    </>
  );
}
