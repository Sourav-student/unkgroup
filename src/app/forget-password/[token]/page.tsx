import ChangePassword from "@/components/ui/ChangePassword";

type Props = {
  params: Promise<{ token: string }>;
}

export default async function GetToken({ params }: Props) {
  const { token } = await params;
  return (
    <ChangePassword token={token}/>
  );
}