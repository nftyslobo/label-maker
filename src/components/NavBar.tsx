import { Typography } from "@ensdomains/thorin";
import { ConnectButton } from "@/components/ConnectButton";
import Link from "next/link";

export function NavBar() {
  return (
    <div className="flex justify-between items-center w-full px-8 py-6">
      <div className="flex divide-x">
        <div className="pr-4">
          <Typography className="text-gray-950" fontVariant="extraLargeBold">
            Address Book
          </Typography>
        </div>
        <div className="pl-4 self-center">name any address</div>
      </div>

      <div className="flex">
        <Link href="/">
          <Typography
            fontVariant="largeBold"
            className="text-gray-950 cursor-pointer px-4 hover:underline transition-all duration-700"
          >
            Make Labels
          </Typography>
        </Link>
        <Link href="/view-lables">
          <Typography
            fontVariant="largeBold"
            className="text-gray-950 cursor-pointer px-4 hover:underline transition-all duration-700"
          >
            View Lables
          </Typography>
        </Link>
      </div>

      <div>
        <ConnectButton></ConnectButton>
      </div>
    </div>
  );
}
