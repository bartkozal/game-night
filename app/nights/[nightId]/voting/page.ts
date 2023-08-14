"use client";

import { useRouter } from "next/navigation";

type Props = {
  params: {
    nightId: string;
  };
};

export default function Page({ params }: Props) {
  const router = useRouter();
  const id = 1;

  router.replace(`/nights/${params.nightId}/votes/${id}`);
}
